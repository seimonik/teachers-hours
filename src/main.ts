import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import Keycloak, { KeycloakOnLoad } from "keycloak-js";
import moment from "moment";
import store from "./store";

moment.locale("ru");

// store.commit("SET_CONFIG", window.config);

// // eslint-disable-next-line prefer-const
// let initOptions = {
//   url: "http://localhost:8080",
//   realm: "dotnet-vue",
//   clientId: "vue",
//   onLoad: "login-required",
// };
// // eslint-disable-next-line prefer-const
// const keycloak = new Keycloak(initOptions);
// keycloak
//   .init({ onLoad: initOptions.onLoad as KeycloakOnLoad })
//   .then((auth) => {
//     if (!auth) {
//       window.location.reload();
//     } else {
//       console.log("Authenticated");
//     }

//     // createApp(App).mount("#app");
//   })
//   .catch((error) => {
//     console.log(error);
//     console.error("Authenticated Failed");
//   });

// keycloak.onTokenExpired = () => {
//   console.log("Token expired");

//   keycloak
//     .updateToken(30 * 60)
//     .then(() => {
//       console.log("Token renewed");
//     })
//     .catch(() => {
//       keycloak.login();
//     });
// };

// export default keycloak;

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.use(store);
app.use(router);
app.mount("#app");
// createApp(App).use(router).mount("#app");
