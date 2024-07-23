const express = require("express");
const cors = require("cors");
const model = require("./model");
const session = require("express-session");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "qwertyuiopasdfghjklzxcvbnm12345678909uytrewqasdfvbnnhtresdcv",
    saveUninitialized: true,
    resave: false,
  })
);

async function AuthMiddleware(req, res, next) {
  if (req.session && req.session.userID) {
    let user = await model.User.findOne({ _id: req.session.userID });

    if (!user) {
      return res.status(401).send("Authentification failure.");
    }
    req.user = user;

    next();
  } else {
    return res
      .status(401)
      .send("Authentification failure (Could not find user cookie).");
  }
}

app.post("/session", async function (req, res) {
  try {
    let user = await model.User.findOne({
      username: req.body.username,
      authAnswer: req.body.authAnswer,
    });
    if (!user) {
      return res.status(401).send("Authentification Failure.");
    }

    req.session.name = user.name;
    req.session.userID = user._id;
    res.status(201).send(req.session);
  } catch (error) {
    console.log(error);
    res.status(400).send("Generic Error.");
  }
});

app.get("/session", AuthMiddleware, async function (req, res) {
  res.status(200).send(req.session);
});

app.delete("/session", function (req, res) {
  req.session.userID = undefined;
  res.status(204).send();
});

app.get("/users", async function (req, res) {
  try {
    let users = await model.User.find();

    res.send(users);
  } catch (error) {
    res.status(404).send("Users not found.");
  }
});

app.get("/users/:userID", async function (req, res) {
  try {
    let user = await model.User.findOne({ _id: req.params.userID }).populate(
      "scores"
    );
    if (!user) {
      res.status(404).send("User not found.");
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
});

app.get("/users/username/:username", async function (req, res) {
  try {
    let user = await model.User.findOne({
      username: req.params.username,
    }).populate("scores");
    if (!user) {
      res.status(404).send("User not found.");

      return;
    }
    res.send(user);
  } catch (error) {
    res.status(404).send("User not found");
  }
});

app.post("/users", async function (req, res) {
  try {
    let newUser = await new model.User({
      name: req.body.name,
      username: req.body.username,
      region: req.body.region,
      authQuestion: req.body.authQuestion,
      authAnswer: req.body.authAnswer,
      favoriteGame: req.body.favoriteGame,
      score: req.body.scores,
      palette: req.body.palette,
    });

    const error = await newUser.validateSync();

    if (error) {
      res.status(422).send(error);
      console.log(error);
      return;
    }

    await newUser.save();

    res.status(201).send("New user created.");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.put("/users/:userID", AuthMiddleware, async function (req, res) {
  try {
    let user = await model.User.findOne({ _id: req.params.userID });
    if (!user) {
      res.status(404).send("User not found.");
      return;
    }
    user.name = req.body.name;
    user.username = req.body.username;
    user.region = req.body.region;
    user.authQuestion = req.body.authQuestion;
    user.authAnswer = req.body.authAnswer;
    user.favoriteGame = req.body.favoriteGame;
    user.scores = req.body.scores;
    user.palette = req.body.palette;

    const error = await user.validateSync();

    if (error) {
      res.status(422).send(error);
      console.log(error);
      return;
    }

    await user.save();
    res.status(204).send();
  } catch (error) {
    res.status(422).send(error);
  }
});

app.delete("/users/:userID", AuthMiddleware, async function (req, res) {
  try {
    let isDeleted = await model.User.findOneAndDelete({
      _id: req.params.userID,
    });
    if (!isDeleted) {
      res.status(404).send("User Not Found");
      return;
    }
    res.status(204).send("Removed");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.get("/scores", async function (req, res) {
  try {
    let scores = await model.Score.find().populate("user");

    res.send(scores);
  } catch (error) {
    res.status(404).send("Scores not found.");
  }
});

app.get("/scores/:scoreID", async function (req, res) {
  try {
    let user = await model.Score.findOne({ _id: req.params.scoreID }).populate(
      "user"
    );
    if (!user) {
      res.status(404).send("Score not found.");
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(404).send("Score not found");
  }
});

app.post("/scores", async function (req, res) {
  try {
    let newScore = await new model.Score({
      game: req.body.game,
      value: req.body.value,
      user: req.body.user,
    });

    const error = await newScore.validateSync();

    if (error) {
      res.status(422).send(error);
      console.log(error);
      return;
    }

    await newScore.save();

    res.status(201).send(newScore);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.put("/scores/:scoreID", AuthMiddleware, async function (req, res) {
  try {
    let score = await model.Score.findOne({ _id: req.params.scoreID });
    if (!score) {
      res.status(404).send("Score not found.");
      return;
    }
    score.user = req.body.user;
    score.game = req.body.game;
    score.value = req.body.value;

    const error = await score.validateSync();

    if (error) {
      res.status(422).send(error);
      console.log(error);
      return;
    }

    await score.save();
    res.status(204).send();
  } catch (error) {
    res.status(422).send(error);
  }
});

app.delete("/scores/:scoreID", AuthMiddleware, async function (req, res) {
  try {
    let isDeleted = await model.Score.findOneAndDelete({
      _id: req.params.scoreID,
    });
    if (!isDeleted) {
      res.status(404).send("Score Not Found");
      return;
    }
    res.status(204).send("Removed");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}...`);
});
