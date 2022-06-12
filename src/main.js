import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuex from "./store/index";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@/assets/FA5PRO-master/css/all.css";
import "@/assets/styles/index.css";

axios.defaults.baseURL = "https://api-virus-tracker.herokuapp.com/api/";

const options = {
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor: "#5a58c3"
};

const app = createApp(App);
app.use(vuex);
app.use(router);
app.use(VueLoading);
app.use(VueSweetalert2, options);
app.mount("#app");

export default app;