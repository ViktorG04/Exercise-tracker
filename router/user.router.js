
const { Router } = require('express');

const { createUser, createExercise, getUsers, getLogsExercises} = require('../controller/user.controller');
const { validateIdUser, validateValues, validateUserName, validateQueryParams } = require('../middlewares/validators');

const router = Router();

router.get('/users', getUsers);

router.post('/users', validateUserName, createUser);

router.post('/users/:_id?/exercises', validateValues, validateIdUser, createExercise );

router.get('/users/:_id?/logs', validateIdUser,  validateQueryParams,  getLogsExercises);

module.exports = router;