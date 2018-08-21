var mongoose = require('mongoose')

var userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}

})

const User = mongoose.model('User', userSchema)

module.exports = User