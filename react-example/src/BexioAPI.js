import SetInterval from 'set-interval';
import { generateState, resourceReducer } from './utilities';

class BexioAPI {
    constructor({clientID, clientSecret, redirectURI, scopes}) {
        this.data = {
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
        this.data.state = generateState();
        localStorage.setItem('state', this.data.state);
        const params = `client_id=${this.data.clientID}&redirect_uri=${this.data.redirectURI}&state=${this.data.state}&scope=${this.data.scopes}`;
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
                const code = isCode[1];
                this.getAccessToken(code);
                localStorage.setItem('Login', true); //for further usage
            }
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
            .catch(err => {
                alert("Error: Could not retrive data!", err);
            });
    }

    async getData(resource) {
        let data;
        if (typeof resource === 'string' && !data) {
            const { accessToken, organisation } = this.data;
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

    postData = (resource) => {
        if (typeof resource === 'string') {
            //POST data
        } else {
            alert('Error: Please provide a string into this function.')
        }
    }

    postTimetracking = (timesheet) => { //resource is hardcoded as "timesheet"; scope: monitoring_edit
        if (typeof timesheet === 'object') {
            const { accessToken, organisation } = this.data;
            const baseUrl = 'https://office.bexio.com/api2.php/';
            const url = `${baseUrl}${organisation}/timesheet`;
            const reqHeader = new Headers({
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            });
            const data = JSON.stringify(timesheet);
            const initObject = {
                method: 'POST', body: data, headers: reqHeader
            };
            fetch(url, initObject)
                .then( response => {
                    return alert('Timesheets successfully uploaded!', response.json());
                })
                .catch(err => {
                    alert("Error: Could not send data!", err);
                });
        } else {
            alert('Error: Please provide an array into this function.');
        }
    }
}

export default BexioAPI;