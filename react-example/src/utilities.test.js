import {
  resourceReducer,
  postDataReducer,
  checkTimesheet,
  checkProject,
  checkTask,
  checkContact,
  checkClientService,
} from './utilities';

describe('resourceReducer test suite', () => {
  test('input and output according specification', () => {
    expect(resourceReducer('users')).toBe('user');
    expect(resourceReducer('timesheets')).toBe('timesheet');
    expect(resourceReducer('projects')).toBe('pr_project');
    expect(resourceReducer('articles')).toBe('article');
    expect(resourceReducer('tasks')).toBe('task');
    expect(resourceReducer('contacts')).toBe('contact');
    expect(resourceReducer('business activities')).toBe('client_service');
    expect(resourceReducer('abc')).toBeFalsy();
    expect(resourceReducer()).toBeFalsy();
  });
});

describe('postDataReducer test suite', () => {
  const safeObjectTimesheet = {
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

  const unsafeObjectTimesheet = {
    client_service_id: 'value',
    allowable_bill: false,
    pr_project_id: 'value',
  };

  const safeObjectProject = {
    name: 'Villa Kunterbunt',
    contact_id: 1,
    user_id: 1,
    pr_state_id: 1,
    pr_project_type_id: 1,
  };

  const unsafeObjectProject = {
    name: 'Villa Kunterbunt',
    pr_project_type_id: 1,
  };

  const safeObjectTask = {
    user_id: 1,
    subject: 'Planning my vacation with Beatrice',
    finish_date: '2013-02-25 10:00:00',
  };

  const unsafeObjectTask = {
    finish_date: '2013-02-25 10:00:00',
  };

  const safeObjectContact = {
    name_1: 'test',
    user_id: 1,
    country_id: 1,
    owner_id: 1,
    contact_type_id: 1,
    contact_group_ids: [1, 2],
  };

  const unsafeObjectContact = {
    country_id: 1,
    contact_group_ids: [1, 2],
  };

  const safeObjectClientService = {
    name: 'programming',
    default_is_billable: false,
    default_price_per_hour: 20.5,
    account_id: null,
  };

  const unsafeObjectClientService = {
    account_id: null,
  };

  const unsafeArray = ['abc'];

  test('output shall be true or false', () => {
    expect(postDataReducer('timesheets', safeObjectTimesheet)).toBeTruthy();
    expect(postDataReducer('timesheets', unsafeObjectTimesheet)).toBeFalsy();
    expect(postDataReducer('projects', safeObjectProject)).toBeTruthy();
    expect(postDataReducer('projects', unsafeObjectProject)).toBeFalsy();
    expect(postDataReducer('tasks', safeObjectTask)).toBeTruthy();
    expect(postDataReducer('tasks', unsafeObjectTask)).toBeFalsy();
    expect(postDataReducer('contacts', safeObjectContact)).toBeTruthy();
    expect(postDataReducer('contacts', unsafeObjectContact)).toBeFalsy();
    expect(postDataReducer('business activities', safeObjectClientService)).toBeTruthy();
    expect(postDataReducer('business activities', unsafeObjectClientService)).toBeFalsy();
    expect(postDataReducer('abc', unsafeObjectClientService)).toBeFalsy();
    expect(postDataReducer('business activities', unsafeArray)).toBeFalsy();
    expect(postDataReducer()).toBeFalsy();
  });
});

describe('checkTimesheet test suite', () => {
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
});

describe('checkProject test suite', () => {
  const safeObject = {
    name: 'Villa Kunterbunt',
    contact_id: 1,
    user_id: 1,
    pr_state_id: 1,
    pr_project_type_id: 1,
  };

  const unsafeObject = {
    name: 'Villa Kunterbunt',
    user_id: 1,
    pr_state_id: 1,
    pr_project_type_id: 1,
  };

  test('input shall be object with given keys', () => {
    expect(checkProject(safeObject)).toBeTruthy();
    expect(checkProject(unsafeObject)).toBeFalsy();
  });
});

describe('checkTask test suite', () => {
  const safeObject = {
    user_id: 1,
    subject: 'Planning my vacation with Beatrice',
    finish_date: '2013-02-25 10:00:00',
  };

  const unsafeObject = {
    subject: 'Planning my vacation with Beatrice',
    finish_date: '2013-02-25 10:00:00',
  };

  test('input shall be object with given keys', () => {
    expect(checkTask(safeObject)).toBeTruthy();
    expect(checkTask(unsafeObject)).toBeFalsy();
  });
});

describe('checkContact test suite', () => {
  const safeObject = {
    name_1: 'test',
    user_id: 1,
    country_id: 1,
    owner_id: 1,
    contact_type_id: 1,
    contact_group_ids: [1, 2],
  };

  const unsafeObject = {
    name_1: 'test',
    user_id: 1,
    country_id: 1,
    contact_group_ids: [1, 2],
  };
  test('input shall be object with given keys', () => {
    expect(checkContact(safeObject)).toBeTruthy();
    expect(checkContact(unsafeObject)).toBeFalsy();
  });
});

describe('checkClientService test suite', () => {
  const safeObject = {
    name: 'programming',
    default_is_billable: false,
    default_price_per_hour: 20.5,
    account_id: null,
  };

  const unsafeObject = {
    default_is_billable: false,
    default_price_per_hour: 20.5,
    account_id: null,
  };

  test('input shall be object with given keys', () => {
    expect(checkClientService(safeObject)).toBeTruthy();
    expect(checkClientService(unsafeObject)).toBeFalsy();
  });
});
