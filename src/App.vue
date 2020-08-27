<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  const log = sessionStorage.getItem("log");
  if (!log) sessionStorage.setItem("log", "false");

  export default {
    name: "App",
  };
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  html,
  body {
    position: relative;
    z-index: -5;
    margin: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: show;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    border: 1px solid $tertiary;
    border-radius: 10px;
    border-color: $tertiary;
    background: $tertiary;
    &:hover {
      cursor: default;
    }
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
</style>
