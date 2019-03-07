import * as Msal from "msal";
import credentials from "../credentials";

export default class AuthService {
  constructor() {
    let PROD_REDIRECT_URI = "OUR_PROD_URL_HERE";
    let redirectUri = window.location.origin;
    if (window.location.hostname !== "localhost") {
      redirectUri = PROD_REDIRECT_URI;
    }
    if (process.env.NODE_ENV === "production") {
      this.applicationConfig = {
        clientID: process.env.CLIENT_ID,
        graphScopes: ["user.read"]
      };
    } else {
      this.applicationConfig = {
        clientID: credentials.clientID,
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
