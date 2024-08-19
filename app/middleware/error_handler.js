/*
 * @description: Functionality
 * @author: Yoke
 * @Date: 2024-08-13 21:25:22
 */
// app/middleware/error_handler.js
module.exports = () => {
    return async function errorHandler(ctx, next) {
        try {
            await next();
        } catch (err) {
            // All exceptions trigger an error event on the app, and the framework will log an error
            ctx.app.emit('error', err, ctx);
            // Set status code
            ctx.status = err.status || 500;
            // In production environment, the detailed error content of 500 errors is not returned to the client because it may contain sensitive information
            const error = ctx.app.config.env === 'prod'
                ? 'Internal Server Error'
                : err.message;
            if (ctx.status === 400) {
            } else {
                ctx.fail({ message: error });
            }
        }
    };
};