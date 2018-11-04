export function generateState() {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const UintArray = new Uint8Array(40);
  window.crypto.getRandomValues(UintArray);
  const array = UintArray.map(x => validChars.charCodeAt(x % validChars.length));
  const randomState = String.fromCharCode.apply(null, array);
  return randomState;
}

// Functions for checking the data
export function checkTimesheet(timesheet) {
  if (typeof timesheet === 'object') {
    const isUserId = timesheet.hasOwnProperty('user_id');
    const isClientServiceId = timesheet.hasOwnProperty('client_service_id');
    const isAllowableBill = timesheet.hasOwnProperty('allowable_bill');
    const isTracking = timesheet.hasOwnProperty('tracking');
    const propertyNumber = isUserId + isClientServiceId + isAllowableBill + isTracking;
    const isVerified = propertyNumber === 4;
    return isVerified;
  }
}

export function checkProject(project) {
  if (typeof project === 'object') {
    const isContactId = project.hasOwnProperty('contact_id');
    const isName = project.hasOwnProperty('name');
    const isPrProjectTypeId = project.hasOwnProperty('pr_project_type_id');
    const isPrStateId = project.hasOwnProperty('pr_state_id');
    const isUserId = project.hasOwnProperty('user_id');
    const propertyNumber = isContactId + isName + isPrProjectTypeId + isPrStateId + isUserId;
    const isVerified = propertyNumber === 5;
    return isVerified;
  }
}

export function checkTask(task) {
  if (typeof task === 'object') {
    const isSubject = task.hasOwnProperty('subject');
    const isUserId = task.hasOwnProperty('user_id');
    const propertyNumber = isSubject + isUserId;
    const isVerified = propertyNumber === 2;
    return isVerified;
  }
}

export function checkContact(contact) {
  if (typeof contact === 'object') {
    const isContactTypeId = contact.hasOwnProperty('contact_type_id');
    const isName = contact.hasOwnProperty('name_1');
    const isOwner = contact.hasOwnProperty('owner_id');
    const isUser = contact.hasOwnProperty('user_id');
    const propertyNumber = isContactTypeId + isName + isOwner + isUser;
    const isVerified = propertyNumber === 4;
    return isVerified;
  }
}

export function checkClientService(service) {
  if (typeof service === 'object') {
    const isName = service.hasOwnProperty('name');
    const propertyNumber = Number(isName);
    const isVerified = propertyNumber === 1;
    return isVerified;
  }
}

// Functions for comparison the data
export function resourceReducer(resource) {
  let resourceText;
  switch (resource) {
    // case descriptions are according resources page, name column --> https://docs.bexio.com/resources/
    case 'users':
      resourceText = 'user';
      return resourceText;
    case 'timesheets':
      resourceText = 'timesheet';
      return resourceText;
    case 'projects':
      resourceText = 'pr_project';
      return resourceText;
    case 'articles':
      resourceText = 'article';
      return resourceText;
    case 'tasks':
      resourceText = 'task';
      return resourceText;
    case 'contacts':
      resourceText = 'contact';
      return resourceText;
    case 'business activities':
      resourceText = 'client_service';
      return resourceText;
    default:
      console.log('resourceReducer: Unknown method');
      resourceText = false;
      return resourceText;
  }
}

export function postDataReducer(resource, data) {
  let isVerified;
  switch (resource) {
    case 'timesheets':
      isVerified = checkTimesheet(data);
      return isVerified;
    case 'projects':
      isVerified = checkProject(data);
      return isVerified;
    case 'tasks':
      isVerified = checkTask(data);
      return isVerified;
    case 'contacts':
      isVerified = checkContact(data);
      return isVerified;
    case 'business activities':
      isVerified = checkClientService(data);
      return isVerified;
    default:
      console.log('Unknown resource');
      isVerified = false;
      return isVerified;
  }
}
