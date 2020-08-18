import axios from "axios";
axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem("accessToken")}`;

const backendAddress = process.env.NODE_ENV == "production" ? "https://task-manager-backend11.herokuapp.com" : "http://localhost:3000";

const state = {
  tasks: [],
};

const getters = {
  allTasks: (state) => state.tasks,
};

const actions = {
  async initialFetchTasks({ commit }) {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem("accessToken")}`;
      let res = await axios.get(`${backendAddress}/api/tasks/user`);
      commit("setTasksM", res.data);
    } catch (err) {
      console.log(err)
    }
  },
  async fetchTasks({ commit }) {
    try {
      if (isTokenExpired()) await refreshToken()
      let res = await axios.get(`${backendAddress}/api/tasks/user`);
      commit("setTasksM", res.data);
    } catch (err) {
      console.log(err)
    }
  },
  async addTask({ commit }, taskObj) {
    try {
      if (isTokenExpired()) await refreshToken()
      const res = await axios.post(`${backendAddress}/api/tasks`, taskObj);
      commit("addTaskM", res.data);
    } catch (err) {
      console.log(err)
    }
  },
  async deleteTask({ commit }, id) {
    try {
      if (isTokenExpired()) await refreshToken()
      const res = await axios.delete(`${backendAddress}/api/tasks/${id}`);
      commit("delTaskM", res.data);
    } catch (err) {
      console.log(err)
    }
  },
  clearTasks({ commit }) {
    commit("setTasksM", []);
  },
  sortTasks({ commit }, type) {
    switch (type) {
      case "alphabetical":
        commit("sortTasksAlphaM");
        break;
      case "alphabeticalInverse":
        commit("sortTasksAlphaInverseM");
        break;
      case "date":
        commit("sortTasksDateM");
        break;
      case "dateInverse":
        commit("sortTasksDateInverseM");
        break;
    }
  },
  searchTasks({ commit }, search) {
    commit("searchTasksM", search);
  },
};

const mutations = {
  setTasksM: (state, tasks) => {
    tasks.forEach((task) => {
      task.createdAt = new Date(task.createdAt);
    });
    state.tasks = tasks;
  },
  addTaskM: (state, task) => {
    state.tasks.unshift(task);
  },
  delTaskM: (state, task) => {
    state.tasks = state.tasks.filter((taskX) => taskX._id != task._id);
  },
  toggleCompleteM: (state, taskId) => {
    let ind = state.tasks.findIndex((td) => td._id === taskId);
    let taskX = state.tasks[ind];
    taskX.completed = !taskX.completed;
  },
  sortTasksAlphaM: (state) =>
    state.tasks.sort((a, b) => {
      const titleValueA = a.title.toLowerCase().charCodeAt(0);
      const titleValueB = b.title.toLowerCase().charCodeAt(0);
      return titleValueA - titleValueB;
    }),
  sortTasksAlphaInverseM: (state) => {
    state.tasks.sort((a, b) => {
      const titleValueA = a.title.toLowerCase().charCodeAt(0);
      const titleValueB = b.title.toLowerCase().charCodeAt(0);
      return titleValueB - titleValueA;
    });
  },
  sortTasksDateM: (state) => {
    state.tasks.sort((a, b) => {
      const dateObjA = new Date(a.createdAt);
      const dateObjB = new Date(b.createdAt);
      const dateA = dateObjA.getTime();
      const dateB = dateObjB.getTime();
      return dateA - dateB;
    });
  },
  sortTasksDateInverseM: (state) => {
    state.tasks.sort((a, b) => {
      const dateObjA = new Date(a.createdAt);
      const dateObjB = new Date(b.createdAt);
      const dateA = dateObjA.getTime();
      const dateB = dateObjB.getTime();
      return dateB - dateA;
    });
  },
  searchTasksM: (state, search) => {
    state.tasks = state.tasks.filter((task) => {
      return task.title.includes(search);
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

async function refreshToken() {
  try {
    let res = await axios.post(`${backendAddress}/api/login/refresh`, {
      token: sessionStorage.getItem("refreshToken"),
    });
    sessionStorage.setItem("accessToken", res.data.accessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem("accessToken")}`;
  } catch (err) {
    console.log(err);
  }
}

function isTokenExpired() {
  const token = sessionStorage.getItem("accessToken")
  const expireTime = JSON.parse(atob(token.split('.')[1])).exp
  return expireTime <= (Date.now()/1000) 
}