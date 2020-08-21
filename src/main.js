import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

const globalMixin = {
  methods: {
    isTokenExpired() {
      const token = sessionStorage.getItem("accessToken");
      const expireTime = JSON.parse(atob(token.split(".")[1])).exp;
      return expireTime <= Date.now() / 1000;
    },
  },
};

new Vue({
  router,
  store,
  render: (h) => h(App),
  mixins: [globalMixin],
}).$mount("#app");

Vue.prototype.$backendAddress = process.env.NODE_ENV == "production" ? "https://task-manager-backend11.herokuapp.com" : "http://localhost:3000";
