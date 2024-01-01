const User = require("../models/userModel")
const asyncHandler = require("express-async-handler")

exports.getAllUsers = asyncHandler(async (_, res) => {
    const allUser = await User.find();
    if(allUser.length >= 1){
        res.status(200).json(allUser);
        
    }else{
        res.status(404);
        throw new Error("No user record found...");
    }
});

exports.createUser = asyncHandler(async (req, res) => {
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
        throw new Error("Username and Password is required!");
    }

    const saveUser = await User.create({
        UserName,
        Password,
        Phone,
        Email,
        Role,
        Status
    });

    res.status(201).json({message: `User create successfully!`});
});

exports.getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("User not found...");
    }else{
        res.status(200).json(user);
    }
})

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

exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error("No user found...");
    }

    await User.deleteOne({_id: req.params.id});
    res.status(200).json({message: `${req.params.id} has been deletd!`});
})

// module.exports = {getAllUser};