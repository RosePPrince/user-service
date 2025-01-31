const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User Service API',
      version: '1.0.0',
      description: 'API documentation for User Service',
    },
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
