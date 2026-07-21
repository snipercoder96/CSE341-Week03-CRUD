const mongoDb = require('../models/db/connection ');
const ObjectId = require('mongodb').ObjectId;
const { collectionName, buildBookDocument } = require('../models/book');

const addNewBook = async (req, res) => {
    try {
        const newBook = buildBookDocument(req.body);
        const result = await mongoDb.getDb().collection(collectionName).insertOne(newBook);
        res.status(201).json({ _id: result.insertedId, ...newBook });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const viewAllBooks = async (req, res) => {
    try {
        const books = await mongoDb.getDb().collection(collectionName).find().toArray();
        if (!books || books.length === 0) {
            return res.status(404).json({ message: 'No books found' });
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const viewSpecificBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await mongoDb.getDb().collection(collectionName).findOne({ _id: new ObjectId(id) });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = buildBookDocument(req.body);

        const result = await mongoDb.getDb().collection(collectionName).findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        );

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await mongoDb.getDb().collection(collectionName).findOneAndDelete(
            { _id: new ObjectId(id) }
        );

        if (!result) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    addNewBook,
    viewAllBooks,
    viewSpecificBook,
    updateBook,
    deleteBook,
};
