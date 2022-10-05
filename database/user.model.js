const {Schema, model} = require('mongoose');

const userSchema = Schema({
    username: {
        type: String,
        require: true
    }
},{
    versionkey:false,
    timestamps: true
});


userSchema.methods.toJSON = function(){
    const {__v, createdAt, updatedAt, ...person} = this.toObject();
    return person;
};

module.exports =  model('User', userSchema);