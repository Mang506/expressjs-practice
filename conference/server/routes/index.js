const express = require('express');

const router = express.Router();

const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

module.exports = () => {
  router.get('/', (req, res, next) => {
    return res.render('index');
  });
  
  router.use('/speakers', speakersRoute()); // loads index for speakers page
  router.use('/feedback', feedbackRoute()); // loads index for feedback page

  return router;
};