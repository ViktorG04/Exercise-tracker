
const { Router } = require('express');

const { createUser, createExercise, getUsers, } = require('../controller/user.controller');
const { validateIdUser, validateValues } = require('../middlewares/validators');

const router = Router();

router.get('/users', getUsers);

router.post('/users', createUser);

router.post('/users/:_id?/exercises', validateValues, validateIdUser, createExercise );

module.exports = router;