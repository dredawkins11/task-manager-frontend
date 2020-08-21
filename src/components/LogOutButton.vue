<template>
  <div id="logout-button" @click="logOutUserE">
    Logout
  </div>
</template>

<script>
  import { mapActions } from "vuex";
  import axios from "axios"
  
  export default {
    name: "LogOutButton",
    methods: {
      ...mapActions(["logOut", "triggerChange", "clearTasks"]),
      async logOutUserE() {
        this.logOut();
        await axios.delete(`${this.$backendAddress}/api/login`, {
          data: { token: sessionStorage.getItem("refreshToken") },
        });
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        this.triggerChange();
      },
    },
  };
</script>

<style scoped lang="scss">
  #logout-button {
    position: absolute;
    bottom: 10px;
    left: 118px;
    width: 60px;
    height: 20px;
    margin: auto;
    cursor: pointer;

    font-size: 14px;
    font-weight: bold;
    line-height: 1.3rem;
    color: $lightText;
    background-color: $primary;
    transition: background .2s;

    &:hover {
      background: $accent;
    }
  }
  @media screen and (max-width: 350px) {
    #logout-button {
      left: 10px;
    }
  }
</style>
