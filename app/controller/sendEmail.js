/*
 * @description: Send email controller
 * @author: Yoke
 * @Date: 2024-08-15 11:48:47
 */
const controller = require('egg').Controller;

class SendEmailController extends controller {
    /**
     * Send email
     */
    async send() {
        const { ctx, service } = this;
        const payload = ctx.request.body || {};
        await service.sendEmail.send(payload);
    }
}

module.exports = SendEmailController;