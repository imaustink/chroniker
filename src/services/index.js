const users = require('./users/users.service.js');
const schedules = require('./schedules/schedules.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(schedules);
};
