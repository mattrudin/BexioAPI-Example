import { resourceReducer, checkTimesheet } from './utilities';

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

const safeObject = {
  user_id: 'value',
  client_service_id: 'value',
  allowable_bill: false,
  tracking: {
    type: 'duration',
    date: 'value',
    duration: 'value',
  },
  pr_project_id: 'value',
};

const unsafeObject = {
  client_service_id: 'value',
  allowable_bill: false,
  tracking: {
    type: 'duration',
    date: 'value',
    duration: 'value',
  },
  pr_project_id: 'value',
};

test('input shall be object with given keys', () => {
  expect(checkTimesheet(safeObject)).toBeTruthy();
  expect(checkTimesheet(unsafeObject)).toBeFalsy();
});
