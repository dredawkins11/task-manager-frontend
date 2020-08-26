"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  data: function data() {
    return {
      alertTitle: "default title",
      alertMessage: "default message",
      alertActive: false
    };
  },
  methods: {
    createAlert: function createAlert(title, message) {
      this.alertActive = true;
      this.alertTitle = title;
      this.alertMessage = message;
    },
    closeAlert: function closeAlert() {
      this.alertActive = false;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$on("close-alert", function () {
      return _this.closeAlert();
    });
  }
};
exports["default"] = _default;