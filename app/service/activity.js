/*
 * @description: Functionality
 * @author: Yoke
 * @Date: 2024-08-14 10:18:29
 */
const Service = require('egg').Service;
const { updateModel, omit } = require('../utils');
const dayjs = require('dayjs');
const mongoose = require('mongoose');
class ActivityService extends Service {
    /**
     * Get activity list
     */
    async index() {
        const { ctx } = this;
        // Get current user
        const id = ctx.state.user?.id;
        // Pagination
        const { page, pageSize, date, name, leaderId, participantId } = ctx.query;
        const pipeline = [];
        // Basic match condition
        if (id) {
            pipeline.push({
                $match: { userId: id }
            });
        }
        // Dynamically add match conditions
        if (date) {
            pipeline.push({
                $match: { date: { $regex: date } }
            });
        }

        if (name) {
            pipeline.push({
                $match: { name: { $regex: name } }
            });
        }

        // Add $lookup and other operators
        pipeline.push(
            {
                $lookup: {
                    from: 'leader',
                    localField: 'leaderId',
                    foreignField: '_id',
                    as: 'leader_info'
                }
            },
            {
                $unwind: {
                    path: '$leader_info',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    participantIdsArray: {
                        $map: {
                            input: {
                                $split: ["$participantIds", ","]
                            },
                            as: "id",
                            in: { $toObjectId: "$$id" }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'participant',
                    localField: 'participantIdsArray',
                    foreignField: '_id',
                    as: 'participantId_list'
                }
            },
            {
                $project: {
                    id: "$_id",
                    userId: 1,
                    name: 1,
                    date: 1,
                    address: 1,
                    leaderId: 1,
                    leader_info: {
                        name: 1,
                        email: 1,
                        phone: 1
                    },
                    participantIds: 1,
                    participantIdsArray: 1,
                    participantId_list: {
                        id: "$_id",
                        name: 1,
                        email: 1,
                        phone: 1
                    }
                }
            }
        );

        let list = await ctx.model.Activity.aggregate(pipeline)

        // If pagination exists
        if (page && pageSize) {
            list = list.slice((page - 1) * pageSize, page * pageSize);
        }

        const totalCount = await ctx.model.Activity.countDocuments({
            userId: id
        });

        let data = null;
        if (page && pageSize) {
            data = {
                list: list?.map(item => {
                    return updateModel(item);
                }),
                total: totalCount,
                page: page,
                pageSize: pageSize
            }
        } else {
            data = list?.map(item => {
                return updateModel(item);
            });

            if (leaderId) {
                data = data.filter(item => item.leaderId.toString() == leaderId);
            }

            if (participantId) {
                data = data.filter(item => item.participantIds?.split(',').includes(participantId));
            }
        }

        ctx.success({
            data
        });
    }

    /**
     * Create activity
     * @param {*} payload 
     */
    async create(payload) {
        const { ctx } = this;
        const res = await ctx.validate('activity.create', payload);
        if (!res) return;
        // Get current user
        const id = ctx.state.user?.id;

        try {
            payload.userId = id;
            await ctx.model.Activity.create(payload);
            ctx.success({
                message: 'Creation successful'
            });
        } catch (error) {
            ctx.throw(1, 'Creation failed');
        }
    }

    /**
     * Update activity
     * @param {*} id 
     * @param {*} payload 
     */
    async update(id, payload) {
        const { ctx } = this;
        const res = await ctx.validate('activity.create', payload);
        if (!res) return;
        try {
            await ctx.model.Activity.findOne({ "_id": id });
        } catch (error) {
            ctx.throw(1, 'Activity does not exist');
        }
        await ctx.model.Activity.findByIdAndUpdate(id, payload);
        ctx.success({
            message: 'Update successful'
        });
    }

    /**
     * Delete activity
     * @param {*} id 
     */
    async destroy(id) {
        const { ctx } = this;

        try {
            const res = await ctx.model.Activity.findOne({ "_id": id });
            if (!res) {
                ctx.throw(1, 'Activity does not exist');
            }
        } catch (error) {
            ctx.throw(1, 'Activity does not exist');
        }

        await ctx.model.Activity.findByIdAndRemove(id);
        ctx.success({
            message: 'Deletion successful'
        });
    }

    /**
     * Get activity details
     */
    async show(id) {
        const { ctx } = this;
        try {
            const data = await ctx.model.Activity.findOne({ "_id": id });
            const leader_infoRes = await ctx.model.Leader.findOne({ "_id": data.leaderId });
            const leader_info = omit(updateModel(leader_infoRes), ['userId', 'id']);
            const participantId_list = await ctx.model.Participant.find({}).where('_id').in(data.participantIds.split(','));
            ctx.success({
                data: {
                    ...updateModel(data),
                    leader_info,
                    participantId_list: participantId_list?.map(item => omit(updateModel(item), ['userId', 'id']))
                }
            });
        } catch (error) {
            ctx.throw(1, error);
        }
    }

    /**
     * Upcoming activities
     */
    async upcoming() {
        const { ctx } = this;
        const id = ctx.state.user?.id;
        const pipeline = [];
        if (id) {
            pipeline.push({
                $match: { userId: id }
            });
        }
        pipeline.push(
            {
                $lookup: {
                    from: 'leader',  // Corresponding collection name
                    localField: 'leaderId',  // Foreign key in Activity table
                    foreignField: '_id',  // Primary key in Leader table
                    as: 'leader_info'
                }
            },
            {
                $unwind: {
                    path: '$leader_info',
                    preserveNullAndEmptyArrays: true // Preserve records without matching leader_info
                }
            },
            {
                $addFields: {
                    participantIdsArray: {
                        $map: {
                            input: { $split: ["$participantIds", ","] },
                            as: "id",
                            in: { $toObjectId: "$$id" }  // Convert string to ObjectId type
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: 'participant',  // Ensure collection name is correct
                    localField: 'participantIdsArray',
                    foreignField: '_id',
                    as: 'participantId_list'
                }
            },
            {
                $project: {
                    id: "$_id",  // Rename _id to id
                    userId: 1,
                    name: 1,
                    date: 1,
                    address: 1,
                    leaderId: 1,
                    leader_info: {
                        name: 1,
                        email: 1,
                        phone: 1
                    },
                    participantIdsArray: 1,
                    participantId_list: {
                        id: "$_id",  // Rename _id to id in participantId_list
                        name: 1,
                        email: 1,
                        phone: 1
                    }
                }
            }
        )
        const list = await ctx.model.Activity.aggregate(pipeline);
        const upcoming = list?.filter(item => {
            // Check if date is greater than current time and less than current time plus three days
            return dayjs(item.date).isAfter(dayjs()) && dayjs(item.date).isBefore(dayjs().add(5, 'day'));
        });
        ctx.success({
            data: upcoming?.map(item => {
                return updateModel(item);
            })
        });
    }
}
module.exports = ActivityService;