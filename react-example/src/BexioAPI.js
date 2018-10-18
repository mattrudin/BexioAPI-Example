import SetInterval from 'set-interval';

class BexioAPI {
    constructor({clientID, clientSecret, redirectURI, scopes}) {
        this.data = {
            clientID: clientID,
            clientSecret: clientSecret,
            redirectURI: redirectURI,
            scopes: scopes,
            state: ''
        }
    }

    //callback = setInterval(console.log('hello'), 1000);
    callback = () => {
        SetInterval.start(this.getAccess, 1000,'callback');
    }

    goLogin = () => {
        // no 'access-control-allow-origin' header is present on the requested resource.
        const baseUrl = 'https://office.bexio.com/oauth/authorize?';
        const state = this.generateState();
        const params = `client_id=${this.data.clientID}&redirect_uri=${this.data.redirectURI}&state=${state}&scope=${this.data.scopes}`;
        const url = `${baseUrl}${params}`;

        window.location = `${url}`;
    }

    getAccess = () => {
        const isCode = window.location.href.match(/code=([^&]*)/);
        if (isCode) {
          //const state = window.location.href.match(/state=([^&]*)/)[1];
          SetInterval.clear('callback');
          //clearInterval(this.callback); //does not work
          const code = isCode[1];
          this.getAccessToken(code);
        }
      }

    getAccessToken = (code) => {
        const baseUrl = 'https://office.bexio.com/oauth/access_token?';
        const params = `client_id=${this.data.clientID}&redirect_uri=${this.data.redirectURI}&client_secret=${this.data.clientSecret}&code=${code}`;
        const url = `${baseUrl}${params}`;
        const reqHeader = new Headers({
            'Content-type': 'application/x-www-form-urlencoded',
        });
        const initObject = {
            method: 'POST', headers: reqHeader,
        };

        fetch(url, initObject)
            .then( response => {
                return response.json();
            })
            .then( receivedData => {
                this.data.accessToken = receivedData.access_token;
                this.data.organisation = receivedData.org;
                alert('AccessToken successfully received');
            })
            .catch(function (err) {
                console.log("Something went wrong!", err);
            });
    }

    generateState() {
        const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const UintArray = new Uint8Array(40);
        window.crypto.getRandomValues(UintArray);
        const array = UintArray.map(x => validChars.charCodeAt(x % validChars.length));
        const randomState = String.fromCharCode.apply(null, array);
        this.data.state = randomState;
        return randomState;
    }

    getData = (resource) => {
        const { accessToken, organisation } = this.data;
        const baseUrl = 'https://office.bexio.com/api2.php/';
        const resourceText = this.resourceReducer(resource);
        const url = `${baseUrl}${organisation}/${resourceText}`;
        const reqHeader = new Headers({
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        });
        const initObject = {
            method: 'GET', headers: reqHeader,
        };

        fetch(url, initObject)
            .then( response => {
                return response.json();
            })
            .then( receivedData => {
                this.data[resource] = {
                    ...receivedData
                  };
            })
            .catch(function (err) {
                console.log("Something went wrong!", err);
            });
    }

    resourceReducer(resource) {
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
}

export default BexioAPI;