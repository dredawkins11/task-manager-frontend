<template>
  <div id="task-list">
    <div v-for="task in tasks" :key="tasks.indexOf(task)">
      <Task v-bind:task="task" />
    </div>
  </div>
</template>

<script>
  import Task from "@/components/Task";

  export default {
    name: "TaskContainer",
    props: ["tasks"],
    components: {
      Task,
    },
  };
</script>

<style lang="scss">

  #task-list {
    display: flex;
    position: relative;
    z-index: -1;
    margin: auto;

    flex-flow: row wrap;
    align-content: flex-start;
    justify-content: left;
    text-align: left;
    overflow: scroll;

    height: 100%;
    width: 100%;

    cursor: default;
  }
</style>
