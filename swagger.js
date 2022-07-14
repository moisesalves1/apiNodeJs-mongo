const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/customer-route.js', './src/routes/index-route.js', './src/routes/order-route.js', './src/routes/product-route.js', './src/app.js']

swaggerAutogen(outputFile, endpointsFiles)