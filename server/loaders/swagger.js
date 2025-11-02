const swaggerUI = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const swaggerDocument = yaml.load(fs.readFileSync(path.resolve('__dirname', '../e_commerce_app.yml'), 'utf-8'));

module.exports = (app) => {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

}
