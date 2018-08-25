var totals = require('./totals');

const getBudget = (req, res) => {

    // 1. Calculate Total Expenses and Incomes
    totals.calculateTotals('exp')
    .then(totalExp => {
         totals.calculateTotals('inc')
        .then(totalInc => {
            let percentage
            const budget = totalInc - totalExp
            if (totalInc > 0) {
                percentage = Math.floor((totalExp/totalInc)*100)
            } else {
                percentage = -1
            }
            res.status(200).json({
                budgetLeft: budget,
                spent: percentage + '%',
                expenses: totalExp,
                income: totalInc
            })
        })
    })
}

module.exports = {
    getBudget
}