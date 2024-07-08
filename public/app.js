const URL = "http://localhost:8080";
Vue.createApp({
  data() {
    return {
      page: "login",

      user: {
        name: "",
        username: "",
        region: "",
        authQuestion: "",
        authAnswer: "",

      },

    };
  },
  methods: {
    setPage: function(newPage) {
      this.page = newPage;

    },


    registerUser: async function() {
      let myHeaders = new Headers();
      myHeaders.append("content-type", "application/json");

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(this.user),
      };

      let response = await fetch(`${URL}/users`, requestOptions);
      if (response.status === 201) {
        console.log("successfully registered");
      } else {
        console.log("failed to register")
      }

    },


  },

  created: function () {},
}).mount("#app");
