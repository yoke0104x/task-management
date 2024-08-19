/*
 * @description: 功能
 * @author: Yoke
 * @Date: 2024-08-13 17:43:15
 */
/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  validatePlus: {
    enable: true,
    package: 'egg-validate-plus',
  },
  bcrypt: {
    enable: true,
    package: 'egg-bcrypt',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
};
