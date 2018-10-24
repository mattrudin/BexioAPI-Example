import { resourceReducer, checkTimesheets } from './utilities';

test('input and output according specification', () => {
  expect(resourceReducer('users')).toBe('user');
  expect(resourceReducer('timesheets')).toBe('timesheet');
  expect(resourceReducer('projects')).toBe('pr_project');
  expect(resourceReducer('articles')).toBe('article');
  expect(resourceReducer('tasks')).toBe('task');
  expect(resourceReducer('contacts')).toBe('contact');
  expect(resourceReducer('business activities')).toBe('client_service');
  expect(resourceReducer('abc')).toBe(undefined);
});

describe('Timesheet check', () => {
  const safeInput = [
    {
      allowable_bill: true,
      client_service_id: 1,
      tracking: true,
      user_id: 1,
    },
  ];

  const missingInputBill = [
    {
      client_service_id: 1,
      tracking: true,
      user_id: 1,
    },
  ];

  const missingInputClient = [
    {
      allowable_bill: true,
      tracking: true,
      user_id: 1,
    },
  ];

  const missingInputTracking = [
    {
      allowable_bill: true,
      client_service_id: 1,
      user_id: 1,
    },
  ];

  const missingInputUser = [
    {
      allowable_bill: true,
      client_service_id: 1,
      tracking: true,
    },
  ];
  test('output shall be true or false', () => {
    expect(checkTimesheets(safeInput)).toBe(true);
    expect(checkTimesheets(missingInputBill)).toBe(false);
    expect(checkTimesheets(missingInputClient)).toBe(false);
    expect(checkTimesheets(missingInputTracking)).toBe(false);
    expect(checkTimesheets(missingInputUser)).toBe(false);
  });

  test('output shall be truthy or falsy', () => {
    expect(checkTimesheets(safeInput)).toBeTruthy();
    expect(checkTimesheets(missingInputBill)).toBeFalsy();
    expect(checkTimesheets(missingInputClient)).toBeFalsy();
    expect(checkTimesheets(missingInputTracking)).toBeFalsy();
    expect(checkTimesheets(missingInputUser)).toBeFalsy();
  });
});
