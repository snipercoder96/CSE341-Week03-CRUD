const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let client;
let database;

async function initDb() {
    if (database) {
        console.log("Database already initialized");
        return database;
    }

    try {
        client = new MongoClient(process.env.MONGODB_URI, {
            tls: true,
            tlsAllowInvalidCertificates: false,
            serverSelectionTimeoutMS: 5000
        });
        await client.connect();
        database = client.db("week03crud");
        console.log("Database initialized");
        return database;
    } catch (err) {
        console.error("Error initializing database:", err);
        throw err;
    }
}

function getDb() {
    if (!database) {
        throw new Error("Database not initialized");
    }
    return database;
}

module.exports = { initDb, getDb };
