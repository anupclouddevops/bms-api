var mongoose = require('mongoose')

var itemsSchema = mongoose.Schema({

    id: Number,
    description: String,
    value: Number

})

const Items = mongoose.model('Items', itemsSchema)



module.exports = Items