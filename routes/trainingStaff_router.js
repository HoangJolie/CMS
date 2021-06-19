var express = require('express');
var router = express.Router();
const database = require('../database/models/index');
// const TrainingStaff = database.db.TrainingStaff;
// const Trainer = database.db.Trainer;

/* GET index page. */
router.get('/', async function(req, res, next) {
    
  res.render('training_staff/index_view');
});