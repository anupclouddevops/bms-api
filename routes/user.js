var express = require('express');
var router = express.Router();


var userController = require('../controllers/user')


router.post('/signup', userController.signup)

router.post('/login', userController.login)


router.delete('/:userID',userController.deleteUser)

module.exports = router