export function generateState() {
  const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const UintArray = new Uint8Array(40);
  window.crypto.getRandomValues(UintArray);
  const array = UintArray.map(x => validChars.charCodeAt(x % validChars.length));
  const randomState = String.fromCharCode.apply(null, array);
  return randomState;
}

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
      return resourceText;
  }
}

export function checkTimesheets(timesheets) {
  const bill = timesheets.find(timesheet => timesheet.allowable_bill === undefined);
  const client = timesheets.find(timesheet => timesheet.client_service_id === undefined);
  const track = timesheets.find(timesheet => timesheet.tracking === undefined);
  const user = timesheets.find(timesheet => timesheet.user_id === undefined);
  let isVerified;
  if (bill || client || track || user) {
    isVerified = false;
  } else {
    isVerified = true;
  }
  return isVerified;
}
