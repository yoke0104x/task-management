/*
 * @description: Task model
 * @author: Yoke
 * @Date: 2024-08-14 10:15:37
 */
'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const TaskSchema = new Schema({
        // User Id
        userId: { type: String },
        // Related activity Id
        activityId: { type: Schema.Types.ObjectId, ref: 'activity' },
        // Task title
        title: { type: String },
        // Task description
        description: { type: String },
        // Deadline
        deadline: { type: String },
        // Assignee
        assigneeId: { type: Schema.Types.ObjectId, ref: 'leader' },
        // Task status
        status: { type: String },
    }, {
        timestamps: true, // Add createdAt and updatedAt
    });

    return mongoose.model('Task', TaskSchema, 'task');
};