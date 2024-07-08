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
    let user = await model.User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).send("Authentification Failure.");
    }

    req.session.userID = user._id;
    res.status(201).send(req.session);
  } catch (error) {
    console.log(error);
    res.status(400).send("Generic Error.");
  }
});

app.get("/session", AuthMiddleware, async function (req, res) {
  res.send(req.session);
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

app.get("/scores", async function (req, res) {
  try {
    let scores = await model.Score.find();

    res.send(scores);
  } catch (error) {
    res.status(404).send("Scores not found.");
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

    res.status(201).send("New score created.");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(port, function () {
  console.log(`Server is running on http://localhost:${port}...`);
});
