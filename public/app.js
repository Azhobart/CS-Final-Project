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
            "https://www.clipartkey.com/mpngs/m/324-3244570_transparent-clipart-prisoner-behind-bars-cartoon.png",
        },
        { name: "Draw!", image: "" },
        {
          name: "Minesweeper",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_icon_orange_4.svg/729px-Flag_icon_orange_4.svg.png",
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


      //prisoners dilemma game variables
      prisonerScores: [0, 0],
      prisonBot: "Random",
      prisonerGameLength: 10 + Math.floor(Math.random() * 3),
<<<<<<< HEAD


      // reaction game variables
      reactionGameOver: false,
      ready: false,
      getSet: false,
      draw: false,
      displayReaction: false,
      reactionTime: 0,
      startTime: null,
      reactionScore: 0,
      bestReaction: [],
      reactions: [1, .8, .6, .4, .3, .26],
      index: 0,
=======
      prisonHistory: [],

      //Minesweeper game variables
      minesweeperBoard: {
        width: 16,
        height: 0,
        cells: [],
      },
      minesweeperScore: 0,
      minesweeperMineChance: 8,
      minesweeperGameState: "playing",
>>>>>>> 5dfb5fe18cffb7f34abb2fe1a3e4d6eb77b00efc
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
      let scoreExists = false;
      let scoreIsHigher = false;
      this.getScores();
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
            this.finishGame(this.finalColorsScore);
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
      let prisonerOptions = ["Cooperate", "Defect"];
      let payoffMatrix = [
        [
          [2, 2],
          [0, 3],
        ],
        [
          [3, 0],
          [1, 1],
        ],
      ];
      let opponentChoice;

      if (this.prisonBot === "All Defects") {
        opponentChoice = 1;
      }
      if (this.prisonBot === "All Cooperations") {
        opponentChoice = 0;
      }
      if (this.prisonBot === "Random") {
        opponentChoice = Math.floor(Math.random() * 2);
      }
      if (this.prisonBot === "Tit For Tat") {
        opponentChoice = 0;
        if (this.prisonHistory.length > 1) {
          if (this.prisonHistory[0].choices[0] === 1) {
            opponentChoice = 1;
          }
        }
      }

      let x = choice;
      let y = opponentChoice;

      this.prisonerScores[0] += payoffMatrix[x][y][0];
      this.prisonerScores[1] += payoffMatrix[x][y][1];

      this.prisonHistory = [
        {
          scores: payoffMatrix[x][y],
          choices: [x, y],
        },
      ].concat(this.prisonHistory);

      if (this.prisonHistory.length > this.prisonerGameLength) {
        let newPrisonerScore = {
          game: this.page,
          value: this.prisonerScores[0],
          user: this.currentUser._id,
        };
        this.prisonerDisplay = "";
        this.prisonerScores = [0, 0];
        this.prisonHistory = [];
        this.finishGame(newPrisonerScore);
      }
    },


    countdown: function() {
      console.log(this.reactions)
      console.log(this.reactionGameOver)
      if (this.reactionGameOver === false) {
        let countdownOne = 0;
        let countdownTwo = 0;
        let countdownThree = 0;

        this.ready = false;
        this.getSet = false;
        this.draw = false;


        // display 'ready' for 2 sec
        var stageOne = setInterval(() => {
          this.displayReaction = false;
          countdownOne++
          if (countdownOne === 1) {
            this.ready = true;
            countdownOne = 0;
            clearInterval(stageOne);
          }
        }, 1000);

        // display 'get set' afterwards for 3 sec
          var stageTwo = setInterval(() => {
            countdownTwo++
            if (countdownTwo === 5 && this.ready) {
              this.ready = false;
              this.getSet = true;
              countdownTwo = 0;
              clearInterval(stageTwo);
            }
          }, 1000) 

          // display 'draw!' and set timer (in milliseconds) 
          // record time once the user presses the space key
          var stageThree = setInterval(() => {
            countdownThree++
            if (countdownThree === 8 && this.getSet) {
              this.getSet = false;
              this.draw = true;
              countdownThree = 0;
              clearInterval(stageThree);
              this.getReaction();
            }
          }, 1000)

      } else {
        this.reactionGameOver = true;
        this.finishGame(this.reactionScore);
        this.reactionScore = 0;

      }
    },


    getReaction: function() {
      this.reactionTime = 0;
      startTime = Date.now()

      addEventListener("keydown", (event) => {
        if (event.key === " " && this.draw) {
          const endTime = Date.now()
          this.reactionTime = (endTime - startTime) / 1000;
          this.displayReaction = true; 
          startTime = null;
          console.log(this.reactionTime)
          this.compareReaction();
          console.log(this.reactionScore)
          this.countdown();
        } else {
          console.log("Too early, try again!");
        }
    });
    },

    compareReaction: function() {
      console.log(`set score: ${this.reactions[this.index]}`);
        if (this.reactionTime < this.reactions[this.index]) {
          this.reactionScore++;
          this.index++;
        } else {
          this.reactionGameOver = true;
        };
        if (this.reactions[this.index] === .26) {
          while(this.reactionGameOver === false) {
            if (this.reactionTime < this.reactions[this.index]) {
              this.reactionScore++;
              this.index ++;
            } else {
              this.reactionGameOver = true;
            };
          };
        };
    },


    //Minesweeper game methods
    addMinesweeperRow: function () {
      this.minesweeperBoard.cells.push([]);
      this.minesweeperBoard.height += 1;
      for (let i = 0; i < this.minesweeperBoard.width; i += 1) {
        let obj = {
          isHidden: true,
          isFlagged: false,
          value: 0,
          isMine: false,
        };
        if (Math.random() * this.minesweeperMineChance <= 1) {
          obj.isMine = true;
        }
        this.minesweeperBoard.cells[
          this.minesweeperBoard.cells.length - 1
        ].push(obj);
      }
    },
    resetMinesweeperBoard: function () {
      this.minesweeperBoard.cells = [];
      this.minesweeperBoard.height = 0;
      for (let i = 0; i < this.minesweeperBoard.width; i += 1) {
        this.addMinesweeperRow();
      }
    },
    calculateMinesweeperValues: function () {
      let hasWon = true;
      for (let i = 0; i < this.minesweeperBoard.width; i += 1) {
        for (let j = 0; j < this.minesweeperBoard.height; j += 1) {
          //check for win
          if (
            this.minesweeperBoard.cells[i][j].isMine &&
            !this.minesweeperBoard.cells[i][j].isFlagged
          ) {
            hasWon = false;
          }
          if (
            !this.minesweeperBoard.cells[i][j].isMine &&
            this.minesweeperBoard.cells[i][j].isHidden
          ) {
            hasWon = false;
          }
          let cellValue = 0;
          //edges
          if (i > 0) {
            if (this.minesweeperBoard.cells[i - 1][j].isMine) {
              cellValue += 1;
            }
          }
          if (j > 0) {
            if (this.minesweeperBoard.cells[i][j - 1].isMine) {
              cellValue += 1;
            }
          }
          if (i < this.minesweeperBoard.width - 1) {
            if (this.minesweeperBoard.cells[i + 1][j].isMine) {
              cellValue += 1;
            }
          }
          if (j < this.minesweeperBoard.height - 1) {
            if (this.minesweeperBoard.cells[i][j + 1].isMine) {
              cellValue += 1;
            }
          }

          //corners
          if (i > 0 && j > 0) {
            if (this.minesweeperBoard.cells[i - 1][j - 1].isMine) {
              cellValue += 1;
            }
          }
          if (i > 0 && j < this.minesweeperBoard.height - 1) {
            if (this.minesweeperBoard.cells[i - 1][j + 1].isMine) {
              cellValue += 1;
            }
          }
          if (i < this.minesweeperBoard.width - 1 && j > 0) {
            if (this.minesweeperBoard.cells[i + 1][j - 1].isMine) {
              cellValue += 1;
            }
          }
          if (
            i < this.minesweeperBoard.width - 1 &&
            j < this.minesweeperBoard.height - 1
          ) {
            if (this.minesweeperBoard.cells[i + 1][j + 1].isMine) {
              cellValue += 1;
            }
          }

          this.minesweeperBoard.cells[i][j].value = cellValue;
        }
      }

      if (hasWon) {
        this.resetMinesweeperBoard();
      }
    },
    clearMinesweeperArea: function () {
      let newCells = true;

      while (newCells) {
        newCells = false;
        let prevBoard = this.minesweeperBoard;
        for (let i = 0; i < this.minesweeperBoard.width; i += 1) {
          for (let j = 0; j < this.minesweeperBoard.height; j += 1) {
            if (
              prevBoard.cells[i][j].isHidden &&
              !prevBoard.cells[i][j].isFlagged
            ) {
              //edges
              if (i > 0) {
                if (
                  prevBoard.cells[i - 1][j].value == 0 &&
                  !prevBoard.cells[i - 1][j].isHidden
                ) {
                  newCells = true;
                  this.minesweeperBoard.cells[i][j].isHidden = false;
                }
              }
              if (j > 0) {
                if (
                  prevBoard.cells[i][j - 1].value == 0 &&
                  !prevBoard.cells[i][j - 1].isHidden
                ) {
                  newCells = true;
                  this.minesweeperBoard.cells[i][j].isHidden = false;
                }
              }
              if (i < prevBoard.width - 1) {
                if (
                  prevBoard.cells[i + 1][j].value == 0 &&
                  !prevBoard.cells[i + 1][j].isHidden
                ) {
                  newCells = true;
                  this.minesweeperBoard.cells[i][j].isHidden = false;
                }
              }
              if (j < prevBoard.height - 1) {
                if (
                  prevBoard.cells[i][j + 1].value == 0 &&
                  !prevBoard.cells[i][j + 1].isHidden
                ) {
                  newCells = true;
                  this.minesweeperBoard.cells[i][j].isHidden = false;
                }
              }

              //corners
              if (i > 0 && j > 0) {
                if (
                  prevBoard.cells[i - 1][j - 1].value == 0 &&
                  !prevBoard.cells[i - 1][j - 1].isHidden
                ) {
                  newCells = true;
                  this.minesweeperBoard.cells[i][j].isHidden = false;
                }
              }
              if (i > 0 && j < prevBoard.height - 1) {
                if (
                  prevBoard.cells[i - 1][j + 1].value == 0 &&
                  !prevBoard.cells[i - 1][j + 1].isHidden
                ) {
                  newCells = true;
                  this.minesweeperBoard.cells[i][j].isHidden = false;
                }
              }
              if (i < prevBoard.width - 1 && j > 0) {
                if (
                  prevBoard.cells[i + 1][j - 1].value == 0 &&
                  !prevBoard.cells[i + 1][j - 1].isHidden
                ) {
                  newCells = true;
                  this.minesweeperBoard.cells[i][j].isHidden = false;
                }
              }
              if (i < prevBoard.width - 1 && j < prevBoard.height - 1) {
                if (
                  prevBoard.cells[i + 1][j + 1].value == 0 &&
                  !prevBoard.cells[i + 1][j + 1].isHidden
                ) {
                  newCells = true;
                  this.minesweeperBoard.cells[i][j].isHidden = false;
                }
              }
            }
          }
        }
      }
    },
    unhideMinesweeperCell: function (x, y) {
      if (
        !this.minesweeperBoard.cells[x][y].isFlagged &&
        this.minesweeperGameState === "playing"
      ) {
        this.minesweeperBoard.cells[x][y].isHidden = false;

        this.calculateMinesweeperValues();
        this.clearMinesweeperArea();
        if (this.minesweeperBoard.cells[x][y].isMine) {
          this.minesweeperGameState = "lost";
          let newMinesweeperScore = {
            game: this.page,
            value: this.minesweeperScore,
            user: this.currentUser._id,
          };
          this.setScore(newMinesweeperScore);
        } else {
          this.minesweeperScore += 1;
        }
      }
    },
    toggleFlagMinesweeperCell: function (x, y) {
      if (this.minesweeperGameState === "playing") {
        this.minesweeperBoard.cells[x][y].isFlagged =
          !this.minesweeperBoard.cells[x][y].isFlagged;
      }

      this.calculateMinesweeperValues();
    },
    beginMinesweeperGame: function () {
      this.resetMinesweeperBoard();
      this.minesweeperGameState = "playing";
      this.minesweeperScore = 0;
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

    //minesweeper setup
    this.beginMinesweeperGame();
  },
}).mount("#app");
