var totals = require('./totals');
var data = require('../modals/data');


const calculateBudget = () => {

    // 1. Calculate Total Expenses and Incomes
    totals.calculateTotals('exp');
    totals.calculateTotals('inc');

    // 2. Calculate Budget

    data.budget = data.totals.inc - data.totals.exp;

    //3. Calculate Percentage
    if (data.totals.inc > 0) {
        data.percentage = Math.floor((data.totals.exp / data.totals.inc ) * 100 );
    } else {
        data.percentage = -1;
    }
}

const getBudget = (req, res) => {

    calculateBudget()

    res.json({
        budget: data.budget,
        spent: data.percentage + '%',
        expenses: data.totals.exp,
        income: data.totals.inc
    })

}


module.exports = {
    getBudget
}