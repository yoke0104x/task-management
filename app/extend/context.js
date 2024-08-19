/*
 * @description: Functionality module
 * @author: Yoke
 * @Date: 2024-08-13 21:43:41
 */
const utility = require('utility');

module.exports = {
    // Handle success response
    success({ code = 0, data = null, message = "Success" } = {}) {
        this.body = {
            code,
            data,
            message
        };
        this.status = 200;
    },

    // Handle failure response
    fail({ code = -1, message = "Error", status = 200 } = {}) {
        this.body = {
            code,
            data: null,
            message
        };
        this.status = status;
    },

    /**
     * Encrypt
     */
    encrypt(data) {
        return utility.md5(data);
    },

    /**
     * Compare password
     */
    compare(password, hash_password) {
        return utility.md5(password) === hash_password;
    },

    /**
     * Generate Token
     */
    sign(data) {
        return this.app.jwt.sign(data, this.app.config.jwt.secret, {
            expiresIn: 30 * 24 * 60 * 60 + 's'
        });
    },

    /**
     * Verify Token
     */
    verify(token) {
        return this.app.jwt.verify(token, this.app.config.jwt.secret);
    },

    /**
     * Redis set
     */
    async setRedis(key, value, time = 60 * 30) {
        return await this.app.redis.set(key, value, 'EX', time);
    },

    /**
     * Redis get
     */
    async getRedis(key) {
        return await this.app.redis.get(key);
    },

    /**
     * Redis delete
     */
    async delRedis(key) {
        return await this.app.redis.del(key);
    },

    /**
     * Generate password
     */
    generatePassword() {
        // requirement reg /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,18}$/
        let password = '';
        const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 10; i++) {
            password += str.charAt(Math.floor(Math.random() * str.length));
        }
        return password;
    }
};