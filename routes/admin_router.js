var express = require('express');
var router = express.Router();
const database = require('../database/models/index');
const TrainingStaff = database.db.TrainingStaff;

/* GET index page. */
router.get('/', async function(req, res, next) {
    
  const trainingStaffs = await TrainingStaff.findAll();
  res.render('admin/index_view', { trainingStaffs: trainingStaffs });
});

/* GET create training staff page. */
router.get('/create-trainingstaff', function(req, res, next) {
  res.render('training_staff/create_view');
});

/* GET create training staff page. */
router.get('/update_trainingstaff/:id', async function(req, res, next) {
  const { id } = req.params;

  const trainingStaff = await TrainingStaff.findAll({
    where: {
      id: id
    }
  });
  // res.send(trainingStaff);
  res.render('training_staff/update_view', {trainingStaff: trainingStaff[0]});
});

/* POST add new training staff. */
router.post('/add_trainingstaff', async function(req, res, next) {
    const {username, password} = req.body;

    await TrainingStaff.create({ username: username, password: String(password) });
    res.render('training_staff/create_view');
});

/* POST delete a training staff. */
router.get('/delete_trainingstaff/:id', async function(req, res, next) {
    const { id } = req.params;

    await TrainingStaff.destroy({
        where: {
          id: id
        }
    });
    res.redirect('/admin');
});

/* POST edit a training staff. */
router.post('/edit_trainingstaff', async function(req, res, next) {
  const { id, username, password } = req.body;
  
  await TrainingStaff.update({ username: username, password: password }, {
    where: {
      id: id
    }
  }); 
  res.redirect('/admin');
});
module.exports = router;
