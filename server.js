require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { swaggerUi, swaggerDocs } = require('./swagger');
const userRoutes = require('./routes/user');
const { sequelize } = require('./models');

app.use('/api', userRoutes);
const app = express();
app.use(bodyParser.json());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'User Service API',
      version: '1.0.0',
      description: 'API documentation for User Service'
    },
  },
  apis: ['./routes/*.js'],
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`User Service running on port ${PORT}`));
});
