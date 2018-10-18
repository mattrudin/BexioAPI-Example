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
    switch(resource) {
        //case descriptions are according resources page, name column --> https://docs.bexio.com/resources/
        case 'users':
            return resourceText = 'user';
        case 'timesheets':
            return resourceText = 'timesheet';
        case 'projects':
            return resourceText = 'pr_project';
        case 'articles':
            return resourceText = 'article';
        case 'tasks':
            return resourceText = 'task';
        case 'contacts':
            return resourceText = 'contact';
        case 'business activities':
            return resourceText = 'client_service';
        default:
            alert('Unknown method');
    }
}