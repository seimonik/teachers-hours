import API from "@/API";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
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
    GetFile({ rootState }) {
      return API({
        method: "get",
        url: `https://localhost:7055/api/reports`,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
    },
    AddTeacher({ rootState }, data) {
      return API({
        method: "post",
        url: `https://localhost:7055/api/teachers`,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        data,
      });
    },
    GetTeachers({ rootState }) {
      return API({
        method: "get",
        url: `https://localhost:7055/api/teachers`,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
    },
    UpdateTeacher({ rootState }, { teacherId, data }) {
      console.log(teacherId);
      console.log(teacherId);
      return API({
        method: "put",
        url: `https://localhost:7055/api/teachers/${teacherId}`,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        data,
      });
    },
  },
};
