const mongoose = require('mongoose');

const server = process.env.DB_SERVER;

const connect  = async() =>{

    try {
       const client = await mongoose.connect(server);
       console.log("conectado")
      return client;
        
    } catch (error) {
        console.log(error);
        throw new Error('Error entablar conexcion');
        
    }
};

module.exports = {
    connect
}