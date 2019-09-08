const express = require('express');

const router = express.Router();

module.exports = () => { // returns all speakers
  router.get('/', (req, res, next) => {
    return res.render('speakers', {
      page: "All speakers",
    }); // accesses view/speakers/index
  });

  router.get('/:name', (req, res, next) => { // returns individual speaker
    return res.render('speakers/detail', {
      page: req.params.name,
    });
  });

  return router;
};