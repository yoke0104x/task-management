/*
 * @description: Leader module controller
 * @author: Yoke
 * @Date: 2024-08-14 13:29:57
 */
const controller = require('egg').Controller;

class LeaderController extends controller {

    /**
     * Get leader list
     */
    async index() {
        const { ctx, service } = this;
        // Call Service for business processing
        await service.leader.index();
    }

    /**
     * Create leader
     */
    async create() {
        const { ctx, service } = this;
        // Assemble parameters
        const payload = ctx.request.body || {};
        // Call Service for business processing
        await service.leader.create(payload);
    }

    /**
     * Update leader
     */
    async update() {
        const { ctx, service } = this;
        // Assemble parameters
        const { id } = ctx.params;
        const payload = ctx.request.body || {};
        // Call Service for business processing
        await service.leader.update(id, payload);
    }

    /**
     * Delete leader
     */
    async destroy() {
        const { ctx, service } = this;
        // Assemble parameters
        const { id } = ctx.params;
        // Call Service for business processing
        await service.leader.destroy(id);
    }

    /**
     * Get leader details
     */
    async show() {
        const { ctx, service } = this;
        // Assemble parameters
        const { id } = ctx.params;
        // Call Service for business processing
        await service.leader.show(id);
    }
}

module.exports = LeaderController;