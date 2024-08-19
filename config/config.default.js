/*
 * @description: Functionality
 * @author: Yoke
 * @Date: 2024-08-13 17:43:15
 */
/* eslint valid-jsdoc: "off" */

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1723542183210_7421';

  // add your middleware config here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://admin:admin@localhost:27017/egg?authSource=admin', // egg is the database name
      options: {},
    },
  };

  config.jwt = {
    secret: '123456',
    expiresIn: '24h',
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  // Load error_handler middleware
  config.middleware = ['errorHandler'];

  // Disable CSRF security protection
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.validatePlus = {
    resolveError(ctx, errors) {
      if (errors.length) {
        ctx.type = 'json';
        ctx.status = 400;
        ctx.fail({ code: 400, message: errors[0].message });
        ctx.throw(errors[0].message);
        throw new Error(errors[0].message);
      }
    },
  };

  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: 'auth',
      db: 0,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    logger: {
      appLogName: `${appInfo.name}-web.log`,
      coreLogName: 'egg-web.log',
      agentLogName: 'egg-agent.log',
      errorLogName: 'common-error.log',
    },
  };

  // 163 email configuration
  config.qqEmail = {
    host: 'smtp.163.com',		// SMTP address of QQ email
    port: 465,				 	// The port number of the email is generally 465
    secure: true,        // Use SSL encryption transmission
    auth: {
      user: 'xxxxxxxx', // Your own email address
      pass: 'xxxxxxxxxx',     // Authorization code
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};