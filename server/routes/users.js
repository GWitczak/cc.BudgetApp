const express = require('express');
const { User, validateUser } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');


// ----------------- INFO --------------------
// FOR TESTING ONLY - DELETE IT AFTER DEV

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch(ex) {
        res.status(500).send(ex.message);
    }
})

// ----------------- INFO --------------------


router.post('/', async (req, res) => {

    // Validate request with Joi
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        // Check if given email is already in use
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('This e-mail is already in use.');

        // Generate salt and hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // Create and save User
        user = new User({
            email: req.body.email,
            password: hashedPass,
        })

        await user.save();

        // Create jwt token
        const token = await user.createToken();

        // Return user.email
        res.header('x-auth-token', token).send({
            _id: user._id,
            email: user.email
        })

    } catch (ex) {
        res.status(500).send(ex.message);
    }
});

module.exports = router;