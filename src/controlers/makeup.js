const mongodb = require('../connect');
const ObjectId = require('mongodb').ObjectId;
// const swaggerAutogen = require('swagger-autogen')();

const getAllMakeupProducts = async (req, res, next) => {
    const result = await mongodb.getDB().db().collection('makeup').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  };

const getSingleMakeupProduct = async (req, res) => {
  const productId = req.params.id.length === 24 ? new ObjectId(req.params.id) : req.params.id;
    console.log(userId)
    const result = await mongodb
      .getDB()
      .db()
      .collection('makeup')
      .find({ _id: productId});
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  };

  const createMakeupProduct = async (req, res) => {
    const product = {
        name: req.body.name,
        brand: req.body.brand,
        ingredients: req.body.ingredients,
        score: req.body.score
    };
    const response = await mongodb.getDB().db().collection('makeup').insertOne(product);
    if(response.acknowledged){
      res.status(201).json(response);
    }else{
      res.status(500).json(response);
    }
};

const updateMakeupProduct = async (req, res) => {

  const productId = req.params.id.length === 24 ? new ObjectId(req.params.id) : req.params.id;
  const product = {
    name: req.body.name,
    brand: req.body.brand,
    ingredients: req.body.ingredients,
    score: req.body.score
  }
  const result = await mongodb.getDB().db().collection('makeup').replaceOne({_id: productId}, product);
  res.status(204).json(result);
}

const deleteMakeupProduct = async (req, res) => {

  const productId = req.params.id.length === 24 ? new ObjectId(req.params.id) : req.params.id;
  const result = await mongodb.getDB().db().collection('makeup').deleteOne({_id: productId});
  res.status(200).json(result);
}
module.exports = {
  getAllMakeupProducts,
  getSingleMakeupProduct,
  createMakeupProduct,
  updateMakeupProduct,
  deleteMakeupProduct
}