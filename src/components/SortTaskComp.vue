<template>
  <div id="sort-container">
    <label id="sort-label" for="sorting">Sort by:</label>
    <select id="sort-dropdown" name="sorting">
      <option value="dateInverse">Newest</option>
      <option value="date">Oldest</option>
      <option value="alphabeticalInverse">Z-A</option>
      <option value="alphabetical">A-Z</option>
    </select>
    <div id="sort-button" @click="sortEvent()">Sort</div>
  </div>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: "SortTaskComp",
    methods: {
      ...mapActions(["sortTasks"]),
      sortEvent() {
        const type = document.getElementById("sort-dropdown").value;
        this.sortTasks(type);
      },
    },
  };
</script>

<style scoped lang="scss">
  #sort-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    left: 75px;
    width: 270px;
    height: 75px;
    padding: 10px;
    border: 2px solid;
    border-top-color: $secondary;
    border-right-color: $secondary;
    border-left-color: $darkText;
    border-bottom-color: $darkText;
    background-color: $tertiary;
  }
  #sort-button {
    height: 40px;
    width: 80px;
    line-height: 38px;
    text-align: center;
    font-weight: bolder;
    font-size: 16px;
    border: 2px solid $darkText;
    color: $lightText;
    background-color: $primary;
    transition: background 0.2s;

    &:hover {
      cursor: pointer;
      background: $accent;
    }
  }
  #sort-label {
    font-weight: bold;
    color: $lightText;
  }
  #sort-dropdown {
    width: 100px;
    height: 30px;
    border: 2px solid $darkText;
    background: $backgroundDark;
  }
  *:focus {
    outline: none;
  }
</style>
