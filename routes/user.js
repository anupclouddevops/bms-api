var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth')


var userController = require('../controllers/user')


router.post('/signup', userController.signup)

router.post('/login', userController.login)


router.delete('/:userID',checkAuth, userController.deleteUser)

module.exports = router