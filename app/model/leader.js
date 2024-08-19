'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const LeaderSchema = new Schema({
        // User Id
        userId: { type: String },
        // Leader name
        name: { type: String },
        // Leader email
        email: { type: String },
        // Leader phone
        phone: { type: String },
    }, {
        timestamps: true, // Add createdAt and updatedAt
    });

    return mongoose.model('Leader', LeaderSchema, 'leader');
};