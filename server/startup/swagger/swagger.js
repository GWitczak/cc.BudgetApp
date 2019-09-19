const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSchema = require('./swaggerDefinition');


const swaggerDefinition = swaggerSchema.swaggerDefinition;

const options = {
    swaggerDefinition,
    apis: ['../../routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = function (app) {
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};