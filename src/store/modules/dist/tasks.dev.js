"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_axios["default"].defaults.headers.common["Authorization"] = "Bearer ".concat(sessionStorage.getItem("accessToken"));
var backendAddress = process.env.NODE_ENV == "production" ? "https://task-manager-backend11.herokuapp.com" : "http://localhost:3000";
var state = {
  tasks: [],
  displayTasks: []
};
var getters = {
  allTasks: function allTasks(state) {
    return state.tasks;
  },
  displayTasks: function displayTasks(state) {
    return state.displayTasks;
  }
};
var actions = {
  initialFetchTasks: function initialFetchTasks(_ref) {
    var commit, res;
    return regeneratorRuntime.async(function initialFetchTasks$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commit = _ref.commit;
            _context.prev = 1;
            _axios["default"].defaults.headers.common["Authorization"] = "Bearer ".concat(sessionStorage.getItem("accessToken"));
            _context.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].get("".concat(backendAddress, "/api/tasks/user")));

          case 5:
            res = _context.sent;
            commit("setTasksM", res.data);
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            console.log(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 9]]);
  },
  fetchTasks: function fetchTasks(_ref2) {
    var commit, res;
    return regeneratorRuntime.async(function fetchTasks$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commit = _ref2.commit;
            _context2.prev = 1;

            if (!isTokenExpired()) {
              _context2.next = 5;
              break;
            }

            _context2.next = 5;
            return regeneratorRuntime.awrap(refreshToken());

          case 5:
            _context2.next = 7;
            return regeneratorRuntime.awrap(_axios["default"].get("".concat(backendAddress, "/api/tasks/user")));

          case 7:
            res = _context2.sent;
            commit("setTasksM", res.data);
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](1);
            console.log(_context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 11]]);
  },
  addTask: function addTask(_ref3, taskObj) {
    var commit, res;
    return regeneratorRuntime.async(function addTask$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commit = _ref3.commit;
            _context3.prev = 1;

            if (!isTokenExpired()) {
              _context3.next = 5;
              break;
            }

            _context3.next = 5;
            return regeneratorRuntime.awrap(refreshToken());

          case 5:
            _context3.next = 7;
            return regeneratorRuntime.awrap(_axios["default"].post("".concat(backendAddress, "/api/tasks"), taskObj));

          case 7:
            res = _context3.sent;
            commit("addTaskM", res.data);
            _context3.next = 14;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 11]]);
  },
  deleteTask: function deleteTask(_ref4, id) {
    var commit, res;
    return regeneratorRuntime.async(function deleteTask$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            commit = _ref4.commit;
            _context4.prev = 1;

            if (!isTokenExpired()) {
              _context4.next = 5;
              break;
            }

            _context4.next = 5;
            return regeneratorRuntime.awrap(refreshToken());

          case 5:
            _context4.next = 7;
            return regeneratorRuntime.awrap(_axios["default"]["delete"]("".concat(backendAddress, "/api/tasks/").concat(id)));

          case 7:
            res = _context4.sent;
            commit("delTaskM", res.data);
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 11]]);
  },
  clearTasks: function clearTasks(_ref5) {
    var commit = _ref5.commit;
    commit("setTasksM", []);
  },
  sortTasks: function sortTasks(_ref6, type) {
    var commit = _ref6.commit;

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
  searchTasks: function searchTasks(_ref7, search) {
    var commit = _ref7.commit;
    commit("searchTasksM", search);
  }
};
var mutations = {
  setTasksM: function setTasksM(state, tasks) {
    tasks.forEach(function (task) {
      task.createdAt = new Date(task.createdAt);
    });
    state.tasks = tasks;
  },
  addTaskM: function addTaskM(state, task) {
    state.tasks.unshift(task);
  },
  delTaskM: function delTaskM(state, task) {
    state.tasks = state.tasks.filter(function (taskX) {
      return taskX._id != task._id;
    });
  },
  toggleCompleteM: function toggleCompleteM(state, taskId) {
    var ind = state.tasks.findIndex(function (td) {
      return td._id === taskId;
    });
    var taskX = state.tasks[ind];
    taskX.completed = !taskX.completed;
  },
  sortTasksAlphaM: function sortTasksAlphaM(state) {
    return state.tasks.sort(function (a, b) {
      var titleValueA = a.title.toLowerCase().charCodeAt(0);
      var titleValueB = b.title.toLowerCase().charCodeAt(0);
      return titleValueA - titleValueB;
    });
  },
  sortTasksAlphaInverseM: function sortTasksAlphaInverseM(state) {
    state.tasks.sort(function (a, b) {
      var titleValueA = a.title.toLowerCase().charCodeAt(0);
      var titleValueB = b.title.toLowerCase().charCodeAt(0);
      return titleValueB - titleValueA;
    });
  },
  sortTasksDateM: function sortTasksDateM(state) {
    state.tasks.sort(function (a, b) {
      var dateObjA = new Date(a.createdAt);
      var dateObjB = new Date(b.createdAt);
      var dateA = dateObjA.getTime();
      var dateB = dateObjB.getTime();
      return dateA - dateB;
    });
  },
  sortTasksDateInverseM: function sortTasksDateInverseM(state) {
    state.tasks.sort(function (a, b) {
      var dateObjA = new Date(a.createdAt);
      var dateObjB = new Date(b.createdAt);
      var dateA = dateObjA.getTime();
      var dateB = dateObjB.getTime();
      return dateB - dateA;
    });
  },
  searchTasksM: function searchTasksM(state, search) {
    state.displayTasks = state.tasks.filter(function (task) {
      return task.title.includes(search);
    });
  }
};
var _default = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};
exports["default"] = _default;

function refreshToken() {
  var res;
  return regeneratorRuntime.async(function refreshToken$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(backendAddress, "/api/login/refresh"), {
            token: sessionStorage.getItem("refreshToken")
          }));

        case 3:
          res = _context5.sent;
          sessionStorage.setItem("accessToken", res.data.accessToken);
          _axios["default"].defaults.headers.common["Authorization"] = "Bearer ".concat(sessionStorage.getItem("accessToken"));
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function isTokenExpired() {
  var token = sessionStorage.getItem("accessToken");
  var expireTime = JSON.parse(atob(token.split(".")[1])).exp;
  return expireTime <= Date.now() / 1000;
}