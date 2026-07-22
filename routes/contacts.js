const express = require('express');
const router = express.Router();
const { celebrate, Joi, Segments } = require('celebrate');
const contactServers = require('../controllers/contacts');
const isAuthenticated = require('../middleware/isAuthenticated');


const contactBodySchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    favoriteColor: Joi.string().trim().required(),
    birthday: Joi.string().allow('').optional(),
}).unknown(true);

const validateContactBody = celebrate({
    [Segments.BODY]: contactBodySchema,
});

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Contacts API' });
});

router.use(isAuthenticated); 

router.post('/contacts', validateContactBody, (req, res, next) => {
    /*
        #swagger.tags = ['Contacts']
        #swagger.summary = 'Create a new contact'
        #swagger.description = 'Adds a new contact to the database.'
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Contact information',
            required: true,
            schema: { $ref: '#/definitions/ContactInput' }
        }
        #swagger.responses[201] = { description: 'Contact created successfully' }
        #swagger.responses[400] = { description: 'Invalid request' }
    */
    return contactServers.addNewContacts(req, res, next);
});

router.get('/contacts', (req, res, next) => {
    /*
        #swagger.tags = ['Contacts']
        #swagger.summary = 'Get all contacts'
        #swagger.description = 'Returns every contact stored in the database.'
        #swagger.responses[200] = { description: 'Successful operation' }
        #swagger.responses[400] = { description: 'Invalid request' }
    */
    return contactServers.viewAllContacts(req, res, next);
});

router.get('/contacts/:id', (req, res, next) => {
    /*
        #swagger.tags = ['Contacts']
        #swagger.summary = 'Get one contact'
        #swagger.description = 'Returns a single contact by its ID.'
        #swagger.parameters['id'] = { in: 'path', description: 'Contact ID', required: true, type: 'string' }
        #swagger.responses[200] = { description: 'Contact found' }
        #swagger.responses[404] = { description: 'Contact not found' }
        #swagger.responses[400] = { description: 'Invalid request' }
    */
    return contactServers.viewSecificContact(req, res, next);
});

router.put('/contacts/:id', validateContactBody, (req, res, next) => {
    /*
        #swagger.tags = ['Contacts']
        #swagger.summary = 'Update a contact'
        #swagger.description = 'Updates an existing contact by ID.'
        #swagger.parameters['id'] = { in: 'path', description: 'Contact ID', required: true, type: 'string' }
        #swagger.parameters['body'] = {
            in: 'body',
            description: 'Fields to update',
            required: true,
            schema: { $ref: '#/definitions/ContactInput' }
        }
        #swagger.responses[200] = { description: 'Contact updated successfully' }
        #swagger.responses[404] = { description: 'Contact not found' }
        #swagger.responses[400] = { description: 'Invalid request' }
    */
    return contactServers.updateContact(req, res, next);
});

router.delete('/contacts/:id', (req, res, next) => {
    /*
        #swagger.tags = ['Contacts']
        #swagger.summary = 'Delete a contact'
        #swagger.description = 'Deletes a contact from the database by ID.'
        #swagger.parameters['id'] = { in: 'path', description: 'Contact ID', required: true, type: 'string' }
        #swagger.responses[200] = { description: 'Contact deleted successfully' }
        #swagger.responses[404] = { description: 'Contact not found' }
        #swagger.responses[400] = { description: 'Invalid request' }
    */
    return contactServers.deleteContact(req, res, next);
});

module.exports = router;