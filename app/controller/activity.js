/*
 * @description: Activity module controller
 * @author: Yoke
 * @Date: 2024-08-14 10:12:39
 */
const Controller = require("egg").Controller;

class ActivityController extends Controller {

    /**
     * Get activity list
     */
    async index() {
        const { ctx, service } = this;
        // Call Service for business processing
        await service.activity.index();
    }

    /**
     * Create activity
     */
    async create() {
        const { ctx, service } = this;
        // Assemble parameters
        const payload = ctx.request.body || {};
        // Call Service for business processing
        await service.activity.create(payload);
    }

    /**
     * Update activity
     */
    async update() {
        const { ctx, service } = this;
        // Assemble parameters
        const { id } = ctx.params;
        const payload = ctx.request.body || {};
        // Call Service for business processing
        await service.activity.update(id, payload);
    }

    /**
     * Delete activity
     */
    async destroy() {
        const { ctx, service } = this;
        // Assemble parameters
        const { id } = ctx.params;
        // Call Service for business processing
        await service.activity.destroy(id);
    }

    /**
     * Get activity details
     */
    async show() {
        const { ctx, service } = this;
        // Assemble parameters
        const { id } = ctx.params;
        // Call Service for business processing
        await service.activity.show(id);
    }

    /**
     * Upcoming activities
     */
    async upcoming() {
        const { ctx, service } = this;
        // Call Service for business processing
        await service.activity.upcoming();
    }
}

module.exports = ActivityController;