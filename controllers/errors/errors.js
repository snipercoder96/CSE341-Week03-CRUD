const createError = require('http-errors');

const errors = (req, res, next) => {
    const err = createError(404, 'Not Found');
    next(err);
}

const globalErrors = (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
    });
};

module.exports = {
    errors,
    globalErrors
};