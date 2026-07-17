const swaggerAutogen = require('swagger-autogen')();


const doc = {
    info: {
        title: 'Contacts API',
        description: 'An API for managing contacts, allowing users to create, read, update, and delete contact information.',
        version: '1.0.0',
    },
    host: 'cse341-course-0ti4.onrender.com',
    schemes: ['https'],
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

const outputFile = './config/swagger-output.json'; // output file
const endpointsFiles = ['./routes/contacts.js']; // contacts-only documentation

swaggerAutogen(outputFile, endpointsFiles, doc);