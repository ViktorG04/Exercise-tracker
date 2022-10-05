const {Schema, model} = require('mongoose');

const exceciseSchema = Schema({
    description: {
        type: String,
        require: true
    },
     duration: {
        type: Number,
        require: true
    },
      date:{
        type: String,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
},{
    versionkey:false,
    timestamps: true
});

exceciseSchema.methods.toJSON = function(){
    const {__v, _id, user, createdAt, updatedAt, date, ...excecise} = this.toObject();
    const formatDate = new Date(date).toDateString();
    excecise.date = formatDate;
    return excecise;
};

module.exports = model('Exercise', exceciseSchema);
