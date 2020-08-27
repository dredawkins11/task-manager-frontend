<template>
    <div id="alert-body">
      <div id="alert-title">
        {{ title }}
      </div>
      <div id="alert-message">
        {{ message }}
      </div>
      <div id="close-button">
        Close
      </div>
    </div>
</template>

<script>
  export default {
    name: "Alert",
    props: {
      title: String,
      message: String,
    },
    mounted() {
      document.getElementById("close-button").addEventListener("click", () => this.$parent.$emit("close-alert"));
    },
  };
</script>

<style lang="scss">
  #alert-body {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
    width: 300px;
    height: 100px;
    text-align: center;
    white-space: pre-wrap;
    user-select: auto;
    cursor: auto;
    border: 2px solid $tertiary;
    border-radius: 10px;
    box-shadow: -2px 2px 0px 2px rgba(0, 0, 0, 1);
    background: $tertiary;
    color: $lightText;
    background-color: $tertiary;
  }
  #alert-title {
    position: absolute;
    top: 3px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    font-size: 16px;
    font-weight: bold;
  }
  #alert-message {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    width: 90%;
    height: 40px;
    text-align: center;
    line-height: 20px;
    font-size: 14px;
  }
  #close-button {
    position: absolute;
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 25px;
    line-height: 19px;
    font-weight: bold;
    border: 3px solid $primary;
    border-radius: 5px;
    background: $primary;
    transition: background 0.1s, color 0.1s, border-color 0.1s;

    &:hover {
      background: $lightText;
      border-color: $lightText;
      color: $darkText;
      cursor: pointer;
    }
  }
</style>
