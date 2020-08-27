<template>
  <div>
    <transition name="alert">
      <Alert v-bind:title="alertTitle" v-bind:message="alertMessage" v-if="alertActive" />
    </transition>
    <div class="task-box" v-bind:class="{ 'task-box-done': task.completed }" :ref="task.title">
      <img src="@/assets/check-mark-empty.svg" class="check" @click="markComplete(task)" v-show="!task.completed" />
      <img src="@/assets/check-mark-filled.svg" class="check" @click="markComplete(task)" v-show="task.completed" />
      <div class="title" v-show="!editMode">{{ task.title }}</div>
      <div class="desc" v-show="!editMode">{{ task.description }}</div>
      <div class="date">{{ getDate(task) }}</div>
      <img src="@/assets/edit-icon-empty.svg" alt="edit" class="edit-button" v-show="!editMode" @click="startEdit()" />

      <input type="text" class="title-edit" v-show="editMode" />
      <textarea class="desc-edit" v-show="editMode" />
      <img src="@/assets/edit-icon-filled.svg" class="cancel-button" v-show="editMode" @click="cancelEdit()" />
      <img src="@/assets/check-mark.svg" alt="save" class="save-button" v-if="editMode" @click="completeEdit(task)" />
      <svg class="delete-button" @click="deleteTask(task._id)" viewBox="71.365 171.684 257.033 256.442" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(1, 0, 0, 1, -303.109013, 10.459992)">
          <line
            style="stroke-linecap: round; stroke-miterlimit: 3; stroke-linejoin: round; stroke-width: 54px; stroke: rgb(0, 0, 0);"
            x1="403.109"
            y1="389.54"
            x2="603.109"
            y2="189.54"
          />
          <line
            style="stroke-linecap: round; stroke-miterlimit: 3; stroke-linejoin: round; stroke-width: 54px; stroke: rgb(0, 0, 0);"
            x1="403.109"
            y1="189.54"
            x2="603.109"
            y2="389.54"
          />
        </g>
        <g>
          <line style="stroke-linecap: round; stroke-miterlimit: 3; stroke-linejoin: round; stroke-width: 43px;" x1="100" y1="400" x2="300" y2="200" />
          <line style="stroke-linecap: round; stroke-miterlimit: 3; stroke-linejoin: round; stroke-width: 43px;" x1="100" y1="200" x2="300" y2="400" />
        </g>
        <rect x="71.365" y="171.684" width="257.033" height="256.442" rx="5" ry="5" style="fill: none;" />
      </svg>
    </div>
  </div>
</template>

<script>
  import Alert from "../components/Alert"
  import alertMixin from "../mixins/alertMixin"
  import tokenMixin from "../mixins/tokenMixin"
  import { mapActions } from "vuex";
  import axios from "axios";

  export default {
    name: "Task",
    props: ["task"],
    components: {
      Alert,
    },
    mixins: [tokenMixin, alertMixin],
    data() {
      return {
        editMode: false,
      };
    },
    methods: {
      ...mapActions(["deleteTask"]),
      async markComplete(task) {
        try {
          if (this.isTokenExpired()) await this.refreshToken();
          await axios.put(`${this.$backendAddress}/api/tasks/${task._id}`, {
            completed: !task.completed,
            title: task.title,
            description: task.description,
          });
          task.completed = !task.completed;
        } catch (err) {
          console.log(err);
        }
      },
      async completeEdit(task) {
        const titleEdit = this.$el.children[0].children[6];
        const descriptionEdit = this.$el.children[0].children[7];

        if (titleEdit.value.length < 3) return this.createAlert("Invalid Title", "Task title must be 3 or more characters long.");

        task.title = titleEdit.value;
        task.description = descriptionEdit.value ? descriptionEdit.value : " ";

        try {
          if (this.isTokenExpired()) await this.refreshToken();
          await axios.put(`${this.$backendAddress}/api/tasks/${task._id}`, {
            completed: task.completed,
            title: task.title,
            description: task.description,
          });
        } catch (err) {
          console.log(err);
        }

        this.editMode = false;
      },
      getDate(task) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const rawDate = new Date(task.createdAt);
        let hour = rawDate.getHours() > 12 ? rawDate.getHours() - 12 : rawDate.getHours();
        hour = hour === 0 ? 12 : hour;
        const minutes = rawDate.getMinutes() < 10 ? `0${rawDate.getMinutes()}` : rawDate.getMinutes();
        const AmPm = rawDate.getHours() >= 12 ? "PM" : "AM";
        const date = `${hour}:${minutes}${AmPm} ${months[rawDate.getMonth()]} ${rawDate.getDate()}, ${rawDate.getFullYear()}`;
        return date;
      },
      startEdit() {
        this.editMode = true;

        const titleText = this.$el.children[0].children[2].innerText;
        const descriptionText = this.$el.children[0].children[3].innerText;
        const titleEdit = this.$el.children[0].children[6];
        const descriptionEdit = this.$el.children[0].children[7];
        titleEdit.value = titleText;
        descriptionEdit.value = descriptionText;
      },
      cancelEdit() {
        this.editMode = false;
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "../styles/_mixins.scss";
  @include alertTransition();

  .task-box {
    @include fontSettings();
    position: relative;
    height: 300px;
    width: 325px;
    margin: 10px;
    font-size: 30px;
    font-weight: bold;
    border: 1px solid $backgroundDark;
    border-radius: 10px;
    color: $darkText;
    background-color: $backgroundDark;
    transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;

    &:hover {
      background: $accent;
      border-color: $accent;
      box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.7);
    }
    .title {
      position: absolute;
      top: 31px;
      left: 10px;
      width: 92%;
      line-height: 25px;
      font-size: 20px;
      font-weight: bold;
    }
    .desc {
      position: absolute;
      top: 63px;
      left: 10px;
      width: 90%;
      height: 68%;
      font-size: 16px;
      font-weight: normal;
      word-wrap: normal;
      word-break: break-word;
      white-space: pre-line;
      overflow-y: scroll;
    }
    .title-edit {
      position: absolute;
      top: 31px;
      left: 7px;
      width: 90%;
      height: 25px;
      line-height: 25px;
      font-size: 20px;
      font-weight: bold;
      border: 1px solid $darkText;
      border-radius: 5px;
      background-color: $backgroundDark;

      &::placeholder {
        font-size: 20px;
        color: $darkText;
        opacity: 1;
      }
    }
    .desc-edit {
      @include fontSettings();
      position: absolute;
      top: 60px;
      left: 7px;
      width: 90%;
      height: 70%;
      resize: none;
      word-wrap: normal;
      white-space: pre-wrap;
      font-size: 16px;
      font-weight: normal;
      border: 1px solid $darkText;
      border-radius: 5px;
      background-color: $backgroundDark;

      &::placeholder {
        font-size: 12px;
        color: $darkText;
        opacity: 1;
      }
    }
    .date {
      position: absolute;
      bottom: 5px;
      right: 5px;
      font-size: 10px;
      font-weight: lighter;
      color: $tertiary;
    }
    .check {
      box-sizing: border-box;
      display: inline-block;
      position: absolute;
      top: 5px;
      left: 5px;
      width: 20px;
      height: 20px;
      margin: 0;
      border: 1px solid $darkText;
      transition: transform 0.1s;

      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
    .delete-button {
      display: inline-block;
      box-sizing: border-box;
      position: absolute;
      top: 3px;
      right: 4px;
      width: 20px;
      height: 20px;
      font-size: 20px;
      text-align: center;
      transition: transform 0.1s;

      g:nth-of-type(2) line {
        stroke: white;
        transition: stroke 0.1s;
      }

      &:hover {
        cursor: pointer;
        transform: scale(1.15);
        g:nth-of-type(2) line {
          stroke: $primary;
        }
      }
    }
    .edit-button {
      position: absolute;
      cursor: pointer;
      bottom: 5px;
      left: 5px;
      width: 20px;
      height: 20px;

      &:hover {
        transform: scale(1.1);
      }
    }
    .save-button {
      position: absolute;
      cursor: pointer;
      bottom: 5px;
      left: 25px;
      width: 30px;
      height: 20px;
      margin-left: 3px;

      &:hover {
        transform: scale(1.1);
      }
    }
    .cancel-button {
      display: inline-block;
      box-sizing: border-box;
      position: absolute;
      cursor: pointer;
      bottom: 5px;
      left: 5px;
      width: 20px;
      height: 20px;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
  *:focus {
    outline: none;
  }

  @media screen and (max-width: 600px) {
    .task-box {
      width: 230px;
      height: 200px;
    }
  }
</style>
