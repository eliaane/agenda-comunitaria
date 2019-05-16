const express = require('express');

const router = express.Router();

const eventoController = require('../controllers/evento');

router.get('/evento', function(req, res, next) {
    res.render('evento');
  });

//Request para criar um novo evento
router.post('/evento', eventoController.novoEvento);

module.exports = router;