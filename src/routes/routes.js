const express = require('express');
const router = express.Router();

const makeupProductsController = require('../controlers/makeup');

router.get('/', makeupProductsController.getAllMakeupProducts);

router.get('/contacts', makeupProductsController.getAllMakeupProducts);

router.get('/:id', makeupProductsController.getSingleMakeupProduct);

router.post('/', makeupProductsController.createMakeupProduct);

router.put('/:id', makeupProductsController.updateMakeupProduct);

router.delete('/:id', makeupProductsController.deleteMakeupProduct);

module.exports = router;