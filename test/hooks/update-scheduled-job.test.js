const updateScheduledJob = require('../../src/hooks/update-scheduled-job');

describe('\'update-scheduled-job\' hook', () => {
  it('calls scheduler.updateJob with the correct params', () => {
    expect.assertions(2);
    const schedulerMock = {
      updateJob: jest.fn()
    };
    const context = {
      id: 'foo',
      data: {
        name: 'bar'
      }
    };
    const hook = updateScheduledJob(schedulerMock);
    const result = hook(context);
    expect(result).toEqual(context);
    expect(schedulerMock.updateJob).toHaveBeenCalledWith(context.id, context.data);
  });
});
