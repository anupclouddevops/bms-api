var Items = require('../modals/items')

const calculateTotals = (type) => {

    return Items.find({'item.type': type})
    .exec()
    .then((items) => {
        let sum = 0;
        if(items.length > 0) {
            items.forEach((item) => {
                sum = sum + parseInt(item.item.value)
            })
        }
        return sum
    })
}

const getTotals = (req, res) => {

    calculateTotals('exp').then(totalExp => {
        calculateTotals('inc').then(totalInc => {
            res.status(200).json({
                message: 'Total Expenses and Incomes',
                inc: totalInc,
                exp: totalExp
            })
        })
    })

}

module.exports = {
    getTotals,
    calculateTotals
}