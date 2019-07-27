const { authenticate } = require('@feathersjs/authentication').hooks;
const { scheduler } = require('../../controllers/');
const registerScheduledJob = require('../../hooks/register-scheduled-job');
const updateScheduledJob = require('../../hooks/update-scheduled-job');
const cancelScheduledJob = require('../../hooks/cancel-scheduled-job');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [registerScheduledJob(scheduler)],
    update: [updateScheduledJob(scheduler)],
    patch: [updateScheduledJob(scheduler)],
    remove: [cancelScheduledJob(scheduler)]
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
