import Vue from 'vue'
import Vuex from 'vuex'
import tasks from './modules/tasks.js'
import app from './modules/app.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    tasks,
    app
  }
})