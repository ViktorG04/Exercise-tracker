const User = require('../database/user.model')
const mongoose = require('mongoose');


const validateIdUser = async (req, res, next) => {

    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
       return  res.status(401).json({ msg: "This isn't a valid Mongoose ID" });
    }

    const existIdUser = await User.findById(_id);
    if (!existIdUser) {
       return res.status(401).json({ msg: `El id:  ${_id} no existe en la db` });
    }

    req.user = existIdUser;
    next();
};


const validateValues = async (req, res, next) =>{

    const {_id, description, duration}  = req.body;

    let durationNaN = parseInt(duration);

    if(!isNaN(durationNaN) || description == '' || _id == ''){
        return res.status(401).json({msg: "fields cannot be empty"});
    }

    next();
}

module.exports = {
    validateIdUser,
    validateValues
}