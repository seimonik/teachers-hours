import store from "@/store";
import Keycloak, { KeycloakOnLoad } from "keycloak-js";
import axios from "axios";
import moment from "moment";

let initOptions = {
  url: "http://localhost:8080",
  realm: "dotnet-vue",
  clientId: "vue",
  onLoad: "login-required",
};

const getKeycloak = () => new Keycloak(initOptions);
const keycloakLogin = (redirectComand) => {
  const keycloak = getKeycloak();
  keycloak
    .init({ onLoad: initOptions.onLoad })
    .then((auth) => {
      if (!auth) {
        keycloak.login();
      } else {
        const tokenData = {
          access_token_exp: keycloak.tokenParsed.exp - keycloak.tokenParsed.iat,
          token_receive_time: new Date(),
          access_token: keycloak.token,
          refresh_token: keycloak.refreshToken,
          id_token: keycloak.idToken,
        };
        console.log(tokenData);
        store.dispatch("setTokenInfo", {
          token_info: JSON.stringify(tokenData),
        });
        redirectComand();
        console.log("Authenticated");
      }
    })
    .catch((error) => {
      console.log(error);
      console.error("Authenticated Failed");
    });
};

const keycloakLogout = () => {
  const redirectUri = "http://localhost:8081";
  const logoutURL =
    `${initOptions.url}/realms/${initOptions.realm}/protocol/openid-connect/logout` +
    `?id_token_hint=${store.getters.tokenInfo.id_token}` +
    `&post_logout_redirect_uri=${redirectUri}`;
  removeTokens();
  window.location.href = logoutURL;
};

const removeTokens = () => {
  store.replaceState({});
  localStorage.clear();
};

const logout = () => {
  keycloakLogout();
};

const login = (redirectComand) => {
  if (store.getters.tokenInfo) {
    keycloakLogout();
  }
  keycloakLogin(redirectComand);
};

const checkAndResetTokenInfo = () => {
  if (!store.getters.isAuthenticated) {
    return;
  }

  const tokenExpirationTime = store.getters.tokenInfo.access_token_exp;
  // console.log('access_token_exp', store.getters.tokenInfo.access_token_exp);
  const rawTokenReceiveTime = store.getters.tokenInfo.token_receive_time;
  // console.log('rawTokenReceiveTime', rawTokenReceiveTime);
  const tokenReceiveRime = moment(rawTokenReceiveTime).toDate();
  // console.log('tokenReceiveRime', tokenReceiveRime);
  const currentTime = new Date();
  // console.log('currentTime', currentTime);
  const timePassedMilliseconds = Math.abs(currentTime - tokenReceiveRime);
  // console.log('timePassedMilliseconds', timePassedMilliseconds);
  const timePassedSeconds = Math.round(timePassedMilliseconds / 1000);
  // console.log('timePassedSeconds', timePassedSeconds);
  const isNeedRefreshe = timePassedSeconds > tokenExpirationTime - 90;
  // console.log('isNeedRefreshe', isNeedRefreshe);

  if (!isNeedRefreshe) {
    return;
  }

  const params = new URLSearchParams();
  params.append("refresh_token", store.getters.tokenInfo.refresh_token);
  params.append("client_id", initOptions.clientId);
  params.append("grant_type", "refresh_token");
  axios
    .post(
      `${initOptions.url}/realms/${initOptions.realm}/protocol/openid-connect/token`,
      params
    )
    .then((responce) => {
      const tokenData = {
        access_token_exp: responce.data.expires_in,
        token_receive_time: new Date(),
        access_token: responce.data.access_token,
        refresh_token: responce.data.refresh_token,
        id_token: responce.data.id_token,
      };
      store.dispatch("setTokenInfo", {
        token_info: JSON.stringify(tokenData),
      });
    })
    .catch((error) => {
      removeTokens();
      console.log("error", error);
    });
};

setInterval(() => {
  checkAndResetTokenInfo();
}, 10000);

export { login, logout, checkAndResetTokenInfo };
