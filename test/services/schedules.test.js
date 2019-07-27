const app = require('../../src/app');

describe('\'schedules\' service', () => {
  it('registered the service', () => {
    const service = app.service('schedules');
    expect(service).toBeTruthy();
  });
});
