/*
 * @description: Functionality
 * @author: Yoke
 * @Date: 2024-08-14 08:53:34
 */
module.exports = (options, app) => {
    return async function jwtMiddleware(ctx, next) {
        console.log(ctx.request.header?.authorization, ctx.cookies.get('token'))
        const authorization = ctx.request.header?.authorization;
        const token1 = ctx.cookies.get('token');

        if (!authorization && !token1) {
            ctx.fail({ code: 1200, status: 401, message: 'Not logged in, please log in first' });
            return;
        }

        // Other logic
        const token = ctx.request.header?.authorization?.replace('Bearer ', '') || ctx.cookies.get('token');

        if (!token) {
            ctx.fail({ code: 1200, status: 401, message: 'Not logged in, please log in first' });
            return;
        }

        // Verify and decode JWT
        let decoded;
        try {
            decoded = ctx.verify(token);
        } catch (error) {
            ctx.fail({ code: 1201, status: 401, message: 'Token parsing error' });
            return;
        }
        const user = await ctx.getRedis(decoded.id);
        ctx.logger.info('Current logged-in user:', user);
        if (user !== token) {
            ctx.fail({ code: 1202, status: 401, message: 'Token has expired, please log in again' });
            return;
        }
        if (decoded?.id === "66bf09f1130c01ee0a2862d1") {
            ctx.state.user = {
                ...decoded,
                id: undefined,
                role: 'admin',
                superAdminId: decoded.id
            };
        } else {
            ctx.state.user = decoded
        }
        await next();
    };
};