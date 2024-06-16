const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

const makeupProductsController = require('../controlers/makeup');
const hairProductsController = require('../controlers/hair');

router.get('/', requiresAuth(), makeupProductsController.getAllMakeupProducts);

router.get('/hair', requiresAuth(), hairProductsController.getAllHairProducts);

router.get('/makeup', makeupProductsController.getAllMakeupProducts);

router.get('/hair/:id', hairProductsController.getSingleHairProduct);

router.get('/makeup/:id', makeupProductsController.getSingleMakeupProduct);

router.post('/hair/', hairProductsController.createHairProduct);

router.post('/makeup/', makeupProductsController.createMakeupProduct);

router.put('/hair/:id', hairProductsController.updateHairProduct);

router.put('/makeup/:id', makeupProductsController.updateMakeupProduct);

router.delete('/hair/:id', hairProductsController.deleteHairProduct);

router.delete('/makeup/:id', makeupProductsController.deleteMakeupProduct);

module.exports = router;