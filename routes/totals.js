var express = require('express');
var router = express.Router();
var totalsController = require('../controllers/totals')
const checkAuth = require('../middleware/check-auth')

router.get('/', checkAuth, totalsController.getTotals)

module.exports = router