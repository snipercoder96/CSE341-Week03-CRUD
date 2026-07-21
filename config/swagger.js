const swaggerAutogen = require('swagger-autogen')();

const sharedDoc = {
    info: {
        title: 'Contacts and Books API',
        description: 'An API for managing contacts and books, including create, read, update, and delete operations for both collections.',
        version: '1.0.0',
    },
    host: 'cse341-course-0ti4.onrender.com',
    schemes: ['https'],
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

const booksDoc = {
    ...sharedDoc,
    info: {
        ...sharedDoc.info,
        title: 'Books API',
        description: 'Detailed Swagger documentation for the books collection CRUD endpoints.',
    },
};

const outputFile = './config/swagger-output.json';
const booksOutputFile = './config/swagger-books-output.json';
const endpointsFiles = ['./routes/contacts.js', './routes/books.js'];
const booksEndpointsFiles = ['./routes/books.js'];

swaggerAutogen(outputFile, endpointsFiles, sharedDoc);
swaggerAutogen(booksOutputFile, booksEndpointsFiles, booksDoc);