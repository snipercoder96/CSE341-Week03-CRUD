const mongoDb = require('../models/db/connection ');
const ObjectId = require('mongodb').ObjectId;


const addNewContacts = async (req, res) => {
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        const newContacts = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday: birthday ? new Date(birthday) : undefined,
            createdAt: new Date()
        };

        const result = await mongoDb.getDb().collection('contacts').insertOne(newContacts);
        res.status(201).json({ _id: result.insertedId, ...newContacts });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const viewAllContacts = async (req, res) => {
    try {
        const contacts = await mongoDb.getDb().collection('contacts').find().toArray();
        res.status(200).json(contacts);

    if (!contacts) {
        return res.status(404).json({ message: "No contacts found" });
    }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const viewSecificContact = async (req, res) => {
    try {
        const {id} = req.params;
        const contact = await mongoDb.getDb().collection('contacts').findOne({ _id: new ObjectId(id) });
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const updateContact = async (req, res) => {
    try {
        const id = req.params.id;
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        const result = await mongoDb.getDb().collection('contacts').findOneAndUpdate(
            { _id: new ObjectId(id) },
            {
                $set: {
                    firstName,
                    lastName,
                    email,
                    favoriteColor,
                    birthday: birthday ? new Date(birthday) : undefined
                }
            },
            { returnDocument: 'after' }
        );

        if (!result) {
            return res.status(404).json({ message: "Contact not found" });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await mongoDb.getDb().collection('contacts').findOneAndDelete(
            { _id: new ObjectId(id) }
        );
        if (!result) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addNewContacts,
    viewAllContacts,
    viewSecificContact,
    updateContact,
    deleteContact
};