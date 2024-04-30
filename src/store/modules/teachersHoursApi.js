import API from "@/API";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    test() {
      console.log("test");
    },
    TasksByFilters({ rootState }, data) {
      console.log(data);
      return API({
        method: "post",
        url: `${rootState.authConfig.apiTaskService}/api/notice/v1/tasks-by-filters`,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        data,
      });
    },
    UploadFile({ rootState }, data) {
      return API({
        method: "post",
        url: `${rootState.authConfig.apiTaskService}/api/reports/add-file`,
        headers: {
          Accept: "multipart/form-data, text/plain, */*",
          "Content-Type": "multipart/form-data",
        },
        data,
      });
    },
  },
};
