const mongodb = require('../connect');
const ObjectId = require('mongodb').ObjectId;
// const swaggerAutogen = require('swagger-autogen')();

const getAllMakeupProducts = async (req, res, next) => {
  try {
      const result = await mongodb.getDB().db().collection('makeup').find();
      const lists = await result.toArray();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
  } catch (error) {
      next(error); // Pass the error to the error handling middleware
  }
};

const getSingleMakeupProduct = async (req, res, next) => {
  try {
      const productId = req.params.id.length === 24 ? new ObjectId(req.params.id) : req.params.id;
      const result = await mongodb.getDB().db().collection('makeup').find({ _id: productId });
      const lists = await result.toArray();
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
  } catch (error) {
      next(error);
  }
};

const createMakeupProduct = async (req, res, next) => {
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
      const response = await mongodb.getDB().db().collection('makeup').insertOne(product);
      if (response.acknowledged) {
          res.status(201).json(response);
      } else {
          res.status(500).json(response);
      }
  } catch (error) {
      next(error);
  }
};

const updateMakeupProduct = async (req, res, next) => {
  try {
      const productId = req.params.id.length === 24 ? new ObjectId(req.params.id) : req.params.id;
      const product = {
          name: req.body.name,
          brand: req.body.brand,
          ingredients: req.body.ingredients,
          score: req.body.score
      };
      const result = await mongodb.getDB().db().collection('makeup').replaceOne({ _id: productId }, product);
      res.status(204).json(result);
  } catch (error) {
      next(error);
  }
};

const deleteMakeupProduct = async (req, res, next) => {
  try {
      const productId = req.params.id.length === 24 ? new ObjectId(req.params.id) : req.params.id;
      const result = await mongodb.getDB().db().collection('makeup').deleteOne({ _id: productId });
      res.status(200).json(result);
  } catch (error) {
      next(error);
  }
};
module.exports = {
  getAllMakeupProducts,
  getSingleMakeupProduct,
  createMakeupProduct,
  updateMakeupProduct,
  deleteMakeupProduct
}