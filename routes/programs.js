const express = require('express');
const router = express.Router(); 
const programsCtrl = require('../controllers/programs');
const isLoggedIn = require('../config/auth');

//localhost:3000/programs/
router.get('/', isLoggedIn, programsCtrl.index);
router.get('/my-programs', isLoggedIn, programsCtrl.myPrograms);
router.get('/new', isLoggedIn, programsCtrl.new);
router.get('/:id', isLoggedIn, programsCtrl.show);
router.get('/:id/edit', isLoggedIn, programsCtrl.edit);
router.post('/', programsCtrl.create);
router.put('/:id', programsCtrl.update);
router.delete('/:id', programsCtrl.delete);


module.exports = router;