/*
 * @description: Task creation rule validation
 * @author: Yoke
 * @Date: 2024-08-14 17:10:52
 */
const rule = {
    activityId: [
        {
            required: true,
            message: 'Activity ID cannot be empty'
        },
    ],
    title: [
        {
            required: true,
            message: 'Task title cannot be empty'
        },
    ],
    deadline: [
        {
            required: true,
            message: 'Deadline cannot be empty'
        },
    ],
    assigneeId: [
        {
            required: true,
            message: 'Assignee cannot be empty'
        },
    ],
    status: [
        {
            required: true,
            message: 'Task status cannot be empty'
        },
    ],
}
module.exports = rule;