/*
 * @description: Participant module controller
 * @author: Yoke
 * @Date: 2024-08-14 13:29:57
 */
const controller = require('egg').Controller;

class ParticipantController extends controller {

    /**
     * Get participant list
     */
    async index() {
        const { ctx, service } = this;
        // Call Service for business processing
        await service.participant.index();
    }

    /**
     * Create participant
     */
    async create() {
        const { ctx, service } = this;
        // Assemble parameters
        const payload = ctx.request.body || {};
        // Call Service for business processing
        await service.participant.create(payload);
    }

    /**
     * Update participant
     */
    async update() {
        const { ctx, service } = this;
        // Assemble parameters
        const { id } = ctx.params;
        const payload = ctx.request.body || {};
        // Call Service for business processing
        await service.participant.update(id, payload);
    }

    /**
     * Delete participant
     */
    async destroy() {
        const { ctx, service } = this;
        // Assemble parameters
        const { id } = ctx.params;
        // Call Service for business processing
        await service.participant.destroy(id);
    }

    /**
     * Get participant details
     */
    async show() {
        const { ctx, service } = this;
        // Assemble parameters
        const { id } = ctx.params;
        // Call Service for business processing
        await service.participant.show(id);
    }
}

module.exports = ParticipantController;