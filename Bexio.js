class Bexio {
    constructor() {
        this.data = {
            clientID: '',
            clientSecret: '',
            scopes: []
        }
    }

    configure(clientID, clientSecret, scopes) {
        this.data.clientID = clientID;
        this.data.clientSecret = clientSecret;
        this.data.scopes = scopes;
    }

    getConfigure() {
        console.log(this.data);
    }
}