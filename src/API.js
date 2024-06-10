import axios from "axios";
// import router from '@/router';
import store from "./store";

export default (options) =>
  new Promise((resolve, reject) => {
    console.log(store.getters.tokenInfo.access_token);
    axios({
      url: options.url,
      method: options.method,
      params: options.params,
      headers: {
        authorization: `Bearer ${store.getters.tokenInfo.access_token}`,
        ...options.headers,
      },
      data: options.data,
      responseType: options.responseType,
    })
      .then((resourse) => {
        // if (isGetResourse) resolve(resourse);
        resolve(resourse);
      })
      .catch((error) => {
        // не авторизован
        // if (error.response.status === 401) {
        //   router.replace({ path: '/logout' });
        // }
        reject(error);
      });

    if (
      window.navigator.userAgent.indexOf("MSIE ") > -1 ||
      window.navigator.userAgent.indexOf("Trident/") > -1
    ) {
      axios.interceptors.request.use((config) => {
        if (config.url.indexOf("GetRequirementItems") !== -1) {
          // eslint-disable-next-line
          console.log(config.url);
          // eslint-disable-next-line no-param-reassign
          config.headers.pragma = "no-cache";
          // eslint-disable-next-line no-param-reassign
          config.headers.cacheControl = "no-cache";
          // eslint-disable-next-line no-param-reassign
          config.headers.expires = "Sat, 01 Jan 2000 00:00:00 GMT";
        }
        return config;
      });
    }
  });
