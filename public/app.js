const URL = "http://localhost:8080";
Vue.createApp({
  data() {
    return {
      page: "login",
      isEditing: false,
      newUser: {
        name: "",
        username: "",
        region: "",
        authQuestion: "",
        authAnswer: "",
        favoriteGame: "",
        scores: [],
      },

      currentUser: {},

      user: {
        name: "",
        username: "",
        region: "",
        authQuestion: "",
        authAnswer: "",
        favoriteGame: "",
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
        { name: "Colors", image: "" },

        {
          name: "Prisoner's Dilemma",
          image:
            "https://pnghq.com/wp-content/uploads/jail-bars-png-images-free-png-image-downloads-26441-1536x1229.png",
        },
        { name: "Draw!", image: "" },
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
      lastAchievedScore: {},

      scoreRegionSearchInput: "",
      scoreGameSearchInput: "Tic Tac Toe",
      scoreUserSearchInput: "",

      // color game variables
      colors: ["#FF0000", "#0000FF", "#FFFF00", "#00FF00"],
      userInput: [],
      randomColor: "",
      colorSequence: [],
      activeColorsScore: 0,
      finalColorsScore: 0,
      colorGameOver: false,
      colorGameStart: false,


      // reaction game variables
      clickedTime: null,
      createdTime: null,
      reactionTime: null,
      
      //prisoners dilemma game variables
      prisonerScore: 0,
      prisonerTurn: 0,
      prisonerDisplay: "",
      prisonerGameLength: 10 + Math.floor(Math.random() * 3),
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
        this.currentUser = await this.getUser(data.userID);
        this.setPage("home");
      } else {
        this.setPage("login");
      }
    },

    deleteSession: async function () {
      let requestOptions = {
        method: "DELETE",
      };

      let response = await fetch(`${URL}/session`, requestOptions);
      if (response.status === 204) {
        this.isEditing = false;
        this.page = "login";
        this.currentUser = null;
      }
    },

    editProfile: function () {
      this.newUser = this.currentUser;
      this.isEditing = true;
    },

    saveProfile: async function () {
      console.log(this.newUser);
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(this.newUser),
      };

      let response = await fetch(
        `${URL}/users/${this.newUser._id}`,
        requestOptions
      );
      if (response.status === 204) {
        console.log(this.currentUser);
        this.isEditing = false;
      } else {
        console.log("failed to update user");
      }
    },

    getScores: async function () {
      let response = await fetch(`${URL}/scores`);

      let data = await response.json();
      this.scores = data;
      this.sortScores();
    },

    sortScores: function () {
      function compare(a, b) {
        if (parseInt(a.value) > parseInt(b.value)) {
          return -1;
        }
        if (parseInt(a.value) < parseInt(b.value)) {
          return 1;
        }
        return 0;
      }

      this.scores.sort(compare);
    },

    getScores: async function () {
      let response = await fetch(`${URL}/scores`);

      let data = await response.json();
      this.scores = data;
      this.sortScores();
    },

    addScore: async function (score) {
      let myHeaders = new Headers();
      myHeaders.append("content-type", "application/json");

      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(score),
      };

      let response = await fetch(`${URL}/scores`, requestOptions);
      let data = await response.json();

      //add score to user
      this.currentUser.scores.push(data._id);
      this.newUser = this.currentUser;

      this.isEditing = true;
      this.saveProfile();
    },
    updateScore: async function (score) {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(score),
      };

      let response = await fetch(`${URL}/scores/${score._id}`, requestOptions);
    },

    setScore: async function (score) {
      score.value += 1;
      let scoreExists = false;
      let scoreIsHigher = false;
      this.scores.forEach((currentScore) => {
        if (
          currentScore.game.includes(score.game) &&
          currentScore.user._id === this.currentUser._id
        ) {
          scoreExists = true;
          if (score.value >= currentScore.value) {
            scoreIsHigher = true;
            score._id = currentScore._id;
          }
        }
      });

      if (!scoreExists) {
        console.log("added score");
        this.addScore(score);
      } else if (scoreIsHigher) {
        console.log("updating score");
        this.updateScore(score);
      }
      this.getScores();
    },

    finishGame: async function (score) {
      this.setPage("finished game");
      this.lastAchievedScore = score;
    },

    // color game methods:
    getColor: function () {
      let ranIndex = Math.floor(Math.random() * this.colors.length);
      this.colorSequence.push(this.colors[ranIndex]);
    },

    addInput: function (input) {
      this.userInput.push(input);
      return this.userInput;
    },

    checkInput: function () {
      if (this.colorGameOver === false) {
        if (this.userInput.length === this.colorSequence.length) {
          if (
            JSON.stringify(this.colorSequence) ===
            JSON.stringify(this.userInput)
          ) {
            this.userInput = [];
            this.activeColorsScore++;
            this.getColor();
            this.cycleColors();
            console.log(this.activeColorsScore);
          } else {
            this.finalColorsScore = this.activeColorsScore;
            this.colorGameOver = true;
            this.userInput = [];
            this.randomColor = "";
            this.colorSequence = [];
            this.activeColorsScore = 0;
          }
        }
      }
    },

    cycleColors: function () {
      this.colorGameStart = true;
      let count = 0;
      var cycle = setInterval(() => {
        this.userInput = [];
        console.log(this.colorSequence);
        this.randomColor = this.colorSequence[count];
        var transition = setInterval(() => {
          this.randomColor = "#739072";
          clearInterval(transition);
        }, 500);
        console.log(this.randomColor);

        count++;

        if (count === this.colorSequence.length) {
          count = 0;
          clearInterval(cycle);
        }
      }, 1000);
    },

    //prisoners dillemma game methods
    incrementPrisonerTurn: function (choice) {
      let opponentChoice = Math.floor(Math.random() * 2);
      let prisonerOptions = ["Cooperate", "Defect"];
      let payoffMatrix = [
        [
          [3, 3],
          [0, 5],
        ],
        [
          [5, 0],
          [1, 1],
        ],
      ];
      let x = choice;
      let y = opponentChoice;

      this.prisonerScore += payoffMatrix[x][y][0];

      this.prisonerDisplay =
        "Your Opponent Chose " +
        prisonerOptions[opponentChoice] +
        "! +" +
        payoffMatrix[x][y][0];

      this.prisonerTurn += 1;
      if (this.prisonerTurn > this.prisonerGameLength) {
        let newScore = {
          game: this.page,
          value: this.prisonerScore,
          user: this.currentUser._id,
        };

        this.prisonerTurn = 0;
        this.prisonerDisplay = "";
        this.prisonerScore = 0;
        this.finishGame(newScore);
      }
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
    console.log(this.currentUser);

    this.getScores();
  },
}).mount("#app");
