const express = require('express');

const app = express();

app.use((req, res, next) => { // middleware
  res.setHeader('x-server-date', new Date());
  return next();
});

app.get('/throw', (req, res, next) => { 
  throw new Error('Something is not right'); // synchronous: stops everything
});

app.get('/next', (req, res, next) => {
  setTimeout(() => {
    next(new Error('Something is not right')); // asynchronous
  }, 1000);
})

app.get('/', (req, res, next) => {
  return res.send('Hola from the web web server');
});

app.get('/time', (req, res, next) => {
  return res.send(new Date().toString());
})

app.get('/hello', (req, res, next) => {
  if (!req.query.name) {
    return res.status(400).end();
  }
  return res.send(`Hello ${req.query.name}`);
});

app.get('/user/:name', (req, res, next) => {
  return res.send(`Userprofile of ${req.name}`);
});

app.listen(3000);