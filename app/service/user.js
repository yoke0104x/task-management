/*
 * @description: User functionality Service layer
 * @author: Yoke
 * @Date: 2024-08-13 18:39:23
 */
const Service = require("egg").Service;
const svgCaptcha = require('svg-captcha');
const { v4: uuidv4 } = require('uuid');

const { updateModel, omit } = require('../utils');

const mongoose = require('mongoose');

class UserService extends Service {
    /**
     * Get graphical captcha
     */
    async captcha() {
        const { ctx, app } = this;

        const { w, h } = ctx.params

        // Generate unique identifier
        const captchaId = uuidv4();

        // Generate graphical captcha
        const captcha = svgCaptcha.create({
            size: 4, // Captcha length
            fontSize: 50,
            width: w,
            height: h,
            background: '#308CBA',
        });

        // Store captcha and unique identifier in Redis, expiration time is 5 minutes
        await ctx.setRedis(captchaId, captcha.text, 300);
        // Pass captchaId to the frontend
        ctx.success({
            data: {
                captchaId,
                captcha: captcha.data
            }
        })
    }
    /**
     * Create user
     * @param {*} payload 
     * @returns 
     */
    async create(payload) {
        const res = await this.ctx.validate('user.create', payload);
        if (!res) return;
        const emailCode = await this.ctx.getRedis(payload.email);
        if (emailCode !== payload.emailCode) {
            this.ctx.throw('Verification code error');
        }
        const user = await this.ctx.model.User.findOne({ username: payload.username });
        if (user) {
            this.ctx.throw('User already exists');
        }
        // bcrypt encryption
        payload.password = await this.ctx.encrypt(payload.password);
        const res1 = await this.ctx.model.User.create(payload);
        // Delete verification code
        await this.ctx.delRedis(payload.email);
        this.ctx.success({ message: 'Registration successful' });
    };

    /**
     * User login
     * @param {*} payload 
     * @returns 
     */
    async login(payload) {
        const res = await this.ctx.validate('user.login', payload);
        if (!res) return;
        // Get graphical captcha
        const captchaCode = await this.ctx.getRedis(payload.captchaId);
        if (!captchaCode) {
            this.ctx.throw('Captcha has expired');
        }
        // Convert to uppercase for comparison
        if (captchaCode.toUpperCase() !== payload.captcha.toUpperCase()) {
            this.ctx.throw('Captcha error');
        }

        if (!res) return;
        const user = await this.ctx.model.User.findOne({ username: payload.username });
        if (!user) {
            this.ctx.throw('Username or password error');
        }
        // bcrypt decryption
        const verifyPsw = await this.ctx.compare(payload.password, user.password);
        if (!verifyPsw) {
            this.ctx.throw("Username or password error");
        }
        // Generate Token
        const token = this.ctx.sign({
            id: user._id,
            ...payload
        });
        // Store in redis
        await this.ctx.setRedis(user._id, token);
        // Write in cookie
        this.ctx.cookies.set('token', token);
        // Delete captcha
        await this.ctx.delRedis(payload.captchaId);
        this.ctx.success({ data: token, message: 'Login successful' });
    }

    /**
     * Query all users
     */
    async index() {
        // If there are query parameters, query users based on the query parameters
        try {
            if (this.ctx.query?.id) {
                const users = await this.ctx.model.User.findOne({
                    "_id": this.ctx.query.id
                });
                this.ctx.success({
                    data: omit(updateModel(users), ['password'])
                });
            } else {
                const id = this.ctx.state.user.superAdminId
                const users = await this.ctx.model.User.find({
                    "_id": { $ne: id }
                });
                this.ctx.success({
                    data: users?.map(el => {
                        return omit(updateModel(el), ['password'])
                    })
                });
            }
        } catch (error) {
            this.ctx.throw("Query failed");
        }
    }

    /**
     * Query current user information
     */
    async info() {
        const user = await this.ctx.model.User.findOne({ "_id": this.ctx.state.user.id || this.ctx.state.user.superAdminId });
        this.ctx.success({
            data: {
                ...omit(updateModel(user), ['password']),
                superAdmin: this.ctx.state.user.superAdminId ? true : false
            }
        });
    }

    /**
     * Logout
     */
    async logout() {
        await this.ctx.delRedis(this.ctx.state.user.id || this.ctx.state.user.superAdminId);
        this.ctx.state.user = null;
        this.ctx.cookies.set('token', '');
        this.ctx.success({ message: 'Logout successful' });
    }

    /**
     * Get user login status
     */
    async status() {
        const user = this.ctx.state.user;
        const tokenInRedis = await this.ctx.getRedis(user.id);
        if (!tokenInRedis) {
            this.ctx.throw('Login status invalid');
        }
        this.ctx.success({ data: true, message: 'Login status valid' });
    }

    /**
     * Update current user information
     */
    async edit(payload) {
        const res = await this.ctx.validate('user.update', payload);
        if (!res) return;
        const id = this.ctx.state.user.id || this.ctx.state.user.superAdminId;
        const user = await this.ctx.model.User.findOne({ "_id": id });
        if (payload.originalPassword) {
            const verifyPsw = await this.ctx.compare(payload.originalPassword, user.password);
            if (!verifyPsw) {
                this.ctx.throw("Username or password error");
            }
            // bcrypt encryption
            payload.password = await this.ctx.encrypt(payload.password);
        }
        await this.ctx.model.User.findByIdAndUpdate(id, payload);
        this.ctx.success({ message: 'Update successful' });
    }

    /**
     * Delete user
     */
    async delete(id) {
        try {
            const user = await this.ctx.model.User.findOne({ "_id": id });
            if (!user) {
                this.ctx.throw('User does not exist');
            }
            await this.ctx.model.User.findByIdAndDelete(id);
            this.ctx.success({ message: 'Delete successful' });
        } catch (error) {
            this.ctx.throw('Delete failed');
        }
    }

    /**
     * Update User
     */
    async update(id, payload) {
        const res = await this.ctx.validate('user.update', payload);
        if (!res) return;
        try {
            await this.ctx.model.User.findOne({ "_id": id });
        } catch (error) {
            this.ctx.throw('User does not exist');
        }
        await this.ctx.model.User.findByIdAndUpdate(id, payload);
        this.ctx.success({ message: 'Update successful' });
    }

    /**
     * Reset password
     */
    async resetPassword(id) {
        const user = this.ctx.state.user;
        if (!user?.superAdminId) {
            this.ctx.throw('No permission');
        }
        if (!id) {
            this.ctx.throw('User Id does not exist');
        }
        // ai password
        const password = await this.ctx.generatePassword();
        const userInfo = await this.ctx.model.User.findOne({ "_id": new mongoose.Types.ObjectId(id) });
        // bcrypt encryption
        const psd = await this.ctx.encrypt(password);
        await this.ctx.model.User.findByIdAndUpdate(userInfo?.id, {
            password: psd
        });
        this.ctx.success({
            message: 'Reset password successful', data: {
                password: password
            }
        });
    }

    /**
     * adminCreate
     */
    async adminCreate(payload) {
        const res = await this.ctx.validate('user.adminCreate', payload);
        if (!res) return;
        const user = await this.ctx.model.User.findOne({ username: payload.username });
        if (user) {
            this.ctx.throw('User already exists');
        }
        // bcrypt encryption
        payload.password = await this.ctx.encrypt(payload.password);
        await this.ctx.model.User.create(payload);
        this.ctx.success({ message: 'Creation successful' });
    }
}

module.exports = UserService;