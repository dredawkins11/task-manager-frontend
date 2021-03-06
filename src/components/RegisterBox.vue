<template>
  <div>  
    <transition name="alert">
      <Alert v-bind:title="alertTitle" v-bind:message="alertMessage" v-if="alertActive" />
    </transition>
    <div id="main-register">
      <h1 id="register-title">Register Below</h1>
      <div id="register-username-label">Username:</div>
      <form autocomplete="new-password">
        <input type="text" name="username" id="username-text-register" class="entry" autocomplete="new-password" />
        <br />
        <div id="register-password-label">Password:</div>
        <input type="password" name="password" id="password-text-register" class="entry" autocomplete="new-password" />
        <br />
        <div id="register-password-label2">Repeat Password: </div>
        <input type="password" name="2nd-password" id="password-text-register2" class="entry" autocomplete="new-password" />
        <div id="register-button" @click="registerReqE">Register</div>
        <div id="login-text" @click="toggleRegister()">Already have an account? Log in <span id="login-link">here.</span></div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import Alert from "../components/Alert"
  import alertMixin from "../mixins/alertMixin"
  import Joi from "joi";
  import axios from "axios";

  export default {
    name: "RegisterBox",
    components: {
      Alert,
    },
    mixins: [alertMixin],
    methods: {
      ...mapActions(["toggleRegister", "logIn", "triggerChange"]),
      async registerReqE() {
        try {
          const cred = {
            username: document.getElementById("username-text-register").value.trim(),
            password: document.getElementById("password-text-register").value.trim(),
          };
          const password2 = document.getElementById("password-text-register2").value;

          const { error } = this.validateRegister(cred);
          if (error) {
            const message = error.details[0].message;
            switch (message) {
              case `"username" is not allowed to be empty`:
                this.createAlert("Username Error", "Username is required.")
                break;
              case `"username" length must be at least 3 characters long`:
                this.createAlert("Username Error", "Your username must be at least 3 characters long.")
                break;
              case `"username" length must be less than or equal to 32 characters long`:
                this.createAlert("Username Error", "Your username must be at shorter than 32 characters.")
                break;
              case `"password" is not allowed to be empty`:
                this.createAlert("Password Error", "Password is required.");
                break;
              case `"password" length must be at least 3 characters long`:
                this.createAlert("Password Error", "Your password must be at least 3 charactoers long.")
                break;
              case `"password" length must be less than or equal to 32 characters long`:
                this.createAlert("Password Error", "Your password must be shorter than 32 characters.")
                break;
            }
            if (message.includes("number pattern")) this.createAlert("Password Error", "Password must contain at least one number.")
            if (message.includes("uppercase letter pattern")) this.createAlert("Password Error", "Password must contain at least one uppercase letter.")
            if (message.includes("lowercase letter pattern")) this.createAlert("Password Error", "Password must contain at least one lowercase letter.")
            if (message.includes("alphanumeric pattern")) this.createAlert("Username Error", "Username must begin with a letter or number.")
            return;
          }

          if (cred.password != password2) return this.createAlert("Password Error", "Passwords do not match.");

          const user = await axios.post(`${this.$backendAddress}/api/users`, cred);
          if (!user.data) return this.createAlert("Username Error", "A user with that username already exists.");

          let res = await axios.post(`${this.$backendAddress}/api/login`, cred);
          sessionStorage.setItem("accessToken", res.data.access);
          sessionStorage.setItem("refreshToken", res.data.refresh);
          this.logIn();
          this.triggerChange();
        } catch (err) {
          console.log(err);
        }
      },
      validateRegister(cred) {
        const schema = Joi.object({
          username: Joi.string()
            .min(3)
            .max(32)
            .regex(/^[a-zA-Z0-9]/, { name: "must start with alphanumeric" })
            .required(),
          password: Joi.string()
            .min(3)
            .max(32)
            .regex(/\d/, { name: "number" })
            .regex(/[A-Z]/, { name: "uppercase letter" })
            .regex(/[a-z]/, { name: "lowercase letter" })
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

  #main-register {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 250px;
    border: 2px solid $tertiary;
    border-radius: 10px;
    box-shadow: -2px 2px 0px 2px rgba(0, 0, 0, 1);
    background: $tertiary;
    color: $lightText;
  }
  #register-title {
    text-shadow: 1px 2px 0px #000000;
  }
  #username-text-register {
    position: absolute;
    width: 200px;
    height: 20px;
    top: 70px;
    left: 195px;
  }
  #register-username-label {
    position: absolute;
    left: 109px;
    top: 70px;
    width: 80px;
    height: 20px;
    line-height: 20px;
    font-weight: bold;
  }
  #password-text-register {
    position: absolute;
    width: 200px;
    height: 20px;
    top: 100px;
    left: 195px;
  }
  #register-password-label {
    position: absolute;
    left: 110px;
    top: 100px;
    width: 80px;
    height: 20px;
    line-height: 20px;
    font-weight: bold;
  }
  #password-text-register2 {
    position: absolute;
    width: 200px;
    height: 20px;
    top: 130px;
    left: 195px;
  }
  #register-password-label2 {
    position: absolute;
    left: 45px;
    top: 130px;
    width: 150px;
    height: 20px;
    line-height: 20px;
    font-weight: bold;
  }
  #register-button {
    position: absolute;
    left: 205px;
    top: 170px;
    width: 90px;
    height: 30px;
    line-height: 32px;
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
  #login-text {
    position: absolute;
    top: 210px;
    left: 100px;
    width: 300px;
    height: 20px;
    font-weight: bold;
  }
  #login-link {
    color: $primary;
    text-decoration-line: underline;
    cursor: pointer;
    transition: color .2s;

    &:hover {
      color: $lightText
    }
  }
</style>
