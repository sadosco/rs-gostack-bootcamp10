const express = require('express');

const app = express();

app.use(express.json());

const users = ["Igor", "Edgar", "Lucas"];

function checkIfUserExist(req, res, next) {
  const { index } = req.params;

  if (!users[index]) return res.status(400).json({ Error: "User not exists!" });

  req.index = index;

  next();
}

function checkIfUserIsCorrect(req, res, next) {
  const { name } = req.body;

  if (!name) return res.status(400).json({ Error: "User is not correct!" });

  req.name = name;

  next();
}

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:index', checkIfUserExist, (req, res) => {
  res.json(users[req.index]);
});

app.post('/users', checkIfUserIsCorrect, (req, res) => {
  users.push(req.name);
  res.json(users);
});

app.put('/users/:index', checkIfUserExist, checkIfUserIsCorrect, (req, res) => {
  users[req.index] = req.name;
  res.json(users);
});

app.delete('/users/:index', checkIfUserExist, (req, res) => {
  users.splice(req.index, 1);
  res.json(users);
});

app.listen(3000);