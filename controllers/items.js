var Items = require('../modals/items')
const mongoose = require('mongoose');

const getItems = (req, res) => {
    Items.find({}).exec().then((items) => {
        console.log(items)
        if(items.length > 0) {
            res.status(200).json(items)
        } else {
            res.status(404).json({
                message: 'No items found'
            })
        }
    })
}

const createItem = (req, res, next) => {
    var type = req.body.type
    var des = req.body.description
    var val = req.body.value

    // Create Income or Expense Object based on type
    let newItem = new Items({
        _id: new mongoose.Types.ObjectId(),
        item: {
            type: type,
            description: des,
            value: val
        }
    })
    newItem.save()
    .then((result) => {
        res.status(200).json({
        message:`New item of type ${type} has been created successfully`,
        newItem: newItem
        })
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
        message:`Error while creating the new Item, ${error}`
        })
    })
}

const deleteItem = (req, res) => {
    // Fetch the ID of the item from the request
    var id = req.params.id
    console.log(id)

    Items.findOneAndRemove({'_id':id })
    .exec()
    .then((result)=>{
        console.log(result)
        if(result !== null) {
            res.status(200).json({
                message: `Item with has been deleted successfully`,
                item: result
            })
        } else {
            res.status(200).json({
                message: `${id} Item does not exist`
            })
        }

    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message: `Item with ID ${id} could not be deleted`
        })
    })

}

module.exports = {
    createItem,
    getItems,
    deleteItem
}