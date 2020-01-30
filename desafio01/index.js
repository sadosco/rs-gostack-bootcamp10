const express = require('express');

const app = express();

app.use(express.json());

const projects = [];

function checkIfUserExist(req, res, next) {
  const { id } = req.params;

  if (!projects[id]) return res.status(400).json({ Error: "User not exists!" });

  req.id = id;

  next();
}

function logRequests(req, res, next) {
  console.count("Número de requisições");

  return next();
}

app.use(logRequests);

app.get('/projects', (req, res) => {
  return res.json(projects);
});

app.get('/projects/:id', checkIfUserExist, (req, res) => {
  return res.json(projects[req.id]);
});

app.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;

  const project = {
    id,
    title,
    tasks
  };

  projects.push(project);
  return res.json(projects);
});

app.post('/projects/:id/tasks', checkIfUserExist, (req, res) => {
  const { title } = req.body;

  const project = projects.find(p => p.id == req.id);

  project.tasks.push(title);

  return res.json(projects);
});

app.put('/projects/:id', checkIfUserExist, (req, res) => {
  const { title } = req.body;

  projects[req.id].title = title;
  return res.json(projects);
});

app.delete('/projects/:id', checkIfUserExist, (req, res) => {
  projects.splice(req.id, 1);

  return res.send();
});

app.listen(3000);