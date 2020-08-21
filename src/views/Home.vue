<template>
  <div id="main">
    <SideBar v-bind:class="{ blur: !appState.log_state }" />
    <div id="task-page" v-bind:class="{ blur: !appState.log_state }">
      <TaskContainer v-bind:tasks="allTasks" />
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
    computed: mapGetters(["allTasks", "appState"]),
    methods: {
      ...mapActions(["fetchTasks", "fetchUser"]),
    },
    async created() {
      if (this.appState.log_state) {
        await this.fetchTasks();
      }
    },
    mounted() {
      this.$root.$on("refreshTasks", async () => await this.fetchTasks());
      console.log(process.env.NODE_ENV)
    },
  };
</script>

<style lang="scss">

html, body {
  position: relative;
  z-index: -3;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background: $backgroundLight;
}

.blur {
  animation: blur-in .75s;
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

