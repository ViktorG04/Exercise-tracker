const mongoose = require('mongoose');

const server = process.env.DB_SERVER;

const connect = async () => {

    try {
        const client = await mongoose.connect(server);
        return client;
    } catch (error) {
        console.error(error);
        throw new Error('connection error');
    }
};

module.exports = { connect };