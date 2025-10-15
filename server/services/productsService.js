const createError = require('http-errors');
const productModel = require('../models/products/products.js');
const productModelInstance = new productModel();


module.exports = class productService {

  async get(data) {
    try {
     const products = await productModelInstance.findProducts(data);

     if(!products) {
       throw createError('409', 'Products not found!');
     }

    return products;

    } catch(err) {
      throw new Error(err);
    }

  }

  async find(id) {
    try {
      const product = await productModelInstance.findProductById(id);

      if(!product) {
        throw createError('409', 'Products not found!');
      }

      return product;

    } catch(err) {
      throw new Error(err);
    }
  }
}
