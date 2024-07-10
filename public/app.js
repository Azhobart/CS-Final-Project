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
      
      currentUser: "",

    };
  },
  methods: {
    setPage: function(newPage) {
      this.page = newPage;

    },


    registerUser: async function() {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

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

    loginUser: async function() {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(this.user),
      };

      let response = await fetch(`${URL}/session`, requestOptions);
      let data = await response.json();
      if (response.status === 201) {
        console.log("login successful");
        this.currentUser = data;
        console.log(this.user)
        console.log(this.currentUser)
        this.user = {
          name: "",
          username: "",
          region: "",
          authQuestion: "",
          authAnswer: "",
        };
        this.page = "games";
      } else {
        console.log("failed to log in.");
      }
    },

    getSession: async function() {
      let response = await fetch(`${URL}/session`);
      
      if (response.status === 200) {
        let data = await response.json();
        this.currentUser = data;
        this.currentPage = "games";
      } else {
        this.currentPage = "login";
      }
    },




  },

  created: function () {
    console.log("vue app loaded");
    this.getSession();

  },
}).mount("#app");
