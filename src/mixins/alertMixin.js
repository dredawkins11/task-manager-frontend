export default {
  data() {
    return {
      alertTitle: "default title",
      alertMessage: "default message",
      alertActive: false,
    }
  },
  methods: {
    createAlert(title, message) {
      this.alertActive = true;
      this.alertTitle = title;
      this.alertMessage = message;
    },
    closeAlert() {
      this.alertActive = false
    }
  },
  mounted() {
    this.$on("close-alert" , () => this.closeAlert())
  }
}