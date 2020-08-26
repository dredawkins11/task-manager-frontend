import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.prototype.$backendAddress = process.env.NODE_ENV == "production" ? "https://task-manager-backend11.herokuapp.com" : "http://localhost:3000";
