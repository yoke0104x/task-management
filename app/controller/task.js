/*
 * @description: Task controller
 * @author: Yoke
 * @Date: 2024-08-14 17:02:47
 */
const controller = require('egg').Controller;

class TaskController extends controller {

    /**
     * Get task list
     */
    async index() {
        const { ctx, service } = this;
        // Call Service for business processing
        await service.task.index();
    }

    /**
     * Create task
     */
    async create() {
        const { ctx, service } = this;
        // Assemble parameters
        const payload = ctx.request.body || {};
        // Call Service for business processing
        await service.task.create(payload);
    }

    /**
     * Update task
     */
    async update() {
        const { ctx, service } = this;
        // Assemble parameters
        const { id } = ctx.params;
        const payload = ctx.request.body || {};
        // Call Service for business processing
        await service.task.update(id, payload);
    }

    /**
     * Delete task
     */
    async destroy() {
        const { ctx, service } = this;
        // Assemble parameters
        const { id } = ctx.params;
        // Call Service for business processing
        await service.task.destroy(id);
    }

    /**
     * Get task details
     */
    async show() {
        const { ctx, service } = this;
        // Assemble parameters
        const { id } = ctx.params;
        // Call Service for business processing
        await service.task.show(id);
    }
}

module.exports = TaskController;