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
    GetFiles({ rootState }, { params }) {
      console.log(params);
      return API({
        method: "get",
        url: `https://localhost:7055/api/reports`,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        params,
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
    UpdateTeacher({ rootState }, { documentId, data }) {
      return API({
        method: "post",
        url: `https://localhost:7055/api/reports/${documentId}/add-teachers`,
        responseType: "blob",
        data,
      });
    },
    GetDocumentFile({ rootState }, documentId) {
      return API({
        method: "get",
        url: `https://localhost:7055/api/reports/${documentId}/download`,
        responseType: "blob",
      });
    },
    GetDocumentTable({ rootState }, documentId) {
      return API({
        method: "get",
        url: `https://localhost:7055/api/reports/${documentId}/subjects`,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
    },
    GetDocument({ rootState }, documentId) {
      return API({
        method: "get",
        url: `https://localhost:7055/api/reports/${documentId}`,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
    },
  },
};
