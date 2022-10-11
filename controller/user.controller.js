const User = require('../database/user.model');
const Exercise = require('../database/excercise.model');

const formatDate = (date) =>{
    let dateArry = date.split('-')
    return dateArry = new Date(dateArry).toDateString();
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(201).json(users);
    } catch (error) {
        return res.status(500).json({ error: 'error, with DB server' });
    }
};

const createUser = async (req, res) => {
    const { username } = req.body;
    try {
        const user = new User({ username });
        const data = await user.save();

        res.status(201).json(data);

    } catch (error) {
        return res.status(500).json({ error: 'error, with DB server' });
    }
};

const createExercise = async (req, res) => {
    const { _id, date, ...body } = req.body;
    const user = req.user;
    try {

        const currenDate = new Date();
        const year = currenDate.getFullYear();
        const month = currenDate.getMonth();
        const today = currenDate.getDate();

        let fech = (date) ? date : `${year}-${month}-${today}`;
        const data = {
            ...body,
            date: fech,
            user: req.user._id
        };

        const excercise = new Exercise(data);

        const result = await excercise.save();

        const values = {
            username: user.username,
            description: result.description,
            duration: result.duration,
            date: formatDate(result.date),
            _id: user._id
        };

        res.status(201).json(values);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'error, with DB server' });
    }
};

const getLogsExercises = async (req, res) => {
    const { from, to, limit } = req.query;
    const { _id, username } = req.user;

    let query = { user: _id };
    if (from && !to) {
        query.date = { $gte: from }
    }
    else if (!from && to) {
        query.date = { $lte: to }
    }
    else if (from && to) {
        query.date = { $gte: from, $lte: to }
    };

    let limitCheck = (limit) ? limit : Number.MAX_VALUE;

    const result = await Exercise.find(query)
        .limit(limitCheck);

    const logArry = result.map((item) => {
        return {
            description: item.description,
            duration: item.duration,
            date: formatDate(item.date)
        };
    });

    const data = {
        _id,
        count: result.length,
        username,
        log: logArry
    }
    res.json(data);
};

module.exports = {
    createUser,
    createExercise,
    getUsers,
    getLogsExercises
};