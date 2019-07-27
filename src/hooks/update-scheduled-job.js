module.exports = function (scheduler) {
  return context => {
    scheduler.updateJob(context.id, context.data);
    return context;
  };
};
