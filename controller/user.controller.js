
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

    if (!username) {
        return res.status(401).json({ msg: "value empty" });
    }

    try {
        const exisUser = await User.findOne({ username });

        if (exisUser) {
            return res.status(400).json({ msj: `El user ${username} is already registered` });
        };

        const user = new User({ username });
        const data = await user.save();

        res.status(201).json(data);

    } catch (error) {
        return res.status(500).json({ error: 'error, with DB server' });
    }
};

const createExercise = async (req, res) => {

    try {

        const { _id, date, ...body } = req.body;

        let fech;
        if (!date) {
            fech = new Date().toDateString();
        } else {
            fech = new Date(date).toDateString();
        };

        const data = {
            ...body,
            date: fech,
            user: req.user._id
        };

        const excercise = new Exercise(data);

        const result = await excercise.save();

        const { $__, $isNew, _doc } = result;
        const { user, createdAt, updatedAt, __v, ...values } = _doc;

        const response = {
            username: req.user.username,
            ...values,
            _id: req.user._id
        }

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'error, with DB server' });
    }
};

module.exports = {
    createUser,
    createExercise,
    getUsers
};

