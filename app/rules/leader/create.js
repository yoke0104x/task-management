/*
 * @description: Create leader
 * @author: Yoke
 * @Date: 2024-08-13 21:00:00
 */
const rule = {
    name: [
        {
            required: true,
            message: 'Leader name cannot be empty'
        },
    ],
}
module.exports = rule;