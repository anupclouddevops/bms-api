var express = require('express');
var router = express.Router();
var bgtController = require('../controllers/budget')
const checkAuth = require('../middleware/check-auth')

router.get('/', checkAuth, bgtController.getBudget)

module.exports = router