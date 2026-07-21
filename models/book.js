const collectionName = 'books';

const buildBookDocument = (body) => ({
    title: body.title,
    author: body.author,
    genre: body.genre,
    publishedYear: body.publishedYear ? Number(body.publishedYear) : undefined,
    description: body.description || '',
    createdAt: new Date(),
});

module.exports = {
    collectionName,
    buildBookDocument,
};
