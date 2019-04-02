import * as Msal from "msal";

export default class AuthService {
  constructor() {
    let PROD_REDIRECT_URI = "https://engr-dudes.herokuapp.com/";
    let redirectUri = window.location.origin;
    if (window.location.hostname !== "localhost") {
      redirectUri = PROD_REDIRECT_URI;
    }
    if (process.env.NODE_ENV === "production") {
      this.applicationConfig = {
        clientID: process.env.react_app_ad_clientid,
        graphScopes: ["user.read"]
      };
    } else {
      this.applicationConfig = {
        //import a from 'b';
        //const a = require('b').default
        clientID: require("../credentials").default.clientID,
        graphScopes: ["user.read"]
      };
    }

    this.app = new Msal.UserAgentApplication(
      this.applicationConfig.clientID,
      "",
      () => {
        // callback for login redirect
      },
      {
        redirectUri
      }
    );
  }
  login = () => {
    return this.app.loginPopup(this.applicationConfig.graphScopes).then(
      idToken => {
        const user = this.app.getUser();
        if (user) {
          return user;
        } else {
          return null;
        }
      },
      () => {
        return null;
      }
    );
  };

  getUser = () => {
    return this.app.getUser();
  };

  logout = () => {
    this.app.logout();
  };
  getToken = () => {
    return this.app.acquireTokenSilent(this.applicationConfig.graphScopes).then(
      accessToken => {
        return accessToken;
      },
      error => {
        return this.app
          .acquireTokenPopup(this.applicationConfig.graphScopes)
          .then(
            accessToken => {
              return accessToken;
            },
            err => {
              console.error(err);
            }
          );
      }
    );
  };
}
