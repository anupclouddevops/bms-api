var data = require('../modals/data')
var totals = require('../controllers/totals')

var Expense = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1
};

const calcPercentage = (item, totalIncome) => {
    
    if(totalIncome > 0) {
        item.percentage = Math.floor((item.value / totalIncome ) * 100 );
    } else {
        item.percentage = -1;
    }
}

var Income = function(id, description, value){
    this.id = id;
    this.description = description;
    this.value = value;
};


const generateID = (type) => {
    var n;
    var ID = 0;
  
    // Determine the ID of the new Item
    n = data.allItems[type].length
    if (n > 0) {
      ID = data.allItems[type][n - 1].id + 1
    }
    return ID;
  }

const calculatePercentages = () => {

    // Calculate the percentages for each expense item
    var totalIncome = data.totals.inc;

    data.allItems.exp.forEach((item) => {
        calcPercentage(item, totalIncome);
    });

}

const getItems = (req, res) => {
    res.json(data.allItems)
}

const createItem = (req, res) => {
    var type = req.body.type
    var des = req.body.description
    var val = req.body.value

    console.log(type,des,val)
    
    // Generate ID based on type
    const ID = generateID(type)

    // Create Income or Expense Object
    if (type === 'exp') {
        newItem = new Expense(ID, des, val)
    } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
    }
    
    // Add item to data model
    data.allItems[type].push(newItem);

    // Update the totals
    totals.calculateTotals(type)
    calculatePercentages()

    // Send response
    res.json({
        message:`New item of type ${type} has been created successfully with ID = ${ID}`,
        newItem: newItem
    })
}

const deleteItem = (req, res) => {
    // Fetch the ID of the item from teh request
    var type = req.params.type
    var id = req.params.id

    var ids, index;
    // Calculate the INDEX of the item to be deleted
    ids = data.allItems[type].map(function(current){    
        return current.id;
    });
    
    index = ids.indexOf(id);
            
    // Delete the item from the array
    data.allItems[type].splice(index, 1);

    // Update the totals and calculate percentages
    totals.calculateTotals(type)
    calculatePercentages()

    // Send the response
    res.json({
        message: `${type} Item with ID ${id} has been deleted successfully`
    })

}

const getItem = (req, res) => {
    // Fetch the ID of the item from teh request
    var type = req.params.type
    var id = parseInt(req.params.id)
    
    // Calculate the INDEX of the item to be retrieved
    const ids = data.allItems[type].map((item) => {
        return item.id
    })
    
    const index = ids.indexOf(id)

    res.json({
        message: 'Item has been retirved successfully',
        item: data.allItems[type][index]
    })
}

module.exports = {
    createItem,
    getItems,
    deleteItem,
    getItem
}