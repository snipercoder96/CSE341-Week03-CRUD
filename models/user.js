const collectionName = 'users';

const buildUserDocument = (profile) => ({
    googleId: profile.id,
    displayName: profile.displayName,
    email: profile.emails?.[0]?.value || '',
    avatar: profile.photos?.[0]?.value || '',
    createdAt: new Date(),
});

module.exports = {
    collectionName,
    buildUserDocument,
};