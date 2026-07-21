const dotenv = require('dotenv');
dotenv.config();

const contactsRouter = require('./routes/contacts');
const booksRouter = require('./routes/books');
const mongoDb = require('./models/db/connection ');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const { errors: celebrateErrors } = require('celebrate');
const contactsSwaggerFile = require('./config/swagger-contacts-output.json');
const booksSwaggerFile = require('./config/swagger-books-output.json');
const combinedSwaggerFile = require('./config/swagger-output.json');
const { errors, globalErrors } = require('./controllers/errors/errors');
const routers = require('./routes/contacts');

const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();

/* middleware:
- body parser
- swagger ui
 */
app.use(bodyParser.json()); // Uses body-parser middleware to parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Uses body-parser middleware to parse URL-encoded request bodies

// Hook Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedSwaggerFile));
app.use('/api-docs-contacts', swaggerUi.serve, swaggerUi.setup(contactsSwaggerFile));
app.use('/api-docs-books', swaggerUi.serve, swaggerUi.setup(booksSwaggerFile));

(async function startServer() {
    try {
        await mongoDb.initDb();
        app.listen(PORT, () => {
            console.log(`Server is running on port: http://localhost:${PORT}/`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
})();


app.use(routers);
app.use(contactsRouter);
app.use(booksRouter);
app.use(celebrateErrors()); // W03 Example approach to implement RPC (Remote Procedure Call) using Express.js and JSON-RPC 2.0 specification
app.use(errors);
app.use(globalErrors);