<template>
  <div>
    <div id="blur-panel"></div>
      <RegisterBox v-if="appState.register" />
    <div id="main-login" v-if="!appState.register">
      <h1 style="margin-top:20px;">Login Below</h1>
      <div id="login-username-label">Username: </div>
      <input type="text" name="username" id="username-text-login" class="entry" autocomplete="new-password"/>
      <br />
      <div id="login-password-label">Password: </div>
      <input type="password" name="password" id="password-text-login" class="entry" autocomplete="new-password"/>
      <div id="login-button" @click="loginReqE">Login</div>
      <div id="register-text" @click="toggleRegister()">No account? Register <span id="register-link">here.</span></div>
    </div>
  </div>
</template>

<script>
  import RegisterBox from "../components/RegisterBox";
  import axios from "axios";
  import Joi from "joi";
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "LoginBox",
    components: {
      RegisterBox,
    },
    computed: mapGetters(["appState"]),
    methods: {
      ...mapActions(["logIn", "triggerChange", "toggleRegister", "initialFetchTasks"]),
      async loginReqE() {
        const cred = {
          username: document.getElementById("username-text-login").value,
          password: document.getElementById("password-text-login").value,
        };

        const { error } = this.validateLogin(cred);
        if (error) return alert(error.details[0].message);

        const loginResponse = await axios.post(`${this.$backendAddress}/api/login`, cred);
        if (loginResponse.data.failed) return alert(loginResponse.data.reason);

        sessionStorage.setItem("accessToken", loginResponse.data.access);
        sessionStorage.setItem("refreshToken", loginResponse.data.refresh);
        this.logIn();
        this.triggerChange();
        this.initialFetchTasks();
      },
      validateLogin(cred) {
        const schema = Joi.object({
          username: Joi.string()
            .max(32)
            .required(),
          password: Joi.string()
            .max(32)
            .required(),
        });
        return Joi.validate(cred, schema);
      },
    },
  };
</script>

<style scoped lang="scss">
  #blur-panel {
    width: 100vh;
    height: 100vh;
    filter: blur(10px);
  }
  #main-login {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 220px;
    border: 2px solid;
    border-top-color: $secondary;
    border-right-color: $secondary;
    border-left-color: $darkText;
    border-bottom-color: $darkText;
    background: $tertiary;
    color: $lightText;
    background-color: $tertiary;
  }
  #username-text-login {
    position: absolute;
    width: 200px;
    height: 20px;
    top: 70px;
    left: 195px;
  }
  #login-username-label {
    position: absolute;
    left: 110px;
    top: 70px;
    width: 80px;
    height: 20px;
    line-height: 20px;
    font-weight: bold;
  }
  #password-text-login {
    position: absolute;
    width: 200px;
    height: 20px;
    top: 100px;
    left: 195px;
  }
  #login-password-label {
    position: absolute;
    left: 110px;
    top: 100px;
    width: 80px;
    height: 20px;
    line-height: 20px;
    font-weight: bold;
  }
  #login-button {
    position: absolute;
    left: 220px;
    top: 140px;
    width: 60px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: $lightText;
    background-color: $primary;
  }
  #login-button:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  #register-text {
    position: absolute;
    top: 180px;
    left: 125px;
    width: 250px;
    height: 20px;
    font-weight: bold;
  }
  #register-link {
    color: $primary;
    text-decoration-line: underline;
  }
  #register-link:hover {
    color: $lightText;
    cursor: pointer;
  }
  .login-enter-active,
  .login-leave-active {
    transition: 0.2s;
  }
  .login-enter,
  .login-leave-to {
    opacity: 0;
  }
</style>
