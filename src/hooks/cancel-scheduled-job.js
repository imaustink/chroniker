module.exports = function (scheduler) {
  return context => {
    scheduler.cancelJob(context.id, context.data.reason);
    return context;
  };
};
