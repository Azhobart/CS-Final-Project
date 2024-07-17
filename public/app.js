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
      redSound: new Audio("colorSounds/originalBeep.mp3"),
      blueSound: new Audio("colorSounds/lowBeep.mp3"),
      yellowSound: new Audio("colorSounds/highBeep.mp3"),
      greenSound: new Audio("colorSounds/medBeep.mp3"),

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

      prisonHistory: [],

      // reaction game variables
      reactionSound: new Audio("reactionSounds/ricochet.mp3"),

      reactionGameOver: false,
      ready: false,
      getSet: false,
      draw: false,

      displayReaction: false,
      tooSlow: false,
      tooEarly: false,

      reactionTime: 0,
      startTime: null,
      userReactions: [],
      averageReaction: 0,
      reactions: [1, 0.8, 0.6, 0.6, 0.6, 0.4, 0.4, 0.35, 0.35, 0.3],
      timeIndex: 0,
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

      //Minesweeper game variables
      battleshipGameState: "placing",
      battleshipBoards: {
        width: 8,
        height: 8,
        opponent: [],
        player: [],
        opponentHoverGrid: [],
        playerHoverGrid: [],
      },
      selectedBattleship: 0,
      opponentSelectedBattleship: 0,
      battleshipValidHover: true,
      battleshipShips: [
        [
          [true, true],
          [false, false],
        ],
        [
          [true, true, true],
          [false, false, false],
          [false, false, false],
        ],
        [
          [true, true, true, true],
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, false],
        ],
        [
          [false, true, false],
          [true, true, true],
          [false, false, false],
        ],
      ],

      //Tic Tac Toe Game variable
      tictactoeBoard: [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
      ],
      tictactoeScore: 0,
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

    rotate2dArrayClockwise: function (arr) {
      let newArr = [];
      for (let i = 0; i < arr.length; i += 1) {
        newArr.push([]);
        for (let j = 0; j < arr[0].length; j += 1) {
          newArr[i].push(arr[i][j]);
        }
      }
      for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[0].length; j += 1) {
          newArr[j][i] = arr[-i + arr.length - 1][j];
        }
      }
      return newArr;
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
        if (this.randomColor === "#FF0000") {
          this.redSound.play();
        }
        if (this.randomColor === "#0000FF") {
          this.blueSound.play();
        }
        if (this.randomColor === "#FFFF00") {
          this.yellowSound.play();
        }
        if (this.randomColor === "#00FF00") {
          this.greenSound.play();
        }

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

    //reaction game methods
    countdown: function () {
      window.addEventListener("keydown", this.getReaction);

      if (this.reactionGameOver === false) {
        let countdownOne = 0;
        let countdownTwo = 0;
        let countdownThree = 0;
        let randomTime = Math.ceil(Math.random() * 3);

        this.ready = false;
        this.getSet = false;
        this.draw = false;

        // display 'ready' for 2 sec
        var stageOne = setInterval(() => {
          this.displayReaction = false;
          this.tooSlow = false;
          this.tooEarly = false;
          countdownOne++;
          if (countdownOne === 1) {
            this.ready = true;
            countdownOne = 0;
            clearInterval(stageOne);
          }
        }, 1000);

        // display 'get set' afterwards for 3 sec
        var stageTwo = setInterval(() => {
          countdownTwo++;
          if (countdownTwo === 2 && this.ready) {
            this.ready = false;
            this.getSet = true;
            countdownTwo = 0;
            clearInterval(stageTwo);
          }
        }, 1000);

        // display 'draw!' and set timer (in milliseconds)
        // record time once the user presses the space key
        var stageThree = setInterval(() => {
          countdownThree++;
          if (countdownThree === randomTime + 2 && this.getSet) {
            this.getSet = false;
            this.draw = true;
            countdownThree = 0;
            clearInterval(stageThree);
            this.startTime = Date.now();
          }
        }, 1000);
      } else {
        // when the game is over, display the average reaction time for the user.
        this.calculateAverageReaction();
        this.finishGame(this.averageReaction);
        this.userReactions = [];
        this.averageReaction = 0;
      }
    },

    getReaction: function () {
      this.reactionTime = 0;

      if (this.draw) {
        const endTime = Date.now();
        this.reactionTime = (endTime - this.startTime) / 1000;
        this.reactionSound.play();
        this.tooEarly = false;
        this.displayReaction = true;
        this.startTime = null;

        this.compareReaction();
      }
      if (!this.draw) {
        this.tooEarly = true;
        this.countdown();
      }
    },

    compareReaction: function () {
      if (this.reactionTime < this.reactions[this.timeIndex]) {
        this.userReactions.push(this.reactionTime);
        this.timeIndex++;
        this.countdown();
      } else {
        // punish the user (10 second penalty) if their reaction is slower than the defined values in this.reactions
        this.displayReaction = false;
        this.tooEarly = true;
        this.tooSlow = true;
        this.userReactions.push(this.reactionTime + 10);
        this.timeIndex++;
        this.countdown();
      }

      // once the code iterates through this.reactions, end the game.
      if (this.timeIndex >= this.reactions.length) {
        this.reactionGameOver = true;
        this.countdown();
      }
    },

    calculateAverageReaction: function () {
      for (let reaction of this.userReactions) {
        this.averageReaction += reaction;
      }
      this.averageReaction = this.averageReaction / 10;
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
          for (let i = 0; i < this.minesweeperBoard.width; i += 1) {
            for (let j = 0; j < this.minesweeperBoard.height; j += 1) {
              this.minesweeperBoard.cells[i][j].isHidden = false;
            }
          }
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

    //Battleship game methods
    resetBattleshipBoard: function () {
      this.selectedBattleship = 0;
      this.battleshipGameState = "placing";
      this.battleshipBoards.player = [];
      this.battleshipBoards.opponent = [];
      let obj = {
        isShip: false,
        isHidden: false,
        isHit: false,
        isMiss: false,
        backColor: "lightblue",
        frontColor: "lightblue",
      };
      let objOpp = {
        isShip: false,
        isHidden: true,
        isHit: false,
        isMiss: false,
        backColor: "blue",
        frontColor: "blue",
      };
      let oppArr = [];
      let playArr = [];
      for (let j = 0; j < this.battleshipBoards.width; j++) {
        oppArr.push(structuredClone(objOpp));
        playArr.push(structuredClone(obj));
      }
      for (let i = 0; i < this.battleshipBoards.height; i++) {
        this.battleshipBoards.opponent.push(structuredClone(oppArr));
        this.battleshipBoards.player.push(structuredClone(playArr));
      }
      //hover grids
      this.battleshipBoards.playerHoverGrid = Array(
        this.battleshipBoards.height
      )
        .fill()
        .map(() => Array(this.battleshipBoards.width).fill(false));
      this.battleshipBoards.opponentHoverGrid = Array(
        this.battleshipBoards.height
      )
        .fill()
        .map(() => Array(this.battleshipBoards.width).fill(false));

      //opponent place ships
      this.opponentSelectedBattleship = 0;
      while (
        this.opponentSelectedBattleship <=
        this.battleshipShips.length - 1
      ) {
        let x = Math.round(Math.random() * this.battleshipBoards.height);
        let y = Math.round(Math.random() * this.battleshipBoards.width);
        for (let i = 0; i < Math.random() * 4; i += 1) {
          this.battleshipShips[this.opponentSelectedBattleship] =
            this.rotate2dArrayClockwise(
              this.battleshipShips[this.opponentSelectedBattleship]
            );
        }
        this.placeBattleship(this.opponentSelectedBattleship, "opponent", x, y);
      }
    },

    battleshipFire: function (board, x, y) {
      if (board === "player") {
        this.battleshipBoards.player[x][y].isHit =
          this.battleshipBoards.player[x][y].isShip;
        this.battleshipBoards.player[x][y].isMiss =
          !this.battleshipBoards.player[x][y].isShip;
      } else {
        this.battleshipBoards.opponent[x][y].isHit =
          this.battleshipBoards.opponent[x][y].isShip;
        this.battleshipBoards.opponent[x][y].isMiss =
          !this.battleshipBoards.opponent[x][y].isShip;
      }
    },

    hoverBattleshipCell: function (board, x, y) {
      this.battleshipBoards.playerHoverGrid = Array(
        this.battleshipBoards.height
      )
        .fill()
        .map(() => Array(this.battleshipBoards.width).fill(false));
      this.battleshipBoards.opponentHoverGrid = Array(
        this.battleshipBoards.height
      )
        .fill()
        .map(() => Array(this.battleshipBoards.width).fill(false));

      if (board === "player") {
        if (this.battleshipGameState === "placing") {
          let selShip = this.battleshipShips[this.selectedBattleship];
          let isValid = true;
          this.battleshipValidHover = true;
          for (let i = 0; i < selShip.length; i += 1) {
            for (let j = 0; j < selShip[i].length; j += 1) {
              if (
                x + i > this.battleshipBoards.height - 1 ||
                y + j > this.battleshipBoards.width - 1
              ) {
                if (selShip[i][j]) {
                  isValid = false;
                  break;
                }
              } else if (
                this.battleshipBoards.player[x + i][y + j].isShip &&
                selShip[i][j]
              ) {
                this.battleshipValidHover = false;
              }
            }
          }

          if (isValid) {
            for (let i = 0; i < selShip.length; i += 1) {
              for (let j = 0; j < selShip[i].length; j += 1) {
                if (selShip[i][j]) {
                  this.battleshipBoards.playerHoverGrid[x + i][y + j] =
                    selShip[i][j];
                }
              }
            }
          }
        }
      }
      if (board === "opponent") {
        this.battleshipBoards.opponentHoverGrid[x][y] = true;
      }
      let opponentAliveCells = 0;
      let playerAliveCells = 0;
      for (let i = 0; i < this.battleshipBoards.height; i += 1) {
        for (let j = 0; j < this.battleshipBoards.width; j += 1) {
          //check win
          if (
            this.battleshipBoards.opponent[i][j].isShip &&
            !this.battleshipBoards.opponent[i][j].isHit
          ) {
            opponentAliveCells += 1;
          }
          if (
            this.battleshipBoards.player[i][j].isShip &&
            !this.battleshipBoards.player[i][j].isHit
          ) {
            playerAliveCells += 1;
          }

          this.battleshipBoards.opponent[i][j].backColor = "lightblue";
          this.battleshipBoards.opponent[i][j].frontColor = "lightblue";

          if (this.battleshipBoards.opponent[i][j].isShip) {
            this.battleshipBoards.opponent[i][j].frontColor = "grey";
          }
          if (this.battleshipBoards.opponent[i][j].isHidden) {
            this.battleshipBoards.opponent[i][j].backColor = "blue";
            this.battleshipBoards.opponent[i][j].frontColor = "blue";
          }
          if (this.battleshipBoards.opponent[i][j].isHit) {
            this.battleshipBoards.opponent[i][j].frontColor = "red";
          }
          if (this.battleshipBoards.opponent[i][j].isMiss) {
            this.battleshipBoards.opponent[i][j].frontColor = "white";
          }

          if (this.battleshipBoards.opponentHoverGrid[i][j]) {
            this.battleshipBoards.opponent[i][j].backColor =
              "RGBA(100,100,100,0.3)";
          }

          //player
          this.battleshipBoards.player[i][j].backColor = "lightblue";
          this.battleshipBoards.player[i][j].frontColor = "lightblue";

          if (this.battleshipBoards.player[i][j].isShip) {
            this.battleshipBoards.player[i][j].frontColor = "grey";
          }
          if (this.battleshipBoards.player[i][j].isHidden) {
            this.battleshipBoards.player[i][j].backColor = "blue";
            this.battleshipBoards.player[i][j].frontColor = "blue";
          }
          if (this.battleshipBoards.player[i][j].isHit) {
            this.battleshipBoards.player[i][j].frontColor = "red";
          }
          if (this.battleshipBoards.player[i][j].isMiss) {
            this.battleshipBoards.player[i][j].frontColor = "white";
          }

          if (this.battleshipBoards.playerHoverGrid[i][j]) {
            this.battleshipBoards.player[i][j].backColor =
              "RGBA(100,100,100,0.3)";
          }
        }
      }
      if (this.battleshipGameState === "playing") {
        if (opponentAliveCells == 0 && playerAliveCells > 0) {
          this.battleshipGameState = "won";
          let newBattleshipScore = {
            game: this.page,
            value: playerAliveCells,
            user: this.currentUser._id,
          };
          this.setScore(newBattleshipScore);
          for (let i = 0; i < this.battleshipBoards.height; i += 1) {
            for (let j = 0; j < this.battleshipBoards.width; j += 1) {
              this.battleshipBoards.opponent[i][j].isHidden = false;
            }
          }
          this.hoverBattleshipCell("opponent", 5, 5);
        }
        if (opponentAliveCells > 0 && playerAliveCells == 0) {
          this.battleshipGameState = "lost";
          for (let i = 0; i < this.battleshipBoards.height; i += 1) {
            for (let j = 0; j < this.battleshipBoards.width; j += 1) {
              this.battleshipBoards.opponent[i][j].isHidden = false;
            }
          }
        }
      }
    },

    placeBattleship: function (sel, board, x, y) {
      if (this.battleshipGameState === "placing") {
        if (board === "player") {
          let selShip = this.battleshipShips[sel];
          let isValid = true;
          for (let i = 0; i < selShip.length; i += 1) {
            for (let j = 0; j < selShip[0].length; j += 1) {
              if (
                x + i > this.battleshipBoards.height - 1 ||
                y + j > this.battleshipBoards.width - 1
              ) {
                if (selShip[i][j]) {
                  isValid = false;
                }
              } else if (
                this.battleshipBoards.player[x + i][y + j].isShip &&
                selShip[i][j]
              ) {
                isValid = false;
              }
            }
          }

          if (isValid) {
            let placed = false;
            for (let i = 0; i < selShip.length; i += 1) {
              for (let j = 0; j < selShip[i].length; j += 1) {
                if (
                  selShip[i][j] &&
                  !this.battleshipBoards.player[x + i][y + j].isShip
                ) {
                  this.battleshipBoards.player[x + i][y + j].isShip =
                    selShip[i][j];
                  placed = true;
                }
              }
            }
            if (placed) {
              this.selectedBattleship += 1;
            }
            if (this.selectedBattleship > this.battleshipShips.length - 1) {
              this.battleshipGameState = "playing";
            }
          }
        }
        if (board === "opponent") {
          let selShip = this.battleshipShips[sel];
          let isValid = true;
          for (let i = 0; i < selShip.length; i += 1) {
            for (let j = 0; j < selShip[0].length; j += 1) {
              if (
                x + i > this.battleshipBoards.height - 1 ||
                y + j > this.battleshipBoards.width - 1
              ) {
                if (selShip[i][j]) {
                  isValid = false;
                }
              } else if (
                this.battleshipBoards.opponent[x + i][y + j].isShip &&
                selShip[i][j]
              ) {
                isValid = false;
              }
            }
          }

          if (isValid) {
            let placed = false;
            for (let i = 0; i < selShip.length; i += 1) {
              for (let j = 0; j < selShip[i].length; j += 1) {
                if (
                  selShip[i][j] &&
                  !this.battleshipBoards.opponent[x + i][y + j].isShip
                ) {
                  this.battleshipBoards.opponent[x + i][y + j].isShip =
                    selShip[i][j];
                  placed = true;
                }
              }
            }
            if (placed) {
              this.opponentSelectedBattleship += 1;
            }
          }
        }
      }
    },

    clickBattleshipCell: function (btn, board, x, y) {
      if (btn === 0) {
        if (board === "player") {
          if (this.battleshipGameState === "placing") {
            this.placeBattleship(this.selectedBattleship, board, x, y);
          }
        }
        if (board === "opponent") {
          if (this.battleshipGameState === "playing") {
            if (
              !this.battleshipBoards.opponent[x][y].isMiss &&
              !this.battleshipBoards.opponent[x][y].isHit
            ) {
              this.battleshipFire("opponent", x, y);
              this.hoverBattleshipCell("opponent", x, y);

              //opponent fires

              let v = 0;
              let k = 0;
              while (
                this.battleshipBoards.player[v][k].isMiss ||
                this.battleshipBoards.player[v][k].isHit
              ) {
                let found_x = -1;
                let found_y = -1;
                for (let i = 0; i < this.battleshipBoards.height; i += 1) {
                  for (let j = 0; j < this.battleshipBoards.width; j += 1) {
                    if (
                      this.battleshipBoards.player[i][j].isHit &&
                      Math.random() * 3 < 1
                    ) {
                      found_x = i;
                      found_y = j;
                    }
                  }
                }

                if (found_x >= 0 && found_y >= 0) {
                  console.log("found hit");
                  if (found_x > 0) {
                    if (
                      !this.battleshipBoards.player[found_x - 1][found_y]
                        .isHit &&
                      !this.battleshipBoards.player[found_x - 1][found_y].isMiss
                    ) {
                      v = found_x - 1;
                      k = found_y;
                    }
                  }
                  if (found_y > 0) {
                    if (
                      !this.battleshipBoards.player[found_x][found_y - 1]
                        .isHit &&
                      !this.battleshipBoards.player[found_x][found_y - 1].isMiss
                    ) {
                      v = found_x;
                      k = found_y - 1;
                    }
                  }
                  if (found_x < this.battleshipBoards.height - 1) {
                    if (
                      !this.battleshipBoards.player[found_x + 1][found_y]
                        .isHit &&
                      !this.battleshipBoards.player[found_x + 1][found_y].isMiss
                    ) {
                      v = found_x + 1;
                      k = found_y;
                    }
                  }
                  if (found_y < this.battleshipBoards.width - 1) {
                    if (
                      !this.battleshipBoards.player[found_x][found_y + 1]
                        .isHit &&
                      !this.battleshipBoards.player[found_x][found_y + 1].isMiss
                    ) {
                      v = found_x;
                      k = found_y + 1;
                    }
                  }
                } else {
                  v = Math.round(
                    Math.random() * (this.battleshipBoards.height - 1)
                  );
                  k = Math.round(
                    Math.random() * (this.battleshipBoards.width - 1)
                  );
                }
              }
              if (
                !this.battleshipBoards.player[v][k].isMiss &&
                !this.battleshipBoards.player[v][k].isHit
              ) {
                console.log(`enemy fired at ${v},${k}`);
                this.battleshipFire("player", v, k);
                this.hoverBattleshipCell("player", v, k);
              }
            }
          }
        }
      }
      if (btn === 1) {
        if (board === "player") {
          if (this.battleshipGameState === "placing") {
            this.battleshipShips[this.selectedBattleship] =
              this.rotate2dArrayClockwise(
                this.battleshipShips[this.selectedBattleship]
              );
            this.hoverBattleshipCell("player", x, y);
          }
        }
      }
    },
    //tic tac toe methods
    resetTictactoe: function () {
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          this.tictactoeBoard[i][j] = " ";
        }
      }
    },
    tictactoeCheckForWin: function (val) {
      let b = this.tictactoeBoard;
      //rows
      if (b[0][0] === val && b[0][1] === val && b[0][2] === val) {
        return true;
      }
      if (b[1][0] === val && b[1][1] === val && b[1][2] === val) {
        return true;
      }
      if (b[2][0] === val && b[2][1] === val && b[2][2] === val) {
        return true;
      }

      //columns
      if (b[0][0] === val && b[1][0] === val && b[2][0] === val) {
        return true;
      }
      if (b[0][1] === val && b[1][1] === val && b[2][1] === val) {
        return true;
      }
      if (b[0][2] === val && b[1][2] === val && b[2][2] === val) {
        return true;
      }

      //diagonals
      if (b[0][0] === val && b[1][1] === val && b[2][2] === val) {
        return true;
      }
      if (b[0][2] === val && b[1][1] === val && b[2][0] === val) {
        return true;
      }
      return false;
    },
    tictactoeSet: function (val, x, y) {
      this.tictactoeBoard[x][y] = val;
    },
    tictactoeTurn: function (val, x, y) {
      if (this.tictactoeBoard[x][y] == " ") {
        this.tictactoeSet(val, x, y);
        if (this.tictactoeCheckForWin(val)) {
          this.tictactoeScore += 1;
          this.resetTictactoe();
          console.log("you won!");
          let newScore = {
            game: this.page,
            value: this.tictactoeScore,
            user: this.currentUser._id,
          };
          this.setScore(newScore);
        } else {
          let filledBoard = true;
          for (let i = 0; i < 3; i += 1) {
            for (let j = 0; j < 3; j += 1) {
              if (this.tictactoeBoard[i][j] == " ") {
                filledBoard = false;
              }
            }
          }
          if (!filledBoard) {
            let v = Math.round(Math.random() * 2);
            let k = Math.round(Math.random() * 2);
            while (this.tictactoeBoard[v][k] != " ") {
              v = Math.round(Math.random() * 2);
              k = Math.round(Math.random() * 2);
            }
            this.tictactoeSet("x", v, k);
            if (this.tictactoeCheckForWin("x")) {
              this.tictactoeScore = 0;
              this.resetTictactoe();
              console.log("you lost!");
            }
          }
        }
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
    this.getScores();
    console.log(this.randomTime);

    //minesweeper setup
    this.beginMinesweeperGame();
  },
}).mount("#app");
