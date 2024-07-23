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
        palette: "",
      },

      currentUser: {},

      user: {
        name: "",
        username: "",
        region: "",
        authQuestion: "",
        authAnswer: "",
        favoriteGame: "",
        palette: "",
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
            "https://th.bing.com/th/id/R.a8f131f7b7d24a3d990dc17fe29326c1?rik=MwYHjNCretMvcg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fbattleship-png-hd-battleship-clipart-cartoon-4-2400.png&ehk=jSgaoZX7HRX55R8ptCa6Dv8UWnZwCh%2fh7smWn178KWo%3d&risl=&pid=ImgRaw&r=0",
        },
        {
          name: "Colors",
          image:
            "https://pluspng.com/img-png/png-paint-palette-paint-palette-icon-1600.png",
        },

        {
          name: "Prisoner's Dilemma",
          image:
            "https://www.clipartkey.com/mpngs/m/324-3244570_transparent-clipart-prisoner-behind-bars-cartoon.png",
        },
        {
          name: "Draw!",
          image:
            "https://th.bing.com/th/id/R.d1c236fa8d00b01451fff17c37d4bf22?rik=vN%2f%2fZT%2fz954HpQ&pid=ImgRaw&r=0",
        },
        {
          name: "Minesweeper",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Flag_icon_orange_4.svg/729px-Flag_icon_orange_4.svg.png",
        },
        { name: "groB", image: "" },
        {
          name: "Sandbox",
          image:
            "https://th.bing.com/th/id/OIP.8dAUyYj6EphGe6XQfcLo0gHaLG?rs=1&pid=ImgDetMain",
        },
        {
          name: "Slide",
          image:
            "https://th.bing.com/th/id/R.c8dde0b2e84d0a550ab209772e281b0b?rik=iGwYiJWbSifRrg&pid=ImgRaw&r=0",
        },

        {
          name: "Rock Paper Scissors",
          image:
            "https://th.bing.com/th/id/OIP.UVxX0_SDu_b5ryjTAvEETQHaFm?rs=1&pid=ImgDetMain",
        },
        { name: "Follow", image: "/Images/CoolCatTMP.png" },
        { name: "Guess The Number", image: "/Images/CoolCatTMP.png" },
      ],

      scores: [],
      lastAchievedScore: {},

      scoreRegionSearchInput: "",
      scoreGameSearchInput: "Tic Tac Toe",
      scoreUserSearchInput: "",

      gameSearchInput: "",

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
      cycleInterval: null,
      transitionInterval: null,

      //prisoners dilemma game variables
      prisonerScores: [0, 0],
      prisonBot: "Random",
      prisonerGameLength: 10 + Math.floor(Math.random() * 3),

      prisonHistory: [],

      // reaction game variables
      reactionSound: new Audio("reactionSounds/ricochet.mp3"),

      reactionGameOver: false,
      startReactionGame: true,
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
      minesweeperBoardMineChance: 8,
      minesweeperGameState: "playing",

      //Battleship game variables
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

      // dungeon crawler variables
      floorLevel: 1,
      diceBox: false,
      potionBox: false,
      potionDescription: false,
      isBattling: false,

      // first value within dice is the user's starting dice.
      dice: [
        {
          name: "Dice",
          sides: 6,
          values: [1, 2, 3, 4, 5, 6],
          rollValue: 0,
        },
      ],

      potions: [],

      doorItems: {
        // dice 6: 6, 2, 3, 2, 6
        // dice10: 0, 10
        // dice2: 2, 3
        // dice7: 0, 0, 0, 0, 7, 7, 7
        dice: [
          "dice6",
          "dice2",
          "dice7",
          "dice2",
          "dice6",
          "dice2",
          "dice7",
          "dice10",
        ],
        // enemy dice:
        // rat - 1, 2, 3
        // slime - 2, 2, 4, 4
        // goblin - 1, 2, 3, 5, 5
        // spider - 2, 2, 2, 2, 2, 8, 8, 8
        // dragon - 0, 5, 5, 5, 10, 10
        enemy: [
          "Slime",
          "Rat",
          "Goblin",
          "Rat",
          "Slime",
          "Goblin",
          "Rat",
          "Spider",
          "Goblin",
          "Spider",
          "Rat",
          "Dragon",
        ],
        // attack2 - +2 to your dice roll
        // secondChance - second chance to roll (if enemy previously beat you)
        // double - double dice roll value
        potion: [
          "attack2",
          "attack2",
          "attack2",
          "secondChance",
          "attack2",
          "attack2",
          "attack2",
          "secondChance",
          "attack2",
          "attack2",
          "attack2",
          "double",
          "attack2",
          "attack2",
        ],
      },

      randomDice: null,
      randomEnemy: null,
      randomPotion: null,
      enemyDice: null,
      // set the current dice to the default starting dice when the game is opened.
      currentDice: {
        name: "Dice",
        sides: 6,
        values: [1, 2, 3, 4, 5, 6],
        rollValue: 0,
      },

      potionEffect: false,
      // set the current potion to none when the game is opened.
      currentPotion: {
        name: "None",
      },

      diceMessage: false,
      addedDice: null,
      potionMessage: false,
      addedPotion: null,
      enemyMessage: false,

      //Tic Tac Toe Game variable
      tictactoeBoard: [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
      ],
      tictactoeScore: 0,

      //sandbox life variables
      sandboxBoard: {
        width: 32,
        height: 32,
        cells: [],
      },
      sandboxTime: null,
      selectedSandboxColor: 1,
      sandboxColors: [
        "BLACK",
        "WHITE",
        "RED",
        "BLUE",
        "GREEN",
        "ORANGE",
        "PINK",
        "PURPLE",
      ],

      sandboxRules: [
        {
          start: [
            [-1, -1, -1],
            [-1, 1, -1],
            [-1, 0, -1],
          ],
          end: [
            [-1, -1, -1],
            [-1, 0, -1],
            [-1, 1, -1],
          ],
        },
        {
          start: [
            [-1, -1, -1],
            [-1, 1, -1],
            [0, 1, -1],
          ],
          end: [
            [-1, -1, -1],
            [-1, 0, -1],
            [1, -1, -1],
          ],
        },
        {
          start: [
            [-1, -1, -1],
            [-1, 1, -1],
            [-1, 1, 0],
          ],
          end: [
            [-1, -1, -1],
            [-1, 0, -1],
            [-1, -1, 1],
          ],
        },
        {
          start: [
            [0, 1, 0],
            [-1, 4, -1],
            [-1, -1, -1],
          ],
          end: [
            [-1, 4, -1],
            [-1, 4, -1],
            [-1, -1, -1],
          ],
        },
        {
          start: [
            [1, -1, -1],
            [0, 4, -1],
            [-1, -1, -1],
          ],
          end: [
            [4, -1, -1],
            [-1, -1, -1],
            [-1, -1, -1],
          ],
        },
        {
          start: [
            [-1, -1, 1],
            [-1, 4, 0],
            [-1, -1, -1],
          ],
          end: [
            [-1, -1, 4],
            [-1, -1, -1],
            [-1, -1, -1],
          ],
        },
        {
          start: [
            [-1, -1, -1],
            [-1, 4, -1],
            [0, 0, 0],
          ],
          end: [
            [-1, -1, -1],
            [-1, 0, -1],
            [-1, 4, -1],
          ],
        },
        {
          start: [
            [0, 0, 0],
            [0, 4, 0],
            [4, 0, 0],
          ],
          end: [
            [-1, -1, -1],
            [-1, 7, -1],
            [4, -1, -1],
          ],
        },
        {
          start: [
            [-1, -1, -1],
            [-1, 7, -1],
            [0, 0, 0],
          ],
          end: [
            [-1, -1, -1],
            [-1, 0, -1],
            [-1, 7, -1],
          ],
        },
      ],

      //Slide game variables
      slideTurns: 0,
      lastSlideAction: "solve",
      slideBoard: {
        length: 5,
        cells: [],
      },

      //rock paper scissors game variables
      rpsOptions: [
        { name: "Rock", clr: "" },
        { name: "Paper", clr: "" },
        { name: "Scissors", clr: "" },
        { name: "Programmer", clr: "" },
        { name: "Spider", clr: "" },
        { name: "Sheep", clr: "" },
        { name: "Water", clr: "" },
        { name: "Megaphone", clr: "" },
        { name: "Squirrel", clr: "" },
        { name: "Frog", clr: "" },
        { name: "Hammer", clr: "" },
        { name: "Sponge", clr: "" },
        { name: "Hand", clr: "" },
        { name: "Gun", clr: "" },
        { name: "Vaccine", clr: "" },
      ],
      rpsScore: 0,

      //follow game variables
      followTop: 100,
      followLeft: 100,
      followScore: 0,
      followTimer: null,
      followTime: 0,

      //color palette variables
      colorPicker: "#739072",
      colorPaletteOptions: [
        { name: "Original", value: "#739072" },
        { name: "Sepia", value: "#938872" },
        { name: "Cave", value: "#513E3E" },
        { name: "Sea", value: "#427A65" },
        { name: "Purple", value: "#7A4275" },
        { name: "Deep Red", value: "#8D3535" },
      ],

      //guess the number game variables
      gtnDisplay: [],
      gtnNum: -1,
      gtnGameOver: false,
      gtnNumClicks: 0,
    };
  },

  methods: {
    setPage: function (newPage) {
      this.page = newPage;
      this.resetReactionGame();
      this.resetColorGame();
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
        this.applyColor();
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
      this.setScore(score);
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
            this.resetColorGame();

            let newColorsScore = {
              game: this.page,
              value: this.finalColorsScore,
              user: this.currentUser._id,
            };

            this.finishGame(newColorsScore);
            this.colorGameOver = false;
          }
        }
      }
    },

    resetColorGame: function () {
      clearInterval(this.cycleInterval);
      clearInterval(this.transitionInterval);
      this.colorGameStart = false;
      this.userInput = [];
      this.randomColor = "";
      this.colorSequence = [];
      this.activeColorsScore = 0;
    },

    cycleColors: function () {
      this.colorGameStart = true;
      let count = 0;
      this.cycleInterval = setInterval(() => {
        if (this.colorGameOver) {
          this.resetColorGame();
        }
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

        this.transitionInterval = setInterval(() => {
          this.randomColor = "#739072";
          clearInterval(this.transitionInterval);
        }, 500);
        console.log(this.randomColor);

        count++;

        if (count === this.colorSequence.length) {
          count = 0;
          clearInterval(this.cycleInterval);
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
      this.startReactionGame = false;
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
        let stageOne = setInterval(() => {
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
        let stageTwo = setInterval(() => {
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
        let stageThree = setInterval(() => {
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
        console.log("setting score...");
        this.calculateAverageReaction();
        let newScore = {
          game: this.page,
          value: -this.averageReaction,
          user: this.currentUser._id,
        };
        if (this.averageReaction > 0) {
          this.finishGame(newScore);
        }
        window.removeEventListener("keydown", this.getReaction);
        this.resetReactionGame();
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
        console.log(reaction);
      }

      if (this.averageReaction > 0) {
        this.averageReaction = this.averageReaction / 10;
      } else {
        return;
      }
    },

    resetReactionGame: function () {
      this.userReactions = [];
      this.averageReaction = 0;
      this.timeIndex = 0;
      this.reactionGameOver = false;
      this.ready = false;
      this.getSet = false;
      this.draw = false;
      this.startReactionGame = true;
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
      this.minesweeperBoardMineChance = this.minesweeperMineChance;
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
        this.minesweeperGameState === "playing" &&
        this.minesweeperBoard.cells[x][y].isHidden
      ) {
        this.minesweeperBoard.cells[x][y].isHidden = false;

        this.calculateMinesweeperValues();
        this.clearMinesweeperArea();
        if (this.minesweeperBoard.cells[x][y].isMine) {
          this.minesweeperGameState = "lost";
          let newMinesweeperScore = {
            game: this.page,
            value:
              Math.round(
                (1 +
                  this.minesweeperScore /
                    (this.minesweeperBoardMineChance / 8)) *
                  100
              ) / 100,
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
            this.battleshipBoards.opponent[i][j].backColor = "grey";
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
            if (!this.battleshipValidHover) {
              this.battleshipBoards.opponent[i][j].backColor = "RED";
            }
          }

          //player
          this.battleshipBoards.player[i][j].backColor = "lightblue";
          this.battleshipBoards.player[i][j].frontColor = "lightblue";

          if (this.battleshipBoards.player[i][j].isShip) {
            this.battleshipBoards.player[i][j].backColor = "grey";
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
            if (!this.battleshipValidHover) {
              this.battleshipBoards.player[i][j].backColor = "RED";
            }
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

    // dice game methods
    viewDice: function () {
      this.diceBox = !this.diceBox;
      this.potionBox = false;
    },

    viewPotion: function () {
      this.potionBox = !this.potionBox;
      this.diceBox = false;
    },

    togglePotionDescription: function () {
      this.potionDescription = !this.potionDescription;
    },

    displayDiceMessage: function (dice) {
      this.addedDice = dice;
      this.diceMessage = true;
      let count = 0;
      var message = setInterval(() => {
        if (count === 2) {
          this.diceMessage = false;
          clearInterval(message);
        }
        count++;
      }, 300);
    },

    displayEnemyMessage: function () {
      this.enemyMessage = true;
      let count = 0;
      var message = setInterval(() => {
        if (count === 2) {
          this.enemyMessage = false;
          clearInterval(message);
        }
        count++;
      }, 300);
    },

    displayPotionMessage: function (potion) {
      this.addedPotion = potion;
      this.potionMessage = true;
      let count = 0;
      var message = setInterval(() => {
        if (count === 2) {
          this.potionMessage = false;
          clearInterval(message);
        }
        count++;
      }, 300);
    },

    getDoorItem: function () {
      let floorItem = ["dice", "enemy"];
      let diceIndex = Math.floor(Math.random() * this.doorItems.dice.length);
      let enemyIndex = Math.floor(Math.random() * this.doorItems.enemy.length);
      let potionIndex = Math.floor(
        Math.random() * this.doorItems.potion.length
      );

      if (this.floorLevel % 5 === 1) {
        floorItem = "dice";
      } else if (
        this.floorLevel % 5 === 2 ||
        this.floorLevel % 5 === 0 ||
        this.floorLevel % 5 === 4
      ) {
        floorItem = "enemy";
      } else if (this.floorLevel % 5 === 3) {
        floorItem = "potion";
      }

      if (floorItem === "dice") {
        this.randomDice = this.doorItems.dice[diceIndex];
        console.log(this.randomDice);
        this.createDice();
      } else if (floorItem === "enemy") {
        this.randomEnemy = this.doorItems.enemy[enemyIndex];
        this.displayEnemyMessage();
        console.log(this.randomEnemy);
        this.setUpBattle();
      } else if (floorItem === "potion") {
        this.randomPotion = this.doorItems.potion[potionIndex];
        console.log(this.randomPotion);
        this.getPotion();
      }
    },

    createDice: function () {
      if (this.randomDice === "dice2") {
        let dice2 = {
          name: "Small Fry",
          sides: 2,
          values: [2, 3],
          rollValue: 0,
        };
        this.dice.push(dice2);
        this.displayDiceMessage(dice2);
        this.floorLevel++;
      }

      if (this.randomDice === "dice6") {
        let dice6 = {
          name: "Revolver",
          sides: 6,
          values: [6, 2, 3, 2, 6],
          rollValue: 0,
        };
        this.dice.push(dice6);
        this.displayDiceMessage(dice6);
        this.floorLevel++;
      }

      if (this.randomDice === "dice7") {
        let dice7 = {
          name: "Lucky 7",
          sides: 7,
          values: [0, 7, 0, 7, 0, 7, 0],
          rollValue: 0,
        };
        this.dice.push(dice7);
        this.displayDiceMessage(dice7);
        this.floorLevel++;
      }

      if (this.randomDice === "dice10") {
        let dice10 = {
          name: "50 / 50",
          sides: 2,
          values: [0, 10],
          rollValue: 0,
        };
        this.dice.push(dice10);
        this.displayDiceMessage(dice10);
        this.floorLevel++;
      }
    },

    setUpBattle: function () {
      this.isBattling = true;
      if (this.randomEnemy === "Rat") {
        this.enemyDice = {
          name: "Rat Dice",
          sides: 3,
          values: [1, 2, 3],
          rollValue: 0,
        };
        console.log(this.enemyDice.name);
      }

      if (this.randomEnemy === "Slime") {
        this.enemyDice = {
          name: "Slime Dice",
          sides: 4,
          values: [2, 2, 4, 4],
          rollValue: 0,
        };
        console.log(this.enemyDice.name);
      }

      if (this.randomEnemy === "Goblin") {
        this.enemyDice = {
          name: "Goblin Dice",
          sides: 5,
          values: [1, 2, 3, 5, 5],
          rollValue: 0,
        };
        console.log(this.enemyDice.name);
      }

      if (this.randomEnemy === "Spider") {
        this.enemyDice = {
          name: "Spider Dice",
          sides: 8,
          values: [2, 2, 2, 2, 2, 8, 8, 8],
          rollValue: 0,
        };
        console.log(this.enemyDice.name);
      }

      if (this.randomEnemy === "Dragon") {
        this.enemyDice = {
          name: "Dragon Dice",
          sides: 6,
          values: [0, 5, 5, 5, 10, 10],
          rollValue: 0,
        };
      }
    },

    // gives a certain potion to the user
    getPotion: function () {
      if (this.randomPotion === "attack2") {
        let attack2 = {
          name: "Attack Up",
          description: "+2 to your roll.",
        };
        this.potions.push(attack2);
        this.displayPotionMessage(attack2);
        this.floorLevel++;
      }

      if (this.randomPotion === "secondChance") {
        let secondChance = {
          name: "Retake",
          description:
            "Protects the user from losing their current dice for a single roll.",
        };
        this.potions.push(secondChance);
        this.displayPotionMessage(secondChance);
        this.floorLevel++;
      }

      if (this.randomPotion === "double") {
        let double = {
          name: "Double Up",
          description: "Double your roll.",
        };
        this.potions.push(double);
        this.displayPotionMessage(double);
        this.floorLevel++;
      }
    },

    battleEnemy: function () {
      let userRoll = Math.floor(Math.random() * this.currentDice.values.length);
      let enemyRoll = Math.floor(Math.random() * this.enemyDice.values.length);

      let rollCount = 0;

      let rollInterval = setInterval(() => {
        this.currentDice.rollValue = this.currentDice.values[userRoll];
        this.enemyDice.rollValue = this.enemyDice.values[enemyRoll];

        if (rollCount > 10) {
          clearInterval(rollInterval);
          // check to see if the user is using any potions for their roll and apply their effects accordingly.
          console.log(`original roll: ${this.currentDice.rollValue}`);

          if (this.currentPotion.name === "Attack Up") {
            this.potionEffect = true;
            this.currentDice.rollValue += 2;
            let count = 0;

            let displayPotion = setInterval(() => {
              count++;
              if (count === 2) {
                clearInterval(displayPotion);
                this.potionEffect = false;
                this.potions.splice(
                  this.potions.indexOf(this.currentPotion),
                  1
                );
                this.currentPotion = {
                  name: "None",
                };
                this.compareRoll();
                this.potions.splice(
                  this.potions.indexOf(this.currentPotion),
                  1
                );
              }
            }, 500);
          } else if (this.currentPotion.name === "Double Up") {
            this.potionEffect = true;
            this.currentDice.rollValue *= 2;
            let count = 0;

            let displayPotion = setInterval(() => {
              count++;
              if (count === 2) {
                clearInterval(displayPotion);
                this.potionEffect = false;
                this.potions.splice(
                  this.potions.indexOf(this.currentPotion),
                  1
                );
                this.currentPotion = {
                  name: "None",
                };
                this.compareRoll();
              }
            }, 500);
          } else {
            this.compareRoll();
          }
        }
        rollCount++;
      }, 50);
    },

    compareRoll: function () {
      if (this.currentDice.rollValue > this.enemyDice.rollValue) {
        this.dice.push(this.enemyDice);
        this.currentDice.rollValue = 0;
        this.enemyDice.rollValue = 0;
        this.isBattling = false;
        this.floorLevel++;
      } else if (
        this.enemyDice.rollValue >= this.currentDice.rollValue &&
        this.currentPotion.name !== "Retake"
      ) {
        this.removeDice();
        this.currentDice = this.dice[0];
      } else {
        this.potionEffect = true;
        let count = 0;
        let displayPotion = setInterval(() => {
          count++;
          if (count === 2) {
            clearInterval(displayPotion);
            this.potionEffect = false;
            this.potions.splice(this.potions.indexOf(this.currentPotion), 1);
            this.currentPotion = {
              name: "None",
            };
          }
        }, 500);
        return;
      }
    },

    resetGrobGame: function () {
      // reset everything back to its default value (defined in the data section of vue)
      this.floorLevel = 1;
      this.diceBox = false;
      this.potionBox = false;
      this.isBattling = false;

      this.dice = [
        {
          name: "Dice",
          sides: 6,
          values: [1, 2, 3, 4, 5, 6],
          rollValue: 0,
        },
      ];

      this.potions = [];

      this.randomDice = null;
      this.randomEnemy = null;
      this.randomPotion = null;
      this.enemyDice = null;

      this.currentDice = {
        name: "Dice",
        sides: 6,
        values: [1, 2, 3, 4, 5, 6],
        rollValue: 0,
      };
      this.potionEffect = false;
      this.currentPotion = {
        name: "None",
      };

      this.diceMessage = false;
      this.addedDice = null;
      this.potionMessage = false;
      this.addedPotion = null;
      this.enemyMessage = false;
    },

    removeDice: function () {
      this.dice.splice(this.dice.indexOf(this.currentDice), 1);
      if (this.dice.length === 0) {
        let newScore = {
          game: this.page,
          value: this.floorLevel,
          user: this.currentUser._id,
        };
        this.finishGame(newScore);
        this.resetGrobGame();
      } else {
        this.currentDice.rollValue = 0;
        this.enemyDice.rollValue = 0;
      }
    },

    setCurrentDice: function (index) {
      this.currentDice = this.dice[index];
      console.log(this.currentDice);
    },

    setCurrentPotion: function (index) {
      this.currentPotion = this.potions[index];
      console.log(`Current Potion: ${this.currentPotion.name}`);
    },

    //sandbox methods
    resetSandboxBoard: function () {
      this.sandboxBoard.cells = [];
      for (let i = 0; i < this.sandboxBoard.height; i += 1) {
        this.sandboxBoard.cells.push([]);
        for (let j = 0; j < this.sandboxBoard.width; j += 1) {
          if (i < 4) {
            this.sandboxBoard.cells[this.sandboxBoard.cells.length - 1].push(1);
          } else {
            this.sandboxBoard.cells[this.sandboxBoard.cells.length - 1].push(0);
          }
        }
      }
    },
    simulateSandbox: function () {
      for (let b = 0; b < 64; b += 1) {
        let x = Math.round(Math.random() * (this.sandboxBoard.width - 1));
        let y = Math.round(Math.random() * (this.sandboxBoard.height - 1));
        let validRule = null;
        let targetX;
        let targetY;
        for (let r = 0; r < this.sandboxRules.length; r += 1) {
          let rule = this.sandboxRules[r];
          if (rule.start[1][1] == this.sandboxBoard.cells[x][y]) {
            validRule = rule;
            targetX = x;
            targetY = y;
          }

          if (validRule != null) {
            let go = true;
            for (let i = 0; i < validRule.start.length; i += 1) {
              for (let j = 0; j < validRule.start[i].length; j += 1) {
                if (validRule.start[i][j] != -1) {
                  let calcX = targetX + (i - 1);
                  let calcY = targetY + (j - 1);
                  if (
                    calcX > -1 &&
                    calcY > -1 &&
                    calcX <= this.sandboxBoard.width - 1 &&
                    calcY <= this.sandboxBoard.height - 1
                  ) {
                    if (
                      validRule.start[i][j] !=
                      this.sandboxBoard.cells[calcX][calcY]
                    ) {
                      go = false;
                    }
                  } else {
                    if (validRule.start[i][j] != -1) {
                      go = false;
                    }
                  }
                }
              }
            }
            if (go) {
              for (let i = 0; i < validRule.end.length; i += 1) {
                for (let j = 0; j < validRule.end[i].length; j += 1) {
                  if (validRule.end[i][j] != -1) {
                    let calcX = targetX + (i - 1);
                    let calcY = targetY + (j - 1);
                    if (
                      calcX > -1 &&
                      calcY > -1 &&
                      calcX <= this.sandboxBoard.width - 1 &&
                      calcY <= this.sandboxBoard.height - 1
                    ) {
                      this.sandboxBoard.cells[calcX][calcY] =
                        validRule.end[i][j];
                    }
                  }
                }
              }
              break;
            }
          }
        }
      }
    },
    toggleSandboxSim: function (type) {
      if (type === "start") {
        this.sandboxTime = setInterval(() => {
          this.simulateSandbox();
        }, 0);
      } else {
        clearInterval(this.sandboxTime);
        this.sandboxTime = null;
      }
    },
    addSandboxRule: function () {
      let obj = {
        start: [
          [-1, -1, -1],
          [-1, -1, -1],
          [-1, -1, -1],
        ],
        end: [
          [-1, -1, -1],
          [-1, -1, -1],
          [-1, -1, -1],
        ],
      };
      this.sandboxRules.push(obj);
    },
    removeSandboxRule: function (indx) {
      this.sandboxRules.splice(indx, 1);
    },
    setSandboxRuleCell: function (btn, indx, time, x, y) {
      if (btn == 0) {
        if (time == "start") {
          this.sandboxRules[indx].start[x][y] = this.selectedSandboxColor;
        }
        if (time == "end") {
          this.sandboxRules[indx].end[x][y] = this.selectedSandboxColor;
        }
      }
      if (btn == 1) {
        if (time == "start") {
          this.sandboxRules[indx].start[x][y] = -1;
        }
        if (time == "end") {
          this.sandboxRules[indx].end[x][y] = -1;
        }
      }
    },
    setSandboxColor: function (indx) {
      this.selectedSandboxColor = indx - 1;
    },
    clickSandboxCell(btn, x, y) {
      for (let i = 0; i < 3; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          let calcX = x + (i - 1);
          let calcY = y + (j - 1);
          if (
            calcX > -1 &&
            calcY > -1 &&
            calcX <= this.sandboxBoard.width - 1 &&
            calcY <= this.sandboxBoard.height - 1
          ) {
            if (btn == 1) {
              this.sandboxBoard.cells[calcX][calcY] = 0;
            } else {
              if (this.sandboxBoard.cells[calcX][calcY] <= 0) {
                this.sandboxBoard.cells[calcX][calcY] =
                  this.selectedSandboxColor;
              }
            }
          }
        }
      }
    },

    //Slide game methods
    resetSlideGame: function () {
      this.slideBoard.cells = [];
      for (let i = 0; i < this.slideBoard.length * 7; i += 1) {
        if (i == this.slideBoard.length * 7 - 1) {
          this.slideBoard.cells.push({ value: -1, color: "#0000" });
          break;
        }
        let clr = "#4f6f52";
        if (i % 2 == 0) {
          clr = "#86a789";
        }
        this.slideBoard.cells.push({ value: i, color: clr });
      }
      this.slideTurns = 0;
      this.lastSlideAction = "solve";
    },
    moveSlideCell: function (indx) {
      let currentCell = this.slideBoard.cells[indx];
      let up = -1;
      let down = -1;
      let left = -1;
      let right = -1;
      if (currentCell.value != -1) {
        if (indx - 7 > -1) {
          up = indx - 7;
        }
        if (indx + 7 < this.slideBoard.length * 7) {
          down = indx + 7;
        }
        if (indx % 7 > 0) {
          left = indx - 1;
        }
        if (indx % 7 < 6) {
          right = indx + 1;
        }
      }
      if (up != -1) {
        if (this.slideBoard.cells[up].value == -1) {
          let tmp = this.slideBoard.cells[up];
          this.slideBoard.cells[up] = currentCell;
          this.slideBoard.cells[indx] = tmp;
          this.slideTurns += 1;
        }
      }
      if (down != -1) {
        if (this.slideBoard.cells[down].value == -1) {
          let tmp = this.slideBoard.cells[down];
          this.slideBoard.cells[down] = currentCell;
          this.slideBoard.cells[indx] = tmp;
          this.slideTurns += 1;
        }
      }
      if (left != -1) {
        if (this.slideBoard.cells[left].value == -1) {
          let tmp = this.slideBoard.cells[left];
          this.slideBoard.cells[left] = currentCell;
          this.slideBoard.cells[indx] = tmp;
          this.slideTurns += 1;
        }
      }
      if (right != -1) {
        if (this.slideBoard.cells[right].value == -1) {
          let tmp = this.slideBoard.cells[right];
          this.slideBoard.cells[right] = currentCell;
          this.slideBoard.cells[indx] = tmp;
          this.slideTurns += 1;
        }
      }

      //check for win
      let isSolved = true;
      if (this.lastSlideAction == "scramble" && this.slideTurns > 2) {
        for (let i = 0; i < this.slideBoard.length * 7; i += 1) {
          let iCell = this.slideBoard.cells[i];
          if (iCell.value != i && iCell.value != -1) {
            isSolved = false;
          }
        }
      } else {
        isSolved = false;
      }

      if (isSolved && this.lastSlideAction == "scramble") {
        let newScore = {
          game: this.page,
          value: -this.slideTurns * 50 + 50000,
          user: this.currentUser._id,
        };
        this.setScore(newScore);
        console.log("win!");
        this.resetSlideGame();
      }
    },
    scrambleSlideGame: function () {
      let emptyIndx;
      for (let i = 0; i < this.slideBoard.length * 7; i += 1) {
        if (i == this.slideBoard.length * 7 - 1) {
          emptyIndx = i;
        }
      }
      for (let i = 0; i < 50000; i += 1) {
        let randDir = Math.round(Math.random() * 3);
        let newIndx = this.slideBoard.length * 7 - 1;
        if (emptyIndx - 7 > -1 && randDir == 0) {
          newIndx = emptyIndx - 7;
        }
        if (emptyIndx + 7 < this.slideBoard.length * 7 && randDir == 1) {
          newIndx = emptyIndx + 7;
        }
        if (emptyIndx % 7 > 0 && randDir == 2) {
          newIndx = emptyIndx - 1;
        }
        if (emptyIndx % 7 < 6 && randDir == 3) {
          newIndx = emptyIndx + 1;
        }
        emptyIndx = newIndx;
        this.moveSlideCell(emptyIndx);
        this.slideTurns = 0;
      }
      this.lastSlideAction = "scramble";
    },

    //Rock Paper Scissors Game Methods
    rpsTurn: function (indx) {
      let userChoice = indx;
      let opponentChoice = Math.round(
        Math.random() * (this.rpsOptions.length - 1)
      );

      this.rpsHover(userChoice);

      if (this.rpsOptions[opponentChoice].clr == "GREEN") {
        this.rpsScore += 1;
        let newScore = {
          game: this.page,
          value: this.rpsScore,
          user: this.currentUser._id,
        };
        this.setScore(newScore);
      }
      if (this.rpsOptions[opponentChoice].clr == "RED") {
        this.rpsScore -= 1;
      }

      this.rpsOptions[opponentChoice].clr = "BLUE";
    },

    rpsHover: function (indx) {
      let userChoice = indx;
      for (let i = 0; i < this.rpsOptions.length; i += 1) {
        this.rpsOptions[i].clr = "";

        let pos = userChoice + 1;
        this.rpsOptions[i].clr = "RED";
        for (let j = 0; j < (this.rpsOptions.length - 1) / 2; j += 1) {
          if (pos > this.rpsOptions.length - 1) {
            pos = 0;
          }
          this.rpsOptions[pos].clr = "GREEN";

          pos += 1;
        }
        this.rpsOptions[userChoice].clr = "";
      }
    },

    //follow game methods
    followClick: function () {
      if (this.followTimer) {
        this.followScore += 1;
        this.followLeft = 5 + Math.random() * 450;
        this.followTop = 5 + Math.random() * 450;
      } else {
        this.followTimer = setInterval(() => {
          this.followMove();
        }, 1000);
      }
    },
    followMove: function () {
      this.followTime += 1;
      if (this.followTimer) {
        this.followLeft = 5 + Math.random() * 450;
        this.followTop = 5 + Math.random() * 450;

        let newScore = {
          game: this.page,
          value: this.followScore,
          user: this.currentUser._id,
        };
        if (this.followTime > 20) {
          this.setScore(newScore);
          this.followScore = 0;
          this.followTime = 0;
          clearInterval(this.followTimer);
          this.followTimer = null;
        }
      }
    },

    //color picker methods
    applyColor: function () {
      function splitColor(hex) {
        return {
          r: parseInt(hex.substr(1, 2), 16),
          g: parseInt(hex.substr(3, 2), 16),
          b: parseInt(hex.substr(5, 2), 16),
        };
      }

      function concatColor(obj) {
        return (
          "#" + obj.r.toString(16) + obj.g.toString(16) + obj.b.toString(16)
        );
      }
      let hexString = this.currentUser.palette.toString(16);

      let extraLightSplit = splitColor(hexString);
      extraLightSplit.r += 95;
      extraLightSplit.g += 83;
      extraLightSplit.b += 86;

      let lightSplit = splitColor(hexString);
      lightSplit.r += 19;
      lightSplit.g += 23;
      lightSplit.b += 23;

      let medSplit = splitColor(hexString);

      let darkSplit = splitColor(hexString);
      darkSplit.r -= 36;
      darkSplit.g -= 33;
      darkSplit.b -= 32;

      let cssRoot = document.querySelector(":root");
      cssRoot.style.setProperty(
        "--extra-light-green",
        concatColor(extraLightSplit)
      );
      cssRoot.style.setProperty("--light-green", concatColor(lightSplit));
      cssRoot.style.setProperty("--med-green", concatColor(medSplit));
      cssRoot.style.setProperty("--dark-green", concatColor(darkSplit));
    },

    //guess the number methods
    gtnClick: function (num) {
      if (this.gtnNum == -1) {
        this.gtnNum = Math.round(Math.random() * 99);
        for (let i = 0; i < 100; i += 1) {
          this.gtnDisplay[i] = "#0000";
        }
      } else {
        this.gtnNumClicks += 1;
      }
      for (let i = 0; i < 100; i += 1) {
        if (!this.gtnDisplay[i]) {
          this.gtnDisplay[i] = "#0000";
        }
        if (num > this.gtnNum) {
          if (i >= num) {
            this.gtnDisplay[-i + 99] = "#d00";
          }
        }
        if (num < this.gtnNum) {
          if (i <= num) {
            this.gtnDisplay[-i + 99] = "#d00";
          }
        }
      }
      if (num == this.gtnNum) {
        this.gtnNum = -1;
        let newScore = {
          game: this.page,
          value: -this.gtnNumClicks + 100,
          user: this.currentUser._id,
        };
        this.setScore(newScore);
        this.gtnNumClicks = 0;
        this.gtnDisplay[-num + 99] = "#0f0";
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
    filteredGames: function () {
      let filteredGames = this.games.filter((currentGame) => {
        return currentGame.name
          .toLowerCase()
          .includes(this.gameSearchInput.toLowerCase());
      });
      return filteredGames;
    },
  },

  created: function () {
    this.getSession();
    this.getScores();

    //minesweeper setup
    this.beginMinesweeperGame();

    //battleship setup
    this.resetBattleshipBoard();

    //sandbox setup
    this.resetSandboxBoard();

    //slide game setup
    this.resetSlideGame();
  },
}).mount("#app");
