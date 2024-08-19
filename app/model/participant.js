/*
 * @description: Functionality
 * @author: Yoke
 * @Date: 2024-08-14 15:50:23
 */
'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ParticipantSchema = new Schema({
        // User Id
        userId: { type: String },
        // Participant name
        name: { type: String },
        // Participant email
        email: { type: String },
        // Participant phone
        phone: { type: String },
    }, {
        timestamps: true, // Add createdAt and updatedAt
    });

    return mongoose.model('Participant', ParticipantSchema, 'participant');
};