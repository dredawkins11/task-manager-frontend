<template>
  <div>
    <div id="blur-panel"></div>
    <transition name="alert">
      <Alert v-bind:title="alertTitle" v-bind:message="alertMessage" v-if="alertActive" />
    </transition>
    <Loader v-if="loading" />
    <RegisterBox v-if="appState.register" />
    <div id="main-login" v-if="!appState.register">
      <h1 id="login-title">Login Below</h1>
      <div id="login-username-label">Username:</div>
      <input type="text" name="username" id="username-text-login" class="entry" autocomplete="new-password" />
      <br />
      <div id="login-password-label">Password:</div>
      <input type="password" name="password" id="password-text-login" class="entry" autocomplete="new-password" />
      <div id="login-button" @click="loginReqE">Login</div>
      <div id="register-text" @click="toggleRegister()">No account? Register <span id="register-link">here.</span></div>
    </div>
  </div>
</template>

<script>
  import Loader from "../components/Loader"
  import RegisterBox from "../components/RegisterBox";
  import Alert from "../components/Alert"
  import alertMixin from "../mixins/alertMixin"
  import axios from "axios";
  import Joi from "joi";
  import { mapActions, mapGetters } from "vuex";

  export default {
    name: "LoginBox",
    components: {
      RegisterBox,
      Alert,
      Loader,
    },
    mixins: [alertMixin],
    computed: mapGetters(["appState"]),
    data() {
      return {
        loading: false,
      }
    },
    methods: {
      ...mapActions(["logIn", "triggerChange", "toggleRegister", "initialFetchTasks"]),
      async loginReqE() {
        const cred = {
          username: document.getElementById("username-text-login").value,
          password: document.getElementById("password-text-login").value,
        };

        const { error } = this.validateLogin(cred);
        if (error) {
          const message = error.details[0].message
          switch (message) {
              case `"username" is not allowed to be empty`:
                this.createAlert("Username Error", "Username is required.")
                break;
              case `"password" is not allowed to be empty`:
                this.createAlert("Password Error", "Password is required.");
                break;
          }
          return;
        } 

        document.getElementById("main-login").classList.add("blurred")
        this.loading = true;
        const loginResponse = await axios.post(`${this.$backendAddress}/api/login`, cred);
        if (loginResponse.data.failed) {
          this.loading = false;
          document.getElementById("main-login").classList.remove("blurred")
          return this.createAlert("Login Error", loginResponse.data.reason);
        }

        sessionStorage.setItem("accessToken", loginResponse.data.access);
        sessionStorage.setItem("refreshToken", loginResponse.data.refresh);
        this.logIn();
        this.triggerChange();
        this.initialFetchTasks();
        this.loading = false;
        document.getElementById("main-login").classList.remove("blurred")
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
  @import "../styles/_mixins.scss";
  @include alertTransition();

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
    border: 2px solid $tertiary;
    border-radius: 10px;
    box-shadow: -2px 2px 0px 2px rgba(0, 0, 0, 1);
    background: $tertiary;
    color: $lightText;
  }
  #login-title {
    margin-top: 20px;
    text-shadow: 1px 2px 0px #000000;
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
    height: 32px;
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid $primary ;
    border-radius: 5px;
    cursor: pointer;
    color: $lightText;
    background-color: $primary;
    transition: background .2s, border-color .2s, color .2s;

    &:hover {
      background: $lightText;
      border-color: $lightText;
      color: $darkText;
    }
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
    cursor: pointer;
    transition: color .2s;

    &:hover {
      color: $lightText
    }
  }
  .blurred {
    filter: blur(5px);
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
