const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const makeupProductsController = require('../controlers/makeup');

router.get('/', makeupProductsController.getAllMakeupProducts);

router.get('/contacts', makeupProductsController.getAllMakeupProducts);

router.get('/:id', makeupProductsController.getSingleMakeupProduct);

router.post('/', makeupProductsController.createMakeupProduct);

router.put('/:id', makeupProductsController.updateMakeupProduct);

router.delete('/:id', makeupProductsController.deleteMakeupProduct);

module.exports = router;