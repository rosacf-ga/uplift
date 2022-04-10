const express = require('express');
const router = express.Router(); 
const programsCtrl = require('../controllers/programs');

//localhost:3000/programs/
router.get('/', programsCtrl.index);
router.get('/my-programs', programsCtrl.myPrograms);
router.get('/new', programsCtrl.new);
router.get('/:id',programsCtrl.show);
router.get('/:id/edit', programsCtrl.edit);
router.post('/', programsCtrl.create);
router.put('/:id', programsCtrl.update);
router.delete('/:id', programsCtrl.delete);


module.exports = router;