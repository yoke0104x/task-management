/*
 * @description: Functionality
 * @author: Yoke
 * @Date: 2024-08-14 10:15:37
 */
'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ActivitySchema = new Schema({
        // User Id
        userId: { type: String },
        // Activity name
        name: { type: String },
        // Activity date
        date: { type: String },
        // Activity address
        address: { type: String },
        // Activity description
        description: { type: String },
        // Activity leader
        leaderId: { type: Schema.Types.ObjectId, ref: 'leader' },
        // Activity participants
        participantIds: { type: String },
    }, {
        timestamps: true, // Add createdAt and updatedAt
    });

    return mongoose.model('Activity', ActivitySchema, 'activity');
};