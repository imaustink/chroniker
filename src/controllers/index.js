const { ActionRunner } = require('./action-runner');
const { Scheduler } = require('./scheduler');
const actionRunner = new ActionRunner();
const scheduler = new Scheduler({
  executer: action => actionRunner.runAction(action)
});

module.exports = {
  ActionRunner,
  actionRunner,
  Scheduler,
  scheduler
};

/* eslint-disable no-console */
actionRunner.injectAction('foo', (...args) => console.log('Foo was executed!', args));
actionRunner.injectAction('bar', (...args) => console.log('Bar was executed!', args));
