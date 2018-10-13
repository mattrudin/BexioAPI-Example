class Bexio {
    constructor() {
        this.data = {
            clientID: '',
            clientSecret: '',
            redirectURI: 'http://localhost:3000/',
            scopes: 'article_show monitoring_show project_show',
            state: '',
            accessToken: '',
            organisation: ''
        }
    }

    configure(clientID, clientSecret, redirectURI, scopes) {
        this.data.clientID = clientID;
        this.data.clientSecret = clientSecret;
        this.data.redirectURI = redirectURI;
        this.data.scopes = scopes;
    }

    getAccess() {
        const isCode = window.location.href.match(/code=([^&]*)/);
        if (isCode) {
          const state = window.location.href.match(/state=([^&]*)/)[1];
          if(this.data.state === state) {
          clearInterval(this.timerID);
          const code = isCode[1];
          this.getAccessToken(code);
          }
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

    goLogin= () => {
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

    generateState() {
        const validChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const UintArray = new Uint8Array(40);
        window.crypto.getRandomValues(UintArray);
        const array = UintArray.map(x => validChars.charCodeAt(x % validChars.length));
        const randomState = String.fromCharCode.apply(null, array);
        this.data.state = randomState;
        return randomState;
    }
    
}