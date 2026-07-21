require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const contactsDoc = {
    info: {
        title: 'Contacts API',
        description: 'Detailed Swagger documentation for the contacts collection CRUD endpoints.',
        version: '1.0.0',
    },
    host: process.env.SWAGGER_HOST || 'localhost:3000',
    schemes: ['https', 'http'],
    tags: [
        {
            name: 'Contacts',
            description: 'Endpoints for managing contacts',
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
    },
};

const booksDoc = {
    info: {
        title: 'Books API',
        description: 'Detailed Swagger documentation for the books collection CRUD endpoints.',
        version: '1.0.0',
    },
    host: process.env.SWAGGER_HOST || 'localhost:3000',
    schemes: ['https', 'http'],
    tags: [
        {
            name: 'Books',
            description: 'Endpoints for managing books',
        },
    ],
    definitions: {
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

const contactsOutputFile = './config/swagger-contacts-output.json';
const booksOutputFile = './config/swagger-books-output.json';
const contactsEndpointsFiles = ['./routes/contacts.js'];
const booksEndpointsFiles = ['./routes/books.js'];

swaggerAutogen(contactsOutputFile, contactsEndpointsFiles, contactsDoc);
swaggerAutogen(booksOutputFile, booksEndpointsFiles, booksDoc);