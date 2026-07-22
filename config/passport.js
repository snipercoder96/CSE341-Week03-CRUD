const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { ObjectId } = require('mongodb');
const { getDb } = require('../models/db/connection ');
const { collectionName, buildUserDocument } = require('../models/user');

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const db = getDb();
            const users = db.collection(collectionName);

            let user = await users.findOne({ googleId: profile.id });

            if (!user) {
                const newUser = buildUserDocument(profile);
                const result = await users.insertOne(newUser);
                user = { _id: result.insertedId, ...newUser };
            }

            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
    try {
        const db = getDb();
        const user = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;