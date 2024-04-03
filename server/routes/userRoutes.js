const router = require('express').Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            res.status(403).send({
                success: false,
                message: "User already exists"
            })
            return;
        }
        //Hash password before storing in db
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        //if user doesn't exist
        const newUser = new User(req.body);
        await newUser.save();

        res.status(200).send({
            success: true,
            message: "Registration Successful,Please login!"
        })

    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Something went wrong,Please try again"
        })
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(401).send({
                success: false,
                message: "Invalid credentials"
            })
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            res.status(401).send({
                success: false,
                message: "Invalid credentials"
            })
            return;
        }

        res.status(200).send({
            success: true,
            message: "User login successful"
        })

    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: "Something went wrong,Please try again"
        })
    }
})

module.exports = router;