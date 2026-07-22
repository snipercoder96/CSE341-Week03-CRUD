const express = require('express');
const passport = require('passport');
const router = express.Router();

// Step 1: kicks off the flow — redirects the browser to Google's login screen
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Step 2: Google redirects back here after the user logs in
router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    (req, res) => {
        // only runs if login succeeded
        res.redirect('/auth/success');
    }
);

// Simple landing routes so you have something to see while testing
router.get('/auth/success', (req, res) => {
    if (!req.user) {
        return res.redirect('/auth/failure');
    }
    res.json({
        message: 'Login successful',
        user: {
            id: req.user._id,
            displayName: req.user.displayName,
            email: req.user.email
        }
    });
});

router.get('/auth/failure', (req, res) => {
    res.status(401).json({ message: 'Login failed' });
});

// Logout
router.get('/auth/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.json({ message: 'Logged out successfully' });
    });
});

module.exports = router;