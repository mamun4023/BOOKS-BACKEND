
const jwt = require("jsonwebtoken");
const catchError = require("../errorHandlers/errorCatcher");
const {CONSTANTS} = require("../constants")

const isUser = async (req, res, next) => {
    const token = req.cookies.token;
    // console.log("token" , token)
    if (!token) return next(new catchError(CONSTANTS.UNAUTHORIZED_ACCESS_MSG, 400));
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            next(new catchError(CONSTANTS.INVALID_TOKEN, 404));
            return;
        }
        req.user = decoded;
        next();
    });
};


module.exports = { isUser };
