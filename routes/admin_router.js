var express = require('express');
var router = express.Router();
const database = require('../database/models/index');
const TrainingStaff = database.db.TrainingStaff;

/* GET create training staff page. */
router.get('/create-trainingstaff', function(req, res, next) {
  res.render('training_staff/create_view', { title: 'Express' });
});

/* POST add new training staff. */
router.post('/add_trainingstaff', async function(req, res, next) {
    const {username, password} = req.body;
    console.log(password);
    
    await TrainingStaff.create({ username: username, password: String(password) });
    res.render('training_staff/create_view');
});

module.exports = router;
