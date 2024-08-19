/*
 * @description: Login rule validation
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
    captcha: [
        {
            required: true,
            message: 'Captcha cannot be empty'
        }
    ],
    captchaId: [
        {
            required: true,
            message: 'Captcha ID cannot be empty'
        }
    ]
}
module.exports = rule;