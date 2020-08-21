<template>
  <div id="add-task-container">
      <input
        type="text"
        id="add-task-title"
        placeholder="Task title..."
        v-on:keyup.enter="focusOnDesc()"
      />
      <textarea
        type="text"
        id="add-task-desc"
        placeholder="Task Description..."
        v-on:keyup.enter="addTaskE()"
      />
      <div id="add-button" @click="addTaskE()">+</div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: "AddTaskComp",
    data() {
      return {
        user: this.$store.getters.getUser,
      };
    },
    methods: {
      ...mapActions(["addTask"]),
      addTaskE() {
        const userId = JSON.parse(
          atob(sessionStorage.getItem("accessToken").split(".")[1])
        ).id;

        const title = document.getElementById("add-task-title").value;
        let description = document.getElementById("add-task-desc").value;

        if (title.length < 3) return alert("Task title must be at least 3 characters long.")
        if (!description) description = " ";

        this.addTask({ title, description, userId, createdAt: new Date().toString() });

        document.getElementById("add-task-title").value = "";
        document.getElementById("add-task-desc").value = "";
      },
      focusOnDesc() {
        document.getElementById('add-task-desc').focus()
      }
    },
  };
</script>

<style scoped lang="scss">

  #add-task-container {
    position: absolute;
    left: 75px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: space-between;
    width: 500px;
    height: 300px;
    padding: 10px;
    border: 2px solid $darkText;
    border-top-color: $secondary;
    border-right-color: $secondary;
    background-color: $tertiary;
  }
  #add-task-box {
    position: relative;
    top: 5%;
    width: 90%;
    height: 90%;
  }
  #add-task-title {
    height: 15%;
    width: 90%;
    padding: 0.3rem;
    border: 2px solid $darkText;
    font-size: 1rem;
    font-weight: bold;
    color: $darkText;
    background-color: $backgroundLight;
  }
  #add-task-desc {
    height: 65%;
    width: 90%;
    padding: 0.3rem;
    border: 2px solid $darkText;
    font-size: 1rem;
    font-weight: bold;
    color: $darkText;
    background-color: $backgroundLight;
  }
  #add-button {
    width: 90%;
    height: 30px;
    line-height: 28px;
    font-weight: bolder;
    font-size: 40px;
    border: 2px solid $darkText; 
    color: $lightText;
    background-color: $primary;
    transition: background .2s;

    &:hover {
      background: $accent
    }
  }
  #add-button:hover {
    background-color: $accent;
    border-color: $darkText;
    color: $lightText;
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
    #add-task-container {
      width: 300px;
    }
  }
  @media screen and (max-width: 350px) {
    #add-task-container {
      width: 200px;
    }
  }
</style>
