<template>
  <div class="loader"></div>
</template>

<script>
  export default {};
</script>

<style lang="scss">
  .loader {
    position: fixed;
    top: 40%;
    left: 50%;
    margin-left: -40px;
    margin-top: -40px;
    z-index: 2;
    border: 10px solid $backgroundDark;
    border-top: 10px solid $primary;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    transform-origin: center;
    animation: spin 1s linear infinite;
    animation-fill-mode: forwards;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
