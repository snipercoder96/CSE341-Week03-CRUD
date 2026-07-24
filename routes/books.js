const express = require('express');
const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');
const bookControllers = require('../controllers/books');
const isAuthenticated = require('../middleware/isAuthenticated');


router.use(isAuthenticated); // protects everything below

const bookBodySchema = Joi.object({
    title: Joi.string().trim().required(),
    author: Joi.string().trim().required(),
    genre: Joi.string().trim().required(),
    publishedYear: Joi.number().integer().min(1900).max(2100).optional(),
    description: Joi.string().trim().allow('').optional(),
}).unknown(true);

const validateBookBody = celebrate({
    [Segments.BODY]: bookBodySchema,
});

router.post('/books', validateBookBody, (req, res, next) => {
    /*
        #swagger.tags = ['Books']
        #swagger.summary = 'Create a new book'
        #swagger.description = 'Adds a new book to the database.'
        #swagger.security = [{ "googleAuth": ["profile", "email"] }]
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Book information',
            required: true,
            schema: { $ref: '#/definitions/BookInput' }
        }
        #swagger.responses[201] = { description: 'Book created successfully' }
        #swagger.responses[400] = { description: 'Invalid request' }
        #swagger.responses[401] = { description: 'Unauthorized' }
    */
    return bookControllers.addNewBook(req, res, next);
});

router.get('/books', (req, res, next) => {
    /*
        #swagger.tags = ['Books']
        #swagger.summary = 'Get all books'
        #swagger.description = 'Returns every book stored in the database.'
        #swagger.security = [{ "googleAuth": ["profile", "email"] }]
        #swagger.responses[200] = { description: 'Successful operation' }
        #swagger.responses[404] = { description: 'No books found' }
        #swagger.responses[400] = { description: 'Invalid request' }
        #swagger.responses[401] = { description: 'Unauthorized' }
    */
    return bookControllers.viewAllBooks(req, res, next);
});

router.get('/books/:id', (req, res, next) => {
    /*
        #swagger.tags = ['Books']
        #swagger.summary = 'Get one book'
        #swagger.description = 'Returns a single book by its ID.'
        #swagger.security = [{ "googleAuth": ["profile", "email"] }]
        #swagger.parameters['id'] = { in: 'path', description: 'Book ID', required: true, type: 'string' }
        #swagger.responses[200] = { description: 'Book found' }
        #swagger.responses[404] = { description: 'Book not found' }
        #swagger.responses[400] = { description: 'Invalid request' }
        #swagger.responses[401] = { description: 'Unauthorized' }
    */
    return bookControllers.viewSpecificBook(req, res, next);
});

router.put('/books/:id', validateBookBody, (req, res, next) => {
    /*
        #swagger.tags = ['Books']
        #swagger.summary = 'Update a book'
        #swagger.description = 'Updates an existing book by ID.'
        #swagger.security = [{ "googleAuth": ["profile", "email"] }]
        #swagger.parameters['id'] = { in: 'path', description: 'Book ID', required: true, type: 'string' }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Fields to update',
            required: true,
            schema: { $ref: '#/definitions/BookInput' }
        }
        #swagger.responses[200] = { description: 'Book updated successfully' }
        #swagger.responses[404] = { description: 'Book not found' }
        #swagger.responses[400] = { description: 'Invalid request' }
        #swagger.responses[401] = { description: 'Unauthorized' }
    */
    return bookControllers.updateBook(req, res, next);
});

router.delete('/books/:id', (req, res, next) => {
    /*
        #swagger.tags = ['Books']
        #swagger.summary = 'Delete a book'
        #swagger.description = 'Deletes a book from the database by ID.'
        #swagger.security = [{ "googleAuth": ["profile", "email"] }]
        #swagger.parameters['id'] = { in: 'path', description: 'Book ID', required: true, type: 'string' }
        #swagger.responses[200] = { description: 'Book deleted successfully' }
        #swagger.responses[404] = { description: 'Book not found' }
        #swagger.responses[400] = { description: 'Invalid request' }
        #swagger.responses[401] = { description: 'Unauthorized' }
    */
    return bookControllers.deleteBook(req, res, next);
});

module.exports = router;