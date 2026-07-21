const swaggerAutogen = require('swagger-autogen')();

const baseDoc = {
    info: {
        title: 'Contacts and Books API',
        description: 'An API for managing contacts and books, including create, read, update, and delete operations for both collections.',
        version: '1.0.0',
    },
    host: process.env.SWAGGER_HOST || 'localhost:3000',
    schemes: ['http', 'https'],
    tags: [
        {
            name: 'Contacts',
            description: 'Endpoints for managing contacts',
        },
        {
            name: 'Books',
            description: 'Endpoints for managing books',
        },
    ],
    definitions: {
        ContactInput: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            favoriteColor: 'Blue',
            birthday: '1990-01-01',
        },
        Contact: {
            _id: '64c1f0b2a5d9e2c3b4a5d6e7',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            favoriteColor: 'Blue',
            birthday: '1990-01-01',
            createdAt: '2024-01-01T12:00:00.000Z',
        },
        BookInput: {
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            genre: 'Classic',
            publishedYear: 1925,
            description: 'A novel about the American Dream.',
        },
        Book: {
            _id: '64c1f0b2a5d9e2c3b4a5d6e8',
            title: 'The Great Gatsby',
            author: 'F. Scott Fitzgerald',
            genre: 'Classic',
            publishedYear: 1925,
            description: 'A novel about the American Dream.',
            createdAt: '2024-01-01T12:00:00.000Z',
        },
    },
};

const contactsDoc = {
    ...baseDoc,
    info: {
        ...baseDoc.info,
        title: 'Contacts API',
        description: 'Detailed Swagger documentation for the contacts collection CRUD endpoints.',
    },
};

const booksDoc = {
    ...baseDoc,
    info: {
        ...baseDoc.info,
        title: 'Books API',
        description: 'Detailed Swagger documentation for the books collection CRUD endpoints.',
    },
};

const combinedDoc = {
    ...baseDoc,
    info: {
        ...baseDoc.info,
        title: 'Contacts and Books API',
        description: 'Combined Swagger documentation for the contacts and books collections.',
    },
};

const contactsOutputFile = './config/swagger-contacts-output.json';
const booksOutputFile = './config/swagger-books-output.json';
const combinedOutputFile = './config/swagger-output.json';
const contactsEndpointsFiles = ['./routes/contacts.js'];
const booksEndpointsFiles = ['./routes/books.js'];
const combinedEndpointsFiles = ['./routes/contacts.js', './routes/books.js'];

swaggerAutogen(contactsOutputFile, contactsEndpointsFiles, contactsDoc);
swaggerAutogen(booksOutputFile, booksEndpointsFiles, booksDoc);
swaggerAutogen(combinedOutputFile, combinedEndpointsFiles, combinedDoc);