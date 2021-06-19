var express = require('express');
var router = express.Router();
const database = require('../database/models/index');
const Trainee = database.db.Trainee;
// const Trainer = database.db.Trainer;

/* GET index page. */
router.get('/', async function(req, res, next) {
  const trainees = await Trainee.findAll();

  res.render('training_staff/index_view', {trainees: trainees});
});

/* GET create trainee page. */
router.get('/create_trainee', async function(req, res, next) {
    res.render('trainee/create_view');
});

/* GET delete a training staff. */
router.get('/delete_trainee/:id', async function(req, res, next) {
  const { id } = req.params;

  await Trainee.destroy({
      where: {
        id: id
      }
  });
  res.redirect('/training_staff');
});

/* GET update training staff page. */
router.get('/update_trainee/:id', async function(req, res, next) {
  const { id } = req.params;

  const trainee = await Trainee.findAll({
    where: {
      id: id
    }
  });
  // res.send(trainingStaff);
  res.render('trainee/update_view', {trainee: trainee[0]});
});

/* POST add new a trainee. */
router.post('/add_trainee', async function(req, res, next) {
    const {
        username,
        password,
        fullname,
        age,
        education,
        skill,
        english_cert,
    } = req.body;

    await Trainee.create(
        { 
          username: username,
          password: String(password),
          fullname: fullname,
          age: Number(age),
          education: education,
          skill: skill,
          english_cert: english_cert
        }
    );

    res.redirect('/training_staff');
});

/* POST edit a trainee. */
router.post('/edit_trainee', async function(req, res, next) {
  const {
    id,
    username,
    password,
    fullname,
    age,
    education,
    skill,
    english_cert,
  } = req.body;
  
  await Trainee.update(
    { 
      username: username,
      password: String(password),
      fullname: fullname,
      age: age,
      education: education,
      skill: skill,
      english_cert: english_cert,
    }, {
      where: {
        id: id
      }
    }
  );

  res.redirect('/training_staff');
});

module.exports = router;
