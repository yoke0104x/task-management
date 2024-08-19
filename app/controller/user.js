/*
 * @description: User module controller
 * @author: Yoke
 * @Date: 2024-08-13 17:45:13
 */
const Controller = require("egg").Controller;

class UserController extends Controller {
    /**
     * Get captcha
     */
    async captcha() {
        const { ctx, service } = this;
        // Call Service for business processing
        await service.user.captcha();
    }

    /**
     * User registration
     */
    async create() {
        const { ctx, service } = this;
        // Assemble parameters
        const payload = ctx.request.body || {};
        // Call Service for business processing
        await service.user.create(payload);
    }

    /**
     * User login
     */
    async login() {
        const { ctx, service } = this;
        // Assemble parameters
        const payload = ctx.request.body || {};
        // Call Service for business processing
        await service.user.login(payload);
    }

    /**
     * Get all users
     */
    async index() {
        const { ctx, service } = this;
        // Call Service for business processing
        await service.user.index();
    }

    /**
     * Get current user information
     */
    async info() {
        const { ctx, service } = this;
        // Call Service for business processing
        await service.user.info();
    }

    /**
     * User logout
     */
    async logout() {
        const { ctx, service } = this;
        // Call Service for business processing
        await service.user.logout();
    }

    /**
     * Get user login status
     */
    async status() {
        const { ctx, service } = this;
        // Call Service for business processing
        await service.user.status();
    }

    /**
     * Edit current information
     */
    async edit() {
        const { ctx, service } = this;
        const payload = ctx.request.body || {};
        // Call Service for business processing
        await service.user.edit(payload);
    }

    /**
     * Update user information
     */
    async update() {
        const { ctx, service } = this;
        const { id } = ctx.params;
        const payload = ctx.request.body || {};
        // Call Service for business processing
        await service.user.update(id, payload);
    }

    /**
     * Delete user
     */
    async delete() {
        const { ctx, service } = this;
        // Get parameters
        const { id } = ctx.params;
        // Call Service for business processing
        await service.user.delete(id);
    }

    /**
     * Reset password
     */
    async resetPassword() {
        const { ctx, service } = this;
        const id = ctx.params;
        // Call Service for business processing
        await service.user.resetPassword(id);
    }

    /**
     * adminCreate
     */
    async adminCreate() {
        const { ctx, service } = this;
        const payload = ctx.request.body || {};
        // Call Service for business processing
        await service.user.adminCreate(payload);
    }
}

module.exports = UserController;