var express = require('express');
var router = express.Router();
const database = require('../database/models/index');
const TrainingStaff = database.db.TrainingStaff;
const Trainer = database.db.Trainer;

/* GET index page. */
router.get('/', async function(req, res, next) {
    
  const trainingStaffs = await TrainingStaff.findAll();

  const trainers = await Trainer.findAll();

  const data = {
    trainingStaffs: trainingStaffs,
    trainers: trainers,
  }
  res.render('admin/index_view', data);
});

//------------------TRAINING STAFF-----------------------//
/* GET create training staff page. */
router.get('/create-trainingstaff', function(req, res, next) {
  res.render('training_staff/create_view');
});

/* GET update training staff page. */
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
    res.redirect('/admin');
});

/* GET delete a training staff. */
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



//------------------TRAINER-----------------------//
/* GET create trainer page. */
router.get('/create_trainer', function(req, res, next) {
  res.render('trainer/create_view');
});

/* POST add new trainer. */
router.post('/add_trainer', async function(req, res, next) {
  const {
    username,
    password,
    trainer_type,
    working_place,
    email,
    fullname,
    phone,
  } = req.body;

  await Trainer.create(
    { 
      username: username,
      password: String(password),
      type: trainer_type,
      working_place: working_place,
      email: email,
      fullname: fullname,
      phone: phone,
    }
  );
  res.redirect('/admin');
});

/* GET delete a trainer. */
router.get('/delete_trainer/:id', async function(req, res, next) {
  const { id } = req.params;

  await Trainer.destroy({
      where: {
        id: id
      }
  });
  res.redirect('/admin');
});

/* GET update trainer page. */
router.get('/update_trainer/:id', async function(req, res, next) {
  const { id } = req.params;

  const trainer = await Trainer.findAll({
    where: {
      id: id
    }
  });
  res.render('trainer/update_view', {trainer: trainer[0]});
});

/* POST edit a training staff. */
router.post('/edit_trainer', async function(req, res, next) {

  const {
    id,
    username,
    password,
    trainer_type,
    working_place,
    email,
    fullname,
    phone,
  } = req.body;
  
  await Trainer.update(
    { 
      username: username,
      password: String(password),
      type: trainer_type,
      working_place: working_place,
      email: email,
      fullname: fullname,
      phone: phone,
    }, {
      where: {
        id: id
      }
    }
  ); 
  res.redirect('/admin');
});

module.exports = router;

