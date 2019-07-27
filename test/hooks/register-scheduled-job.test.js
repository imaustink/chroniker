const registerScheduledJob = require('../../src/hooks/register-scheduled-job');

describe('\'register-scheduled-job\' hook', () => {
  it('calls scheduler.createJob with the correct params', () => {
    expect.assertions(2);
    const schedulerMock = {
      createJob: jest.fn()
    };
    const context = {
      result: {
        _id: 'foo'
      }
    };
    const hook = registerScheduledJob(schedulerMock);
    const result = hook(context);
    expect(result).toEqual(context);
    expect(schedulerMock.createJob).toHaveBeenCalledWith(context.result._id, context.data);
  });
});
