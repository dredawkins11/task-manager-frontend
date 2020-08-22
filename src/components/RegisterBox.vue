<template>
  <div id="main-register">
    <h1>Register Below</h1>
    <div id="register-username-label">Username:</div>
    <form autocomplete="new-password">
      <input type="text" name="username" id="username-text-register" class="entry" autocomplete="new-password" />
      <br />
      <div id="register-password-label">Password:</div>
      <input type="password" name="password" id="password-text-register" class="entry" autocomplete="new-password" />
      <br />
      <div id="register-password-label2">Repeat Password:</div>
      <input type="password" name="2nd-password" id="password-text-register2" class="entry" autocomplete="new-password" />
      <div id="register-button" @click="registerReqE">Register</div>
      <div id="login-text" @click="toggleRegister()">Already have an account? Log in <span id="login-link">here.</span></div>
    </form>
  </div>
</template>

<script>
  import Joi from "joi";
  import axios from "axios";
  import { mapActions } from "vuex";

  export default {
    name: "RegisterBox",
    methods: {
      ...mapActions(["toggleRegister", "logIn", "triggerChange"]),
      async registerReqE() {
        try {
          const cred = {
            username: document.getElementById("username-text-register").value.trim(),
            password: document.getElementById("password-text-register").value.trim(),
          };
          const password2 = document.getElementById("password-text-register2").value;

          if (cred.password != password2) return alert("Passwords do not match.");

          const { error } = this.validateRegister(cred);
          if (error) {
            const message = error.details[0].message;
            switch (message) {
              case `"username" is not allowed to be empty`:
                alert("Username is required.")
                break;
              case `"username" length must be at least 3 characters long`:
                alert("Your username must be at least 3 characters long.")
                break;
              case `"username" length must be less than or equal to 32 characters long`:
                alert("Your username must be at shorter than 32 characters.")
                break;
              case `"password" is not allowed to be empty`:
                alert("Password is required.");
                break;
              case `"password" length must be at least 3 characters long`:
                alert("Your password must be at least 3 charactoers long.")
                break;
              case `"password" length must be less than or equal to 32 characters long`:
                alert("Your password must be shorter than 32 characters.")
                break;
            }
            if (message.includes("number pattern")) alert("Password must contain at least one number.")
            if (message.includes("uppercase letter pattern")) alert("Password must contain at least one uppercase letter.")
            if (message.includes("lowercase letter pattern")) alert("Password must contain at least one lowercase letter.")
            if (message.includes("alphanumeric pattern")) alert("Username must begin with a letter or number.")
            return;
          }

          const user = await axios.post(`${this.$backendAddress}/api/users`, cred);
          if (!user.data) return alert("A user with that username already exists.");

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
  #main-register {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 250px;
    border: 2px solid;
    border-top-color: $secondary;
    border-right-color: $secondary;
    border-left-color: $darkText;
    border-bottom-color: $darkText;
    background: $tertiary;
    color: $lightText;
    background-color: $tertiary;
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
    left: 110px;
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
    left: 50px;
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
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: $lightText;
    background-color: $primary;
  }
  #register-button:hover {
    cursor: pointer;
    transform: scale(1.05);
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
  }
  #login-link:hover {
    color: $lightText;
    cursor: pointer;
  }
</style>
