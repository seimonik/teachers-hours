import { createStore } from "vuex";
import teachersHoursApi from "./modules/teachersHoursApi";
import { nextTick } from "vue";
import routeRoleMap from "../router/RouteRoleMap.json";
import jwt_decode from "jwt-decode";

const nextTicks = () => +new Date();
const store = createStore({
  state: {
    authConfig: {},
    token: "",
    keycloakInstance: null,
    isTokenReady: false,
    roles: [],
  },
  mutations: {
    SET_TOKEN_INFO(state, { payload, getters }) {
      if ((payload || {}).token_info == null) {
        throw Error("token_info is null");
      }
      (state.$__updated = nextTicks()) &&
        localStorage.setItem("token_info", payload.token_info);
      state.roles = getters.account.role;
    },
    SET_ROLES(state, payload) {
      state.roles = payload;
    },
    SET_CONFIG(state, payload) {
      state.authConfig = payload;
    },
    saveToken(state, payload) {
      state.token = payload;
    },
  },
  getters: {
    tokenInfo(state) {
      console.log("TOKEN INFO");
      console.log(JSON.parse(localStorage.getItem("token_info")));
      if (state.$__updated) {
        return JSON.parse(localStorage.getItem("token_info"));
      }
    },
    getToken(state) {
      return state.token;
    },
    isExistsAccessToken(state, getters) {
      return (
        !!getters.tokenInfo?.access_token_exp &&
        !!getters.tokenInfo?.token_receive_time &&
        !!getters.tokenInfo?.access_token &&
        !!getters.tokenInfo?.refresh_token &&
        !!getters.tokenInfo?.id_token
      );
    },
    isAuthenticated(state, getters) {
      return getters.isExistsAccessToken;
    },
    isAuthorized(state, getters) {
      return getters.isAuthenticated;
    },
    roles(state) {
      return state.roles;
    },
    IsRouteAllowed: (state, getters) => (route) => {
      console.log(getters.roles);
      if (routeRoleMap[route]) {
        return (
          routeRoleMap[route].filter((x) => getters.roles.includes(x)).length >
          0
        );
      }
      return true;
    },
    isNotExistsAccessToken(state, getters) {
      return !getters.isExistsAccessToken;
    },
    account(state, getters) {
      if (getters.isNotExistsAccessToken) {
        console.log("НЕ НАШЕЛ РОЛИ");
        return {};
      }
      console.log(getters.tokenInfo);
      const jwtDecoded = jwt_decode(getters.tokenInfo.access_token);
      console.log(jwtDecoded);
      return {
        role: jwtDecoded.realm_access.roles,
        sub: jwtDecoded.sub,
        exp: jwtDecoded.exp,
        firstName: jwtDecoded.given_name,
        lastName: jwtDecoded.family_name,
        patronymic: jwtDecoded.middle_name,
        fullName: jwtDecoded.name,
        email: jwtDecoded.email,
      };
    },
  },
  actions: {
    setTokenInfo({ commit, getters }, payload) {
      commit("SET_TOKEN_INFO", { payload, getters });
    },
    removeTokenInfo({ commit }, payload) {
      commit("REMOVE_TOKEN_INFO", payload);
    },
  },
  modules: {
    teachersHoursApi,
  },
});
export default store;
