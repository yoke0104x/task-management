/*
 * @description: Participant module service layer
 * @author: Yoke
 * @Date: 2024-08-14 13:31:02
 */
const Service = require('egg').Service;

const { updateModel } = require('../utils');

class ParticipantService extends Service {
    /**
     * Get participant list
     */
    async index() {
        const { ctx } = this;
        // Get current user
        const id = ctx.state.user?.id;
        let query = {};
        if (id) {
            query.userId = id;
        }
        const list = await ctx.model.Participant.find(query);

        ctx.success({
            data: list?.map(item => {
                return updateModel(item);
            })
        });
    }

    /**
     * Create participant
     */
    async create(payload) {
        const { ctx } = this;
        const res = await ctx.validate('participant.create', payload);
        if (!res) return;
        // Get current user
        const id = ctx.state.user?.id;

        try {
            payload.userId = id;
            await ctx.model.Participant.create(payload);
            ctx.success({
                message: 'Creation successful'
            });
        } catch (error) {
            ctx.throw(-1, 'Creation failed');
        }
    }

    /**
     * Update participant
     */
    async update(id, payload) {
        const { ctx } = this;
        const res = await ctx.validate('participant.create', payload);
        if (!res) return;
        try {
            await ctx.model.Participant.findOne({ "_id": id });
            await ctx.model.Participant.findByIdAndUpdate(id, payload);
            ctx.success({
                message: 'Update successful'
            });
        } catch (error) {
            ctx.throw(-1, 'Update failed');
        }
    }

    /**
     * Delete participant
     */
    async destroy(id) {
        const { ctx } = this;
        try {
            const res = await ctx.model.Participant.findOne({ "_id": id });
            if (!res) {
                ctx.throw(-1, 'Participant does not exist');
            }
        } catch (error) {
            ctx.throw(-1, 'Participant does not exist');
        }
        await ctx.model.Participant.findByIdAndRemove(id);
        ctx.success({
            message: 'Deletion successful'
        });
    }

    /**
     * Get participant details
     */
    async show(id) {
        const { ctx } = this;
        try {
            const res = await ctx.model.Participant.findOne({ "_id": id });
            ctx.success({
                data: updateModel(res)
            });
        } catch (error) {
            ctx.throw(-1, 'Participant does not exist');
        }
    }
}

module.exports = ParticipantService;