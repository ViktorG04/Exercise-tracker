const User = require("../database/user.model");
const mongoose = require("mongoose");

const validateIdUser = async (req, res, next) => {
  const { _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(401).json({ msg: "This isn't a valid Mongoose ID" });
  }

  const existIdUser = await User.findById(_id);
  if (!existIdUser) {
    return res.status(401).json({ msg: `El id:  ${_id} no existe en la db` });
  }

  req.user = existIdUser;
  next();
};

const validateValues = async (req, res, next) => {
  const { _id, description, duration, date } = req.body;

  let durationNaN = parseInt(duration);
  if (isNaN(durationNaN) || description == "" || _id == "") {
    return res.status(401).json({ msg: "fields cannot be empty" });
  }

  const validate = new Date(date);
  if (validate == "Invalid Date") {
    return res.status(400).json({ error: `${validate}` });
  }

  next();
};

const validateUserName = async (req, res, next) => {
  const { username } = req.body;
  if (!username) {
    return res.status(401).json({ msg: "Username is empty" });
  }

  const exisUser = await User.findOne({ username });

  if (exisUser) {
    return res.status(400).json({ msj: `User ${username} is already registered` });
  }

  next();
};

const validateQueryParams = async (req, res, next) => {
  const { from, to } = req.query;

  const validateFrom = new Date(from);
  const validateTo = new Date(to);

  if (validateFrom == "Invalid Date") {
    return res.status(400).json({ error: `FROM is invalidate - format YYYY-MM-DD` });
  }

  if (validateTo == "Invalid Date") {
    return res.status(400).json({ error: `TO is invalidate - format YYYY-MM-DD` });
  }

  next();
};

module.exports = {
  validateUserName,
  validateIdUser,
  validateValues,
  validateQueryParams,
};
