const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
const jwtSecret = "sjoirmskfjiwhtjwioskwoirhitjdnks"

// Route to create a user
router.post("/createuser",
  [
    body('email').isEmail(),  // Validate email
    body('name').isLength({ min: 5 }),  // Validate name
    body('password', 'Password should be at least 5 characters long').isLength({ min: 5 })  // Validate password
  ],
  async (req, res) => {

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    let setPassword = await bcrypt.hash(req.body.password,salt)

    try {
      // Create a new user in the database
      await User.create({
        name: req.body.name,
        password: setPassword,
        email: req.body.email,
        location: req.body.location
      });

      // Send success response if user is created
      res.status(201).json({ success: true });
      
    } catch (error) {
      console.error(error);
      // Send error response if something went wrong
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
);



router.post("/Loginuser",
  [
    body('email').isEmail(),  // Validate email
    body('password', 'Password should be at least 5 characters long').isLength({ min: 5 })  // Validate password
  ], async (req, res) => {
  let email= req.body.email;
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
  try {
      // Create a new user in the database
      let userData = await User.findOne({email});
      if (!userData){
        return res.status(400).json({ errors: "try logging with correct credentials"});
      }
      
      const pwdComparer = await bcrypt.compare(req.body.password,userData.password);
      if(!pwdComparer){
        return res.status(400).json({ errors: "try logging with correct credentials"});
      }

      const data = {
        user: {
          id: userData.id
        }
      }

      const authToken = jwt.sign(data, jwtSecret)
      return res.json({success: true, authToken: authToken})

      
    } catch (error) {
      console.error(error);
      // Send error response if something went wrong
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
);



module.exports = router;
