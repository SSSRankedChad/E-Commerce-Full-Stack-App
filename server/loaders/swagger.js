const swaggerUi = require('swagger-ui-express');
const yaml = require('yaml');
const fs = require('fs');
const path = require('path');

const swaggerDocument = yaml.safeLoad(fs.readFileSync(path.resolve('__dirname', '../e_commerce_app.yml'), 'utf-8'));

module.exports = (app) => {
  app.use('/docs', swaggerUi.serve, swaggerUI.setup(swaggerDocument));

}
