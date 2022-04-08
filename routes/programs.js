const express = require('express');
const router = express.Router(); 
const programsCtrl = require('../controllers/programs');

//localhost:3000/programs/
router.get('/', programsCtrl.index);
router.get('/new', programsCtrl.new);

module.exports = router;