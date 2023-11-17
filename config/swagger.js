import swaggerJSDoc from 'swagger-jsdoc';
const options = {
  definition: {
    openapi: '3.0.0',
    //info
    info: {
      title: 'Money Tracker API',
      description: 'Money Tracker application',
      version: '1.0.0',
    },
    components: {
      //bearer tocken connection
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    // for all operations
    // security:[
    //   {
    //     bearerAuth: []
    //   }
    // ]
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
