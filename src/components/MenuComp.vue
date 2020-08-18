<template>
  <div id="menu-body">
    <div id="username-label">Logged in as: </div>
    <div id="username-text">{{username}}</div>
    <img src="@/assets/prof-icon.svg" id="prof-icon">
    <router-link id="about-link" to="/about">To about page</router-link>
    <LogOutButton />
  </div>
</template>

<script>
import LogOutButton from "@/components/LogOutButton";

export default {
  name: "MenuComp",
  components: {
    LogOutButton,
  },
  data() {
    return {
      username: JSON.parse(atob(sessionStorage.getItem("accessToken").split('.')[1])).username
    }
  },
  methods: {
    getFontSize(textLength) {
      const MAX_DEFAULT_LENGTH = 9
      const MAX_FONT_SIZE = 30;
      let fontSize = 30;
      if (textLength > 17)
      if (textLength > MAX_DEFAULT_LENGTH) {
        fontSize = MAX_FONT_SIZE - ((textLength - MAX_DEFAULT_LENGTH)*3)
        return `${fontSize}px`
      }
      else return `${fontSize}px`
    }
  },
  mounted() {
    const usernameText = document.getElementById('username-text')   
    usernameText.style.fontSize = this.getFontSize(usernameText.textContent.length)
    if (usernameText.textContent.length > 17) usernameText.style.textOverflow = "ellipsis"
  },
}
</script>

<style scoped lang="scss">
  #menu-body {
    position: absolute;
    left: 75px;
    width: 300px;
    height: 120px;
    border: 2px solid;
    border-top-color: $secondary;
    border-right-color: $secondary;
    border-left-color: $darkText;
    border-bottom-color: $darkText;
    background: $tertiary;
  }
  #prof-icon {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 100px;
    height: 100px;
  }
  #username-text {
    position: absolute;
    left: 120px;
    top: 45px;
    width: 170px;
    text-align: center;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    color: $lightText;
  }
  #username-label {
    position: absolute;
    left: 120px;
    top: 25px;
    width: 170px;
    text-align: center;
    color: $lightText;
  }
  #about-link {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 100px;
    font-size: 14px;
    color: $lightText;
    cursor: pointer;
    transition: color .2s;

    &:hover {
      color: $accent;
    }
  }
</style>