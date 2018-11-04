# BexioAPI
For client side implementation

## Features
TODO

## How to use
### Install
First install the BexioAPI from npm:
```javascript
npm install BexioAPI //paket not yet published!
```
Then import the BexioAPI into the project:
```javascript
import BexioAPI from 'BexioAPI';
```
### Initialize the client
Create a config object and initialize the BexioAPI:
```javascript
const config = {
  clientID: //your client_id,
  clientSecret: //your client_secret,
  redirectURI: 'http://localhost:3000/', //your redirect URI
  scopes: 'article_show monitoring_show project_show', //required scopes, see: https://docs.bexio.com/resources/ (click on the required resource and then "scopes")
  // or see https://docs.bexio.com/oauth/scopes/index.html for a exhaustive list of the available scopes
};

  //initialize the Bexio object
  const Bexio = new BexioAPI(config); // please use this name convention as best practice
```
Export the new Bexio object to use it in other components/files:
```javascript
//source component/file
export const Bexio = new BexioAPI(config)

//other component/file
import { Bexio } from '<PATH TO SOURCE FILE>';
```

### Login
In a react-project, use the componentDidMount() lifecycle to catch the login-token
```javascript
componentDidMount() {
    Bexio.callback();
  }
```
To redirect the user to the Bexio login page, use the login() method from the API
```javascript
//the button is just an example
<button className="button" type="button" onClick={() => Bexio.login()}>Login to Bexio</button>
```

Please keep in mind: the callback() has to be invoked *before* the login() method. Otherwise the token won't be received trough the procedure and the login() method throws an error.

### Get Data (in development)
First ensure you've got the right scopes for the requested data. Otherwise the API throws an error.
Currently the following data can be requested from Bexio:
```
users
timesheets
projects
articles
tasks
contacts
business activities
```
See the following link for an exhaustive list: [Bexio documentation: Resources](https://docs.bexio.com/resources/)  

Use the following method to get your data:
```javascript
Bexio.getData('<YOUR_RESOURCE>');

//Example
async handleGetData() {
    const userNames = await Bexio.getData('users');
}
```
Please note the *async/await* keywords: getData is an asynchronous method.
#### Errors
The method throws errors for the following reasons:
 - YOUR_RESOURCE is not a valid Bexio resource

### Post Data (in development)
First ensure you've got the right scopes for the requested data. Otherwise the API throws an error.
Currently the following data can be sent to Bexio:
```
timesheets
projects
tasks
contacts
business activities
```
Use the following method to send data:
```javascript
Bexio.postData('<YOUR RESOURCE', YOUR_DATA);
```
Please note: YOUR_DATA shall be an object. The method will convert the object to a JSON object. 
Also note: Bexio can only handle one object at a time. You can't send a couple of informations packed as array or object to Bexio. 
#### Errors
The method throws errors for the following reasons:
 - YOUR_DATA is not an object
 - YOUR_DATA contains not the required parameters (see the Bexio documentation, under the given resource --> "Form parameters" for the required parameters)