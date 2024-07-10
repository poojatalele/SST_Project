const express = require("express");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({email:req.body.email})
        if(userExists) {
            res.send({
                success: false,
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword;


        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json('User Created')

    } catch (error) {

    }

});

router.post("/login", async (req, res) => {
  
});


module.exports = router;