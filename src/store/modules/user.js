import axios from "axios";
import router from "../../router/index";
import app from "../../main";

export default {
  state: {},
  getters: {
    get_auth_token: (state) => {
      return localStorage.getItem("auth-token");
    },
  },
  mutations: {
    set_auth_token: (state, value) => {
      localStorage.setItem("auth-token", value);
    },
  },
  actions: {
    LOGOUT: async (state) => {
      localStorage.removeItem("auth-token");
      router.push("/login");
    },
    LOGIN: async ({ commit, dispatch }, payload) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .post("/login", payload)
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(true);
              commit("set_auth_token", data.token);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GET_ADMIN: async ({ commit }) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .get("/admin/getAdmin", {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GET_STATS: async ({ commit }) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .get("/admin/getStats", {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GET_USERS: async (state) => {
      return new Promise(async (resolve, reject, dispatch) => {
        await axios
          .get("/admin/getUsers", {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            console.log("sent");
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GET_USER: async ({ commit }, payload) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .post("/admin/getUser", payload, {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GET_VIRUS: async ({ commit }, payload) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .post("/admin/getVirus", payload, {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MODIFY_USER: async ({ commit }, payload) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .put("/admin/modifyUser", payload, {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MODIFY_VIRUS: async ({ commit }, payload) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .put("/admin/modifyVirus", payload, {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    MODIFY_ADMIN: async ({ commit }, payload) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .put("/admin/modifyAdmin", payload, {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    DELETE_USER: async ({ commit }, payload) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .post("/admin/deleteUser", payload, {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    SEARCH_USERS: async ({ commit }, payload) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .post("/admin/searchUsers", payload, {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    DELETE_VIRUS: async ({ commit }, payload) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .post("/admin/deleteVirus", payload, {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    ADD_VIRUS: async ({ commit }, payload) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .post("/admin/addVirus", payload, {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GET_VIRUSES: async (state) => {
      return new Promise(async (resolve, reject, dispatch) => {
        await axios
          .get("/admin/getViruses", {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            console.log("sent");
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    VIRUSES_DATA: async (state) => {
      return new Promise(async (resolve, reject, dispatch) => {
        await axios
          .get("/admin/virusesData", {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    REGISTER_DATA: async (state) => {
      return new Promise(async (resolve, reject, dispatch) => {
        await axios
          .get("/admin/registerData", {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GET_CONTAMINATIONS_LOCATIONS: async (state) => {
      return new Promise(async (resolve, reject, dispatch) => {
        await axios
          .get("/admin/getContaminationslocations",  {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            console.log("sent");
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    GET_CONTACTS_LOCATIONS: async (state) => {
      return new Promise(async (resolve, reject, dispatch) => {
        await axios
          .get("/admin/getContactsLocations",  {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            console.log("sent");
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    POST_CONTAMINATIONS_LOCATIONS: async ({ commit }, payload) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .post("/admin/postContaminationslocations", payload, {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    POST_CONTACTS_LOCATIONS: async ({ commit }, payload) => {
      return new Promise(async (resolve, reject) => {
        await axios
          .post("/admin/postContactsLocations", payload, {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          })
          .then(({ data, status }) => {
            if (status === 200) {
              resolve(data);
            } else {
              reject(data);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
