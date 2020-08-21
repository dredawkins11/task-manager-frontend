<template>
  <div id="task-list">
    <div v-show="tasksEmpty" id="no-tasks-message-container">
      <div id="no-tasks-message">
        It seems you dont have any tasks. Use the "+" icon on the sidebar to create a task and get started.
      </div>
    </div>
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
    data() {
      return {
        tasksEmpty: true,
      };
    },
    watch: {
      tasks: function() {
        if (this.tasks.length == 0) this.tasksEmpty = true;
        if (this.tasks.length !== 0) this.tasksEmpty = false;
      },
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

    height: 95vh;
    width: 90vw;

    cursor: default;
  }
  #no-tasks-message-container {
    width: 95vw;
    height: 90vh;
    display: flex;
  }
  #no-tasks-message {
    margin: auto;
    width: 600px;
    text-align: center;
    font-size: 32px;
    font-weight: 400;
    font-style: italic;
    color: $secondary;
    opacity: 0.6;
    white-space: pre-wrap;
  }
  @media screen and (max-width: 600px) {
    #no-tasks-message {
      width: 200px;
      margin-left: 0;
      font-size: 20px;
    }
  }
</style>
