import axios from "axios"

export default {
  methods: {
    async refreshToken() {
      try {
        let res = await axios.post(`${this.$backendAddress}/api/login/refresh`, {
          token: sessionStorage.getItem("refreshToken"),
        });
        sessionStorage.setItem("accessToken", res.data.accessToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("accessToken")}`;
      } catch (err) {
        console.log(err);
      }
    },
    isTokenExpired() {
      const token = sessionStorage.getItem("accessToken")
      const expireTime = JSON.parse(atob(token.split('.')[1])).exp
      return expireTime <= (Date.now()/1000) 
    },
  }
};