const createError = require('http-errors');
const productModel = require('../models/products/products.js');
const productModelInstance = new productModel();


module.exports = class productService {

  async get() {
    try {
     const products = await productModelInstance.findProducts();

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
     
      console.log("=== SERVICE LAYER ===");
      console.log("Received id in service:", id);
      console.log("Type:", typeof id);
      
      console.log("Product from model:", product); 


      if(!product) {
        throw createError('409', 'Product not found!');
      }

      return product;

    } catch(err) {
      throw new Error(err);
    }
  }
}
