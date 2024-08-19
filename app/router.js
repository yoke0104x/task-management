/*
 * @description: Functionality
 * @author: Yoke
 * @Date: 2024-08-13 17:43:15
 */
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const jwt = app.middleware.jwt({ app });
  router.get('/', controller.home.index);
  // Get graphical captcha
  router.get('/api/user/captcha/:w/:h', controller.user.captcha);
  // User registration
  router.post('/api/user/create', controller.user.create);
  // User login
  router.post('/api/user/login', controller.user.login);
  // Query all users
  router.get('/api/user/index', jwt, controller.user.index);
  // Query current user information
  router.get('/api/user/info', jwt, controller.user.info);
  // Logout
  router.get('/api/user/logout', jwt, controller.user.logout);
  // Get user login status
  router.get('/api/user/status', jwt, controller.user.status);
  // Send email
  router.post('/api/send/email', controller.sendEmail.send);
  // Edit user information
  router.put('/api/user/edit', jwt, controller.user.edit);
  // Edit user
  router.put('/api/user/update/:id', jwt, controller.user.update);
  // Delete user
  router.delete('/api/user/delete/:id', jwt, controller.user.delete);
  // Reset password
  router.get('/api/user/reset/:id', jwt, controller.user.resetPassword);
  // admin create user
  router.post('/api/user/admin/create', jwt, controller.user.adminCreate);
  /**
   * Leader
   */
  router.resources('leader', '/api/leader', jwt, controller.leader);

  /**
   * Participant
   */
  router.resources('participant', '/api/participant', jwt, controller.participant);

  /**
   * Activity
   */
  router.resources('activity', '/api/activity', jwt, controller.activity);
  // Upcoming activities
  router.get('/api/activity/get/upcoming', jwt, controller.activity.upcoming);

  /**
   * Task
   */
  router.resources('task', '/api/task', jwt, controller.task);
};