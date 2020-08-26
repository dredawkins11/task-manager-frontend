<template>
  <div id="main">
    <SideBar v-bind:class="{ blur: !appState.log_state }" />
    <div id="clear-search-text" @click="endSearch()" v-if="searching">
        Clear Search
      </div>
    <div id="task-page" v-bind:class="{ blur: !appState.log_state }">
      <TaskContainer v-bind:searching="searching" v-bind:tasks="allTasks" v-if="!searching" />
      <TaskContainer v-bind:tasks="displayTasks" v-if="searching" />
    </div>
    <div id="login-page">
      <LoginBox v-if="!appState.log_state" />
    </div>
  </div>
</template>

<script>
  import SideBar from "@/components/SideBar";
  import TaskContainer from "@/components/TaskContainer";
  import LoginBox from "@/components/LoginBox";
  import { mapGetters, mapActions } from "vuex";

  export default {
    name: "Home",
    components: {
      SideBar,
      TaskContainer,
      LoginBox,
    },
    data() {
      return {
        searching: false,
      }
    },
    computed: mapGetters(["allTasks", "displayTasks", "appState"]),
    methods: {
      ...mapActions(["fetchTasks", "fetchUser"]),
      endSearch() {
        this.searching = false;
      }
    },
    async created() {
      if (this.appState.log_state) {
        await this.fetchTasks();
      }
    },
    mounted() {
      this.$root.$on("refreshTasks", async () => await this.fetchTasks());
      this.$root.$on("searching", () => this.searching = true);
      this.$root.$on("endSearch", () => this.searching = false);
      console.log(process.env.NODE_ENV);
    },
  };
</script>

<style lang="scss">
  html,
  body {
    position: relative;
    z-index: -3;
    margin: 0;
    width: 100vw;
    height: 100vh;
    background: $backgroundLight;
  }

  .blur {
    animation: blur-in 0.75s;
    animation-fill-mode: forwards;
  }
  #main {
    position: relative;
  }
  #task-page {
    position: absolute;
    top: 25px;
    left: 100px;
    right: 25px;
    z-index: -2;
    height: calc(100vh - 25px);
    white-space: nowrap;
  }
  #clear-search-text {
    position: absolute;
    top: 6px;
    left: 110px;
    z-index: 50;
    padding: 2px;
    border: 1px solid $accent;
    border-radius: 5px;
    font-size: 14px;
    font-weight: lighter;
    font-style: italic;
    cursor: pointer;
    color: $lightText;
    background: $accent;
  }
  #log-out-comp {
    display: inline-block;
  }
  #add-task-comp {
    display: inline-block;
    width: 1200px;
  }
  #sort-button-comp {
    display: inline-block;
  }
  @keyframes blur-in {
    from {
      filter: blur(0px);
    }

    to {
      filter: blur(5px);
    }
  }
</style>
