/*
 * @description: User creation rules
 * @author: Yoke
 * @Date: 2024-08-13 21:00:00
 */
const rule = {
    username: [
        {
            required: true,
            message: 'Username cannot be empty'
        },
    ],
    password: [
        {
            required: true,
            message: 'Password cannot be empty'
        },
    ],
    email: [
        {
            required: true,
            message: 'Email cannot be empty'
        },
    ],
}
module.exports = rule;