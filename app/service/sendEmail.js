/*
 * @description: Functionality
 * @author: Yoke
 * @Date: 2024-08-15 11:49:56
 */
const Service = require('egg').Service;

class SendEmailService extends Service {
    /**
     * Send email
     * @param {Object} payload - Parameters for sending email
     */
    async send(payload) {
        const { app, ctx } = this;
        // Recipient address to send
        const account = payload.email
        if (!account) {
            ctx.throw(-1, 'Email cannot be empty');
        }

        const data = await ctx.model.User.findOne({ email: account });
        if (data) {
            ctx.throw(-1, 'This email is already registered');
        }

        // Generate 6-digit verification code
        const code = ctx.helper.rand(6); // This helper method is defined in extend/helper.js
        // Define template
        const email = {
            title: 'Email Verification Code',
            body: `
                <h1>Dear ${account} user</h1>
                <p style="font-size: 18px;color:#000;">
                Your verification code is:
                <span style="font-size: 20px;color:#f00;"> ${code}, </span>
                You are currently registering an account on a certain website, disclosing the verification code to others will lead to data information being stolen, please do not disclose it
                </p>
                <p style="font-size: 1.5rem;color:#999;">This verification code is valid for 5 minutes, please do not disclose it to others!</p>
                `,
        };

        const emailContent = {
            from: this.app.config.qqEmail.auth.user, // Sender address
            to: `${account}`, // Recipient address, multiple recipients can be separated by commas
            subject: email.title, // Email title
            html: email.body, // Email content
        };
        await ctx.helper.sendEmail(emailContent); // This helper method is defined in extend/helper.js
        // Store the verification code in redis, expires after 5 minutes
        await ctx.setRedis(account, code, 300);
        return ctx.success({
            email: account,
        });
    }
}
module.exports = SendEmailService;