var express = require('express');
var router = express.Router();
var itemsController = require('../controllers/items')
const checkAuth = require('../middleware/check-auth')


// Routes based on input request
router.get('/' , checkAuth, itemsController.getItems)

router.post('/', checkAuth, itemsController.createItem)

router.delete('/:id', checkAuth, itemsController.deleteItem)

module.exports = router;
