const mongodb = require('../connect');
const ObjectId = require('mongodb').ObjectId;

const getAllHairProducts = async (req, res, next) => {
    try {
        const result = await mongodb.getDB().db().collection('hair').find();
        const lists = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
  };

const getSingleHairProduct = async (req, res, next) => {
    try {
        const productId = req.params.id.length === 24 ? new ObjectId(req.params.id) : req.params.id;
        const result = await mongodb.getDB().db().collection('hair').find({ _id: productId });
        const lists = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    } catch (error) {
        next(error);
    }
  };

const createHairProduct = async (req, res, next) => {
    try {
        const product = {
            name: req.body.name,
            brand: req.body.brand,
            category: req.body.category,
            price: req.body.price,
            shade: req.body.shade,
            size: req.body.size,
            ingredients: req.body.ingredients,
            skin_type: req.body.skin_type,
            finish: req.body.finish,
            cruelty_free: req.body.cruelty_free,
            vegan: req.body.vegan,
            rating: req.body.rating,
            number_of_reviews: req.body.number_of_reviews,
            availability: req.body.availability, 
            link_to_product_page: req.body.link_to_product_page

        };
        const response = await mongodb.getDB().db().collection('hair').insertOne(product);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response);
        }
    } catch (error) {
        next(error);
    }
  };

  const updateHairProduct = async (req, res, next) => {
    try {
        const productId = req.params.id.length === 24 ? new ObjectId(req.params.id) : req.params.id;
        const product = {
            name: req.body.name,
            brand: req.body.brand,
            category: req.body.category,
            price: req.body.price,
            shade: req.body.shade,
            size: req.body.size,
            ingredients: req.body.ingredients,
            skin_type: req.body.skin_type,
            finish: req.body.finish,
            cruelty_free: req.body.cruelty_free,
            vegan: req.body.vegan,
            rating: req.body.rating,
            number_of_reviews: req.body.number_of_reviews,
            availability: req.body.availability, 
            link_to_product_page: req.body.link_to_product_page
        };
        const result = await mongodb.getDB().db().collection('hair').replaceOne({ _id: productId }, product);
        res.status(204).json(result);
    } catch (error) {
        next(error);
    }
  };

  const deleteHairProduct = async (req, res, next) => {
    try {
        const productId = req.params.id.length === 24 ? new ObjectId(req.params.id) : req.params.id;
        const result = await mongodb.getDB().db().collection('hair').deleteOne({ _id: productId });
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
  };

module.exports = {
    getAllHairProducts,
    getSingleHairProduct,
    createHairProduct,
    updateHairProduct,
    deleteHairProduct
};
