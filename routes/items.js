var express = require('express');
var router = express.Router();
var itemsController = require('../controllers/items')
const checkAuth = require('../middleware/check-auth')


// Routes based on input request
router.get('/' , checkAuth, itemsController.getItems)
router.get('/:type/:id', checkAuth, itemsController.getItem)

router.post('/', checkAuth, itemsController.createItem)

router.delete('/:type/:id', checkAuth, itemsController.deleteItem)

module.exports = router;
