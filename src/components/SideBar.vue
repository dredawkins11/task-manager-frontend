<template>
  <div>
    <div id="side-bar-body">
      <div id="button-container" class="button-container">
        <div class="side-bar-button" id="menu">
          <img class="img-icon" src="@/assets/menu-icon.svg" />
        </div>
        <transition name="menu">
          <MenuComp v-if="menuActive" />
        </transition>
      </div>
      <div class="button-container">
        <div class="side-bar-button" id="add">
          <img class="img-icon" src="@/assets/plus-icon.svg" />
        </div>
        <transition name="menu">
          <AddTaskComp v-if="addActive" />
        </transition>
      </div>
      <div class="button-container">
        <div class="side-bar-button" id="sort">
          <img class="img-icon" src="@/assets/sort-icon.svg" />
        </div>
        <transition name="menu">
          <SortTaskComp v-if="sortActive" />
        </transition>
      </div>
      <div class="button-container">
        <div class="side-bar-button" id="search">
          <img class="img-icon" src="@/assets/search-icon.svg" />
        </div>
        <transition name="menu">
          <SearchTaskComp v-if="searchActive" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchTaskComp from "@/components/SearchTaskComp";
  import SortTaskComp from "@/components/SortTaskComp";
  import AddTaskComp from "@/components/AddTaskComp";
  import MenuComp from "@/components/MenuComp";

  export default {
    name: "SideBar",
    components: {
      SearchTaskComp,
      SortTaskComp,
      AddTaskComp,
      MenuComp,
    },
    data() {
      return {
        menuActive: false,
        addActive: false,
        sortActive: false,
        searchActive: false,
      };
    },
    methods: {
      closeAllActive() {
        this.menuActive = false;
        this.addActive = false;
        this.sortActive = false;
        this.searchActive = false;
      },
    },
    mounted() {
      const menu = document.getElementById("menu");
      menu.addEventListener("click", () => {
        if (this.menuActive) return (this.menuActive = false);
        this.closeAllActive();
        this.menuActive = true;
      });
      const add = document.getElementById("add");
      add.addEventListener("click", () => {
        if (this.addActive) return (this.addActive = false);
        this.closeAllActive();
        this.addActive = true;
      });
      const sort = document.getElementById("sort");
      sort.addEventListener("click", () => {
        if (this.sortActive) return (this.sortActive = false);
        this.closeAllActive();
        this.sortActive = true;
      });
      const search = document.getElementById("search");
      search.addEventListener("click", () => {
        if (this.searchActive) return (this.searchActive = false);
        this.closeAllActive();
        this.searchActive = true;
      });
      this.$root.$on("logging-out", () => {
        this.menuActive = false;
        this.addActive = false;
        this.sortActive = false;
        this.searchActive = false;
      })
    },
  };
</script>

<style scoped lang="scss">
  #side-bar-body {
    position: fixed;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    left: 0;
    z-index: 3;
    width: 75px;
    height: 100vh;
    background-color: $tertiary;
  }
  .button-container {
    position: relative;
    display: flex;
    margin-bottom: 50px;
    align-items: top;
  }
  .side-bar-button {
    margin: auto;
    width: 75px;
    height: 75px;
    text-align: left;
    line-height: 75px;
    box-shadow: 0px 3px 1px 0px rgba(0, 0, 0, 0.5);
    color: #fff;
    background-color: $primary;
    user-select: none;
    transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
    cursor: pointer;

    &:hover {
      background: $accent;
    }

    &:active {
      transform: translateY(4px);
      box-shadow: none;
    }
  }
  .img-icon {
    max-width: 100%;
    max-height: 100%;
    padding: 10px;
    margin: auto 0 auto;
    pointer-events: none;
  }

  .menu-enter-active,
  .menu-leave-active {
    transition: 0.2s;
  }
  .menu-enter,
  .menu-leave-to {
    opacity: 0;
  }
</style>
