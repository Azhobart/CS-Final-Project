const URL = "http://localhost:8080";
Vue.createApp({
  data() {
    return {
      page: "login",

      currentUser: {},

      user: {
        name: "",
        username: "",
        region: "",
        authQuestion: "",
        authAnswer: "",
      },

      regions: [
        {
          code: "AF",
          name: "Africa",
        },
        {
          code: "AN",
          name: "Antarctica",
        },
        {
          code: "AS",
          name: "Asia",
        },
        {
          code: "EU",
          name: "Europe",
        },
        {
          code: "NA",
          name: "North America",
        },
        {
          code: "OC",
          name: "Oceania",
        },
        {
          code: "SA",
          name: "South America",
        },
      ],

      games: [
        {
          name: "Tic Tac Toe",
          image:
            "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQdR5hPxiKG7MuJFuIe1lbrqandKE2QP5JzdrE4Dt6gnzu6Xnc0dCyK97yTeghVzkok",
        },
        {
          name: "Battleship",
          image:
            "https://www.hasbro.com/common/productimages/en_US/54D1C85ECFBE46259A9E53C36F4D136C/c386e8608f9409166a4409b11ace173f5f504449.jpg",
        },
        { name: 2, image: "" },

        { name: 3, image: "" },
        { name: 4, image: "" },
        {
          name: "CAT",
          image: "",
        },
        { name: 6, image: "" },
        { name: "Test Test TEst teTredgrsegsr", image: "" },
        { name: 8, image: "" },

        { name: 9, image: "" },
        { name: "10", image: "" },
      ],

      scores: [],

      scoreRegionSearchInput: "",
      scoreGameSearchInput: "Tic Tac Toe",
      scoreUserSearchInput: "",
    };
  },
  methods: {
    setPage: function (newPage) {
      this.page = newPage;
    },

    registerUser: async function () {
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
        console.log("failed to register");
      }
    },

    getUser: async function (id) {
      let response = await fetch(`${URL}/users/${id}`);
      if (response.status === 200) {
        let data = await response.json();
        return data;
      } else {
        return {};
      }
    },

    loginUser: async function () {
      let newHeaders = new Headers();
      newHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: "POST",
        headers: newHeaders,
        body: JSON.stringify(this.user),
      };

      let response = await fetch(`${URL}/session`, requestOptions);
      let data = await response.json();

      if (response.status === 201) {
        this.currentUser = await this.getUser(data.userID);

        console.log("Succesfully logged in");
        this.setPage("home");
      } else {
        console.log("Failed to log in.");
        this.user = {};
      }
    },

    getUserByUsername: async function () {
      let response = await fetch(`${URL}/users/username/${this.user.username}`);
      if (response.status === 200) {
        let data = await response.json();
        this.user.authQuestion = data.authQuestion;
      } else {
        this.user = {};
        this.setPage("login");
      }
    },

    getSession: async function () {
      let response = await fetch(`${URL}/session`);
      if (response.status === 200) {
        let data = await response.json();

        this.setPage("home");
      } else {
        this.setPage("login");
      }
    },

    getScores: async function () {
      let response = await fetch(`${URL}/scores`);

      let data = await response.json();
      this.scores = data;
    },
  },

  computed: {
    filteredScores: function () {
      let byRegion = this.scores.filter((score) => {
        return score.user.region.includes(this.scoreRegionSearchInput);
      });
      let byGame = byRegion.filter((score) => {
        return score.game.includes(this.scoreGameSearchInput);
      });
      let byUser = byGame.filter((score) => {
        return score.user.username.includes(this.scoreUserSearchInput);
      });
      return byUser;
    },
  },

  created: function () {
    this.getSession();
    this.getScores();
  },
}).mount("#app");
