<template>
  <div id="about-body">
    <div id="about-text">A simple task manager project created for learning purposes, by Dre Dawkins.</div>
    <br />
    <a id="repo1" href="https://github.com/dredawkins11/task-manager-project-frontend" target="_blank">Frontend repository</a>
    <a id="repo2" href="https://github.com/dredawkins11/task-manager-project-backend" target="_blank">Backend repository</a>
    <router-link id="back-link" to="/">Back to Task Manager</router-link>
  </div>
</template>

<script>
  export default {
    Name: "About",
  };
</script>

<style lang="scss">
  #about-body {
    position: fixed;
    display: grid;
    grid-template:
      "top-text top-text top-text top-text" 20px
      "repo1 repo1 repo2 repo2" 15px
      "back back back back" 15px;
    gap: 20px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 750px;
    height: 100px;
    border: 3px solid $backgroundDark;
    border-radius: 15px;
    background: $backgroundDark;
  }
  #about-text {
    grid-area: top-text;
    font-size: 18px;
    font-weight: bold;
  }
  #repo1 {
    grid-area: repo1;
    font-weight: bold;
    color: $primary;
    transition: color 0.2s, text-shadow 0.2s;

    &:hover {
      color: $accent;
      text-shadow: 1px 1px $lightText;
    }
  }
  #repo2 {
    grid-area: repo2;
    font-weight: bold;
    color: $primary;
    transition: color 0.2s, text-shadow 0.2s;

    &:hover {
      color: $accent;
      text-shadow: 1px 2px $lightText;
    }
  }
  #back-link {
    grid-area: back;
    color: $primary;
    transition: color 0.2s;

    &:hover {
      color: $accent;
    }
  }
</style>
