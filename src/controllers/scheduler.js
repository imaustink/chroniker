const later = require('later');
const logger = require('../logger.js');

const RESCHEDULE = 'reschedule';
const noop = () => { };

class Scheduler {
  constructor({ executer = noop }) {
    this.executer = executer;
  }

  jobRegistry = {}
  jobIndex = []

  runAction(action) {
    // TODO handle result and error of executer (maybe even log it in the DB?)
    return Promise.resolve()
      .then(() => this.executer(action))
      .then(result => logger.log(result))
      .catch(error => {
        logger.error(error);
      });
  }

  createJob(id, { schedule, type, action, onCancel = noop }) {
    // TODO type checking
    const job = { type, onCancel };
    if (type === 'recur') {
      job.timer = later.setInterval(() => this.runAction(action), schedule);
    } else if (type === 'once') {
      const millisecondsUntil = schedule - Date.now();
      // TODO verify millisecondsUntil is a positive number
      job.timer = setTimeout(() => {
        this.runAction(action);
        this.unregisterJob(id);
      }, millisecondsUntil);
    } else {
      throw new Error('Type not supported!');
    }

    this.registerJob(id, job);

    return job;
  }

  updateJob(id, params) {
    this.cancelJob(id, RESCHEDULE);
    return this.createJob(id, params);
  }

  cancelJob(id, reason = null) {
    const job = this.jobRegistry[id];
    if (!job) {
      return false;
    }
    const { timer, type, onCancel } = job;
    if (type === 'recur') {
      timer.clear();
    } else if (type === 'once') {
      clearTimeout(timer);
    }
    this.unregisterJob(id);
    onCancel(reason);
  }

  registerJob(id, job) {
    job.index = (this.jobIndex.push(job) - 1);
    this.jobRegistry[id] = job;
    return id;
  }

  unregisterJob(id) {
    const job = this.jobRegistry[id];
    if (!job) {
      return false;
    }
    delete this.jobRegistry[id];
    this.jobIndex.splice(job.index, 1);
    return true;
  }
}

module.exports.Scheduler = Scheduler;
