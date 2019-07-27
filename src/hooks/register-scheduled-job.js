module.exports = function (scheduler) {
  return context => {
    scheduler.createJob(context.result._id, context.data);
    return context;
  };
};
