var mongoose = require('mongoose')

var itemsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    item: {type: Object}
})

const Items = mongoose.model('Items', itemsSchema)

module.exports = Items