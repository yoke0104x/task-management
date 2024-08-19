const nodemailer = require('nodemailer');

module.exports = {

    /**
     * Send email
     * @param {Object} mailOptions
     */
    sendEmail(mailOptions) {
        const transporter = nodemailer.createTransport(this.app.config.qqEmail);
        let that = this;
        transporter.sendMail(mailOptions, function (error, info) {
            if (!error) {
                that.ctx.logger.info('Email sent successfully');
                that.ctx.success({ message: 'Email sent successfully' });
                return;
            } else {
                that.ctx.logger.error('Email sending failed');
                that.ctx.throw(-1, 'Email sending failed');
                return;
            }
        });
    },

    /**
     * Generate a random number of specified length, default is 6 digits
     * @param {number} length 
     */
    rand(length = 6) {
        let Num = '';
        for (let i = 0; i < length; i++) {
            Num += Math.floor(Math.random() * 10);
        }
        return Num;
    },
}