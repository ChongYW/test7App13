const User = require("../models/userModel")
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// Get all user.
exports.getAllUsers = asyncHandler(async (_, res) => {
    const allUser = await User.find();
    if(allUser.length >= 1){
        res.status(200).json(allUser);
        
    }else{
        res.status(404);
        throw new Error("No user record found...");
    }
});

// Create user.
exports.createUser = asyncHandler(async (req, res) => {
    const {
        UserName,
        Password,
        Phone,
        Email,
        Role,
        Status
    } = req.body;

    if (!UserName || !Password || !Email) {
        res.status(400);
        throw new Error("Username and Password is required!");
    }
    
    const userAvailable = await User.findOne({Email});

    if (userAvailable) {
        res.status(400);
        throw new Error("Given email is already registered")
    }

    const hashedPassword = await bcrypt.hash(Password, 10);
    console.log("Hashed password: ", hashedPassword);

    const saveUser = await User.create({
        UserName,
        Password: hashedPassword,
        Phone,
        Email,
        Role,
        Status
    });

    res.status(201).json({message: `User create successfully!`});
});

// Get a user.
exports.getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found...");
    }else{
        res.status(200).json(user);
    }
})

// Update a user.
exports.updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found...")
    }else{
        const {
            UserName,
            Password,
            Phone,
            Email,
            Role,
            Status
        } = req.body;

        if (!UserName || !Password) {
            res.status(400);
            throw new Error("Username or Password cant be empty");
        }else{
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                req.body
            );

            res.status(200).json({message: `${req.params.id} has been updated: `, updateUser});
        }
    }
});

// Deleted a user.
exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("No user found...");
    }

    await User.deleteOne({_id: req.params.id});
    res.status(200).json({message: `${req.params.id} has been deletd!`});
})

// User login.
exports.login = asyncHandler(async (req, res) => {
    const {Email, Password} = req.body;

    if (!Email || !Password) {
        res.status(400);
        throw new Error("Email or Password cant be empty");
    }

    const user = await User.findOne({Email});

    if (!user) {
        res.status(404);
        throw new Error("Email not registered...");
    }

    if (await bcrypt.compare(Password, user.Password)) {
        res.status(200).json({message: "Login success!"})
    }else{
        res.status(401);
        throw new Error("Password incorrect!");
    }
})

// module.exports = {getAllUser};