/*
 * @description: Task service layer
 * @author: Yoke
 * @Date: 2024-08-14 17:04:32
 */
const Service = require('egg').Service;
const { updateModel, omit } = require('../utils');

class TaskService extends Service {

    /**
     * Get task list
     */
    async index() {
        const { ctx } = this;
        // Get current user
        const id = ctx.state.user?.id;
        const pipeline = []
        if (id) {
            pipeline.push({
                $match: {
                    userId: id
                }
            })
        }
        pipeline.push({
            $lookup: {
                from: 'leader',  // Ensure the collection name is correct
                localField: 'assigneeId',
                foreignField: '_id',
                as: 'assignee_info'
            }
        },
            {
                $unwind: {
                    path: '$assignee_info',
                    preserveNullAndEmptyArrays: true  // Preserve documents without matches
                }
            },
            {
                $lookup: {
                    from: 'activity',  // Ensure the collection name is correct
                    localField: 'activityId',
                    foreignField: '_id',
                    as: 'activity_info'
                }
            },
            {
                $unwind: {
                    path: '$activity_info',
                    preserveNullAndEmptyArrays: true  // Preserve documents without matches
                }
            },
            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    userId: 1,
                    title: 1,
                    activityId: 1,
                    description: 1,
                    deadline: 1,
                    status: 1,
                    assigneeId: 1,
                    assignee_info: {
                        name: 1,
                        email: 1,
                        phone: 1
                    },
                    activity_info: {
                        name: 1,
                        date: 1,
                        address: 1,
                        description: 1,
                        leaderId: 1,
                        participantIds: 1
                    }
                }
            });
        const tasks = await ctx.model.Task.aggregate(pipeline);
        ctx.success({ data: tasks });
    }

    /**
     * Create task
     */
    async create(payload) {
        const { ctx } = this;
        const res = await ctx.validate('task.create', payload);
        if (!res) return;
        // Get current user
        const id = ctx.state.user?.id;

        try {
            payload.userId = id;
            await ctx.model.Task.create(payload);
            ctx.success({
                message: 'Creation successful'
            });
        } catch (error) {
            ctx.throw(-1, 'Creation failed');
        }
    }

    /**
     * Update task
     */
    async update(id, payload) {
        const { ctx } = this;
        const res = await ctx.validate('task.create', payload);
        if (!res) return;
        try {
            await ctx.model.Task.findOne({ "_id": id });
        } catch (error) {
            ctx.throw(-1, 'Task does not exist');
        }
        await ctx.model.Task.findByIdAndUpdate(id, payload);
        ctx.success({
            message: 'Update successful'
        });
    }

    /**
     * Delete task
     */
    async destroy(id) {
        const { ctx } = this;

        try {
            const res = await ctx.model.Task.findOne({ "_id": id });
            if (!res) {
                ctx.throw(-1, 'Task does not exist');
            }
        } catch (error) {
            ctx.throw(-1, 'Task does not exist');
        }

        await ctx.model.Task.findByIdAndRemove(id);
        ctx.success({
            message: 'Deletion successful'
        });
    }

    /**
     * Get task details
     */
    async show(id) {
        const { ctx } = this;
        try {
            const data = await ctx.model.Task.findOne({ "_id": id });
            // Get activity data
            const activity = await ctx.model.Activity.findOne({ "_id": data?.activityId });
            const activity_info = omit(updateModel(activity), ['createdAt', 'updatedAt', 'id', 'userId']);
            // Get leader data
            const assignee = await ctx.model.Leader.findOne({ "_id": data?.assigneeId });
            const assignee_info = omit(updateModel(assignee), ['createdAt', 'updatedAt', 'id', 'userId']);
            ctx.success({
                data: {
                    ...updateModel(data),
                    activity_info,
                    assignee_info
                }
            });
        } catch (error) {
            ctx.throw(-1, "Data processing error");
        }
    }
}

module.exports = TaskService;