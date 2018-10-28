import { resourceReducer } from './utilities';

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
