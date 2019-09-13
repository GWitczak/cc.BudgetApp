const express = require('express');
const { User, validateUser } = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).send('Invalid email or password.');

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password');

        const token = await user.createToken();

        res.header('x-auth-token', token).send({
            _id: user._id,
            email: user.email
        });

    } catch (ex) {
        res.status(500).send(ex.message);
    }
});

module.exports = router;