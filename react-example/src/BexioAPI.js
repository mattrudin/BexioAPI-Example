import { generateState, resourceReducer, checkTimesheet, checkProject, postDataReducer } from './utilities';
import SetInterval from 'set-interval';

class BexioAPI {
    constructor({clientID, clientSecret, redirectURI, scopes}) {
        this.state = {
            clientID: clientID,
            clientSecret: clientSecret,
            redirectURI: redirectURI,
            scopes: scopes,
            state: '',
            accessToken: '',
            organisation: '',
        }
    }

    callback = () => {
        SetInterval.start(this.getAccess, 500,'callback');
    }

    login = () => {
        // no 'access-control-allow-origin' header is present on the requested resource.
        const baseUrl = 'https://office.bexio.com/oauth/authorize?';
        this.state.state = generateState();
        localStorage.setItem('state', this.state.state);
        const params = `client_id=${this.state.clientID}&redirect_uri=${this.state.redirectURI}&state=${this.state.state}&scope=${this.state.scopes}`;
        const url = `${baseUrl}${params}`;

        window.location = `${url}`;
    }

    getAccess = () => {
        const isCode = window.location.href.match(/code=([^&]*)/);
        if (isCode) {
            SetInterval.clear('callback');
            const stateReceived = window.location.href.match(/state=([^&]*)/)[1];
            const stateSent = localStorage.getItem('state');
            if(stateReceived === stateSent) {
                localStorage.clear();
                window.history.pushState('Access Token', null, '/');
                const code = isCode[1];
                this.getAccessToken(code);
                localStorage.setItem('Login', true); //for connection between the API and the actual app
            }
        }
    }

    getAccessToken = (code) => {
        const baseUrl = 'https://office.bexio.com/oauth/access_token?';
        const params = `client_id=${this.state.clientID}&redirect_uri=${this.state.redirectURI}&client_secret=${this.state.clientSecret}&code=${code}`;
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
                this.state.accessToken = receivedData.access_token;
                this.state.organisation = receivedData.org;
                alert('AccessToken successfully received');
            })
            .catch(err => {
                alert("Error: Could not retrive data!", err);
            });
    }

    async getData(resource) {
        let data;
        if (typeof resource === 'string' && !data) {
            const { accessToken, organisation } = this.state;
            const baseUrl = 'https://office.bexio.com/api2.php/';
            const resourceText = resourceReducer(resource);
            const url = `${baseUrl}${organisation}/${resourceText}`;
            const reqHeader = new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            });
            const initObject = {
                method: 'GET', headers: reqHeader,
            };

            try{
                data = await fetch(url, initObject).then(response => response.json());
            } catch (error) {
                alert('Error:', error)
            }
        } else {
            alert('Error: Please provide a string into this function.')
        }

        return data;
    }

    postData = (resource, data) => {
        const resourceURL = resourceReducer(resource);
        const isVerified = postDataReducer(resource, data);
        if (isVerified) {
            const { accessToken, organisation } = this.state;
            const baseUrl = 'https://office.bexio.com/api2.php/';
            const url = `${baseUrl}${organisation}/${resourceURL}`;
            const reqHeader = new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            });
            const dataToPost = JSON.stringify(data);
            const initObject = {
                method: 'POST', body: dataToPost, headers: reqHeader
            };
            fetch(url, initObject)
                .then( response => {
                    return alert('Data successfully uploaded!', response.json());
                })
                .catch(err => {
                    alert("Error: Could not send data!", err);
                });
        }
    }
}

export default BexioAPI;