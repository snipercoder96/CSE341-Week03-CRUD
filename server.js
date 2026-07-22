const dotenv = require('dotenv');
dotenv.config();

const session = require('express-session');
const passport = require('./config/passport');

const contactsRouter = require('./routes/contacts');
const booksRouter = require('./routes/books');
const authRouter = require('./routes/auth');
const mongoDb = require('./models/db/connection ');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const { errors: celebrateErrors } = require('celebrate');
const contactsSwaggerFile = require('./config/swagger-contacts-output.json');
const booksSwaggerFile = require('./config/swagger-books-output.json');
const { errors, globalErrors } = require('./controllers/errors/errors');
const routers = require('./routes/contacts');

const PORT = process.env.PORT || 3000;

const express = require('express');
const app = express();

/* middleware:
- body parser
- session + passport
- swagger ui
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session + Passport — must come before any route that checks req.isAuthenticated / req.user
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Hook Swagger UI
app.use('/api-docs-contacts', swaggerUi.serveFiles(contactsSwaggerFile, {}), swaggerUi.setup(contactsSwaggerFile));
app.use('/api-docs-books', swaggerUi.serveFiles(booksSwaggerFile, {}), swaggerUi.setup(booksSwaggerFile));

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

app.use(authRouter);
app.use(routers);
app.use(contactsRouter);
app.use(booksRouter);
app.use(celebrateErrors());
app.use(errors);
app.use(globalErrors);