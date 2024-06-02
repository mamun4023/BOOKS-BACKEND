const mongoose = require("mongoose");
const userModel = require("../models/user");

exports.createUser = async (data) => {
    return await userModel.create(data);
};

exports.findUser = async (email) => {
    return await userModel.findOne({ email });
};

exports.addHistory = async (user, data) => {
    return await userModel.findOneAndUpdate(
        { _id: user?._id },
        { $push: { searchHistory: data } },
        { new: true }
    );
};
