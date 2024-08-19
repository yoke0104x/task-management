/*
 * @description: Validation rules for creating activities
 * @author: Yoke
 * @Date: 2024-08-13 21:00:00
 */
const rule = {
    name: [
        {
            required: true,
            message: 'Activity name cannot be empty'
        },
    ],
    date: [
        {
            required: true,
            message: 'Activity date cannot be empty'
        },
    ],
    address: [
        {
            required: true,
            message: 'Activity address cannot be empty'
        },
    ],
    leaderId: [
        {
            required: true,
            message: 'Activity leader cannot be empty'
        },
    ],
    participantIds: [
        {
            required: true,
            message: 'Activity participants cannot be empty'
        },
    ]
}
module.exports = rule;