import SetInterval from 'set-interval';
import { generateState, resourceReducer } from './utilities';

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

    callback = () => {
        SetInterval.start(this.getAccess, 1000,'callback');
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

    getData = (resource) => {
        const data = [];
        if (typeof resource === 'string') {
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
    
            fetch(url, initObject)
                .then( response => {
                    return response.json();
                })
                .then( receivedData => {
                    data = [...receivedData];
                })
                .catch(err => {
                    alert("Error: Could not retrive data!", err);
                });
        } else {
            alert('Error: Please provide a string into this function.')
        }
        return data ? data : alert('Error: Data was not received.')
    }

    postData = (resource) => {
        if (typeof resource === 'string') {
            //POST data
        } else {
            alert('Error: Please provide a string into this function.')
        }
    }

    postTimetracking = (resource) => { 
        if (typeof resource === 'string') {
            //POST data
        } else {
            alert('Error: Please provide a string into this function.')
        }
    }
}

export default BexioAPI;