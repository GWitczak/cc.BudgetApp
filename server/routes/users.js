const express = require('express');
const { User, validateUser } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');


router.get('/', auth, async (req, res) => {
    try {
        console.log(req.user)
        const user = await User.findById(req.user._id);
        res.send(user);
    } catch(ex) {
        res.status(500).send(ex.message);
    }
})

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
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            wallet: req.body.wallet,
            globalBalance: req.body.globalBalance,
            history: req.body.history,
            isAdmin: req.body.isAdmin
        })

        await user.save();

        // Create jwt token
        const token = await user.createToken();

        // Return user.email
        res.header('x-auth-token', token).send({
            _id: user._id,
            email: user.email,
            name: user.name,
            wallet: user.wallet,
            globalBalance: user.globalBalance,
            history: user.history,
            isAdmin: user.isAdmin
        })

    } catch (ex) {
        res.status(500).send(ex.message);
    }
});

module.exports = router;