/*
 * @description: 功能
 * @author: Yoke
 * @Date: 2024-08-13 17:59:37
 */
'use strict';
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        username: { type: String, },
        password: { type: String, },
        email: { type: String, },
        phone: { type: String, },
    }, {
        timestamps: true, // Add createdAt and updatedAt
    });

    return mongoose.model('User', UserSchema, 'user'); // Use uppercase User as the model name
};