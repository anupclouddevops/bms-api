var data = require('../modals/data');

const calculateTotals = (type) => {

    let sum = 0;
    data.allItems[type].forEach((item) => {
        sum = sum + item.value;
    })

    data.totals[type] = sum;

}

const getTotals = (req, res) => {
    res.json({
        message: `Total Expenses and Incomes`,
        totalsExp: data.totals.exp,
        totalsInc : data.totals.inc
    })
}


module.exports = {
    getTotals,
    calculateTotals
}