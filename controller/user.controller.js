const User = require('../database/user.model');
const Exercise = require('../database/excercise.model');

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

        let fech = `${year}-${month}-${today}`;

        if (date) {
            fech = date
        };

        const data = {
            ...body,
            date: fech,
            user: req.user._id
        };

        const excercise = new Exercise(data);

        const result = await excercise.save();
        const formatDate = new Date(result.date).toDateString();
        const values = {
            username: user.username,
            description: result.description,
            duration: result.duration,
            date: formatDate,
            _id: user._id
        };

        res.status(201).json(values);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'error, with DB server' });
    }
};

const getLogsExercises = async (req, res) => {
    const { from, to, limit = 10 } = req.query;
    const { _id, username } = req.user;

    const [count, log] = await Promise.all([
        Exercise.countDocuments(),
        Exercise.find({date : {$gte: from, $lt: to}
        })
        .limit(limit)
        .sort({date: 1})
    ]);

    const result = {
        username: username,
        count: count,
        _id: _id,
        log: log
    };

    res.status(200).json(result);
};

module.exports = {
    createUser,
    createExercise,
    getUsers,
    getLogsExercises
};