<template>
  <div id="search-container">
    <input id="search-input" type="text" placeholder="Search for task..." v-on:keyup.enter="searchE()" />
    <div id="clear-search" @click="clearSearchE()">X</div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: "SearchTaskComp",
    methods: {
      ...mapActions(["searchTasks"]),
      searchE() {
        const searchValue = document.getElementById("search-input").value;
        this.searchTasks(searchValue);
        this.$root.$emit("searching");
        if(searchValue == "") {
          this.clearSearchE()
        }
      },
      clearSearchE() {
        document.getElementById("search-input").value = "";
        this.$root.$emit("refreshTasks");
        this.$root.$emit("endSearch");
      },
    },
    mounted() {
      document.getElementById("search-container").addEventListener("keyup", () => {
        this.searchE()
      })
    }
  };
</script>

<style scoped lang="scss">
  #search-container {
    position: absolute;
    display: flex;
    align-items: center;
    left: 79px;
    width: 500px;
    height: 75px;
    border: 2px solid $tertiary;
    border-radius: 10px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    box-shadow: -2px 2px 0px 2px rgba(0, 0, 0, 1);
    background: $tertiary;
  }
  #search-input {
    display: inline-block;
    width: 95%;
    height: 30px;
    padding: 0.3rem;
    margin-left: 10px;
    border: 2px solid $darkText;
    font-size: 16px;
    font-weight: bold;
    color: $darkText;
    background-color: $backgroundDark;
  }
  #search-button {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    line-height: 28px;
    text-align: center;
    font-weight: bolder;
    font-size: 16px;
    border: 2px solid $darkText;
    border-left-style: none;
    color: $lightText;
    background-color: $primary;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: $accent;
    }
  }
  #clear-search {
    position: absolute;
    left: 90%;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 100;
    color: $darkText;
    cursor: pointer;
  }
  ::placeholder {
    font-size: 12px;
    color: $darkText;
    opacity: 1;
  }
  *:focus {
    outline: none;
  }
  @media screen and (max-width: 600px) {
    #search-container {
      width: 300px;
    }
    #clear-search {
      margin-left: -15px;
    }
  }
  @media screen and (max-width: 350px) {
    #search-container {
      width: 250px;
    }
    #clear-search {
      margin-left: -20px;
    }
  }
</style>
