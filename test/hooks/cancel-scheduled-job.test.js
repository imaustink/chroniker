const cancelScheduledJob = require('../../src/hooks/cancel-scheduled-job');

describe('\'cancel-scheduled-job\' hook', () => {
  it('calls scheduler.cancelJob with the correct params', () => {
    expect.assertions(2);
    const schedulerMock = {
      cancelJob: jest.fn()
    };
    const context = {
      id: 'test',
      data: {
        reason: 'foo'
      }
    };
    const hook = cancelScheduledJob(schedulerMock);
    const result = hook(context);
    expect(result).toEqual(context);
    expect(schedulerMock.cancelJob).toHaveBeenCalledWith(context.id, context.data.reason);
  });
});
