const URL = "http://localhost:8080";
Vue.createApp({
  data() {
    return {
      page: "login"
    };
  },
  methods: {
    setPage: function(newPage) {
      this.page = newPage;
      
    }

  },

  created: function () {},
}).mount("#app");
