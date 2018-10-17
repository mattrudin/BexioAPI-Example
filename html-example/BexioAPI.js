class BexioAPI {
    constructor({clientID, clientSecret, redirectURI, scopes}) {
        this.data = {
            clientID: clientID,
            clientSecret: clientSecret,
            redirectURI: redirectURI,
            scopes: scopes,
            state: '',
            accessToken: '',
            organisation: ''
        }
    }

    callback = () => {
        setInterval(() => this.getAccess(), 1000);
    }
    
    goLogin = () => {
        const http = new XMLHttpRequest();
        const url = 'https://office.bexio.com/oauth/authorize';
        const state = this.generateState();
        const params = `client_id=${this.data.clientID}&redirect_uri=${this.data.redirectURI}&state=${state}&scope=${this.data.scopes}`;

        http.open('GET', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange = () => {
            if (http.readyState === 4 && http.status === 200) {
            window.location = `${url}?${params}`;
            }
        };
        http.send(params);
    }

    getAccess = () => {
        const isCode = window.location.href.match(/code=([^&]*)/);
        if (isCode) {
          //const state = window.location.href.match(/state=([^&]*)/)[1];
          clearInterval(this.callback); //does not work
          const code = isCode[1];
          this.getAccessToken(code);
        }
      }
    
    getAccessToken(code) {
        // no 'access-control-allow-origin' header is present on the requested resource.

        const http = new XMLHttpRequest();
        const url = 'https://office.bexio.com/oauth/access_token/';
        const params = `client_id=${this.data.clientID}&redirect_uri=${this.data.redirectURI}&client_secret=${this.data.clientSecret}&code=${code}`;
        
        http.open('POST', url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange = () => {
            if (http.readyState === 4 && http.status === 200) {
            const json = JSON.parse(http.responseText);
            const accessToken = json.access_token;
            const organisation = json.org;
            this.data.accessToken = accessToken;
            this.data.organisation = organisation;
            alert('AccessToken successfully received');
            }
        };
        http.send(params);
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
        console.log(url);
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
            default:
                alert('Unknown method');
        }
    }
}

export default BexioAPI;