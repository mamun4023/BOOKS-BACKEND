const dbServices = require("../DB/user");
const asyncHandler = require("express-async-handler");
const catchError = require("../errorHandlers/errorCatcher");
const successResponse = require("../responseHandlers/successResponse");
const { CONSTANTS } = require("../constants");
const { passwordMatching, generateToken } = require("../services/auth");

exports.signUp = asyncHandler(async (req, res, next) => {
    const user = await dbServices.findUser(req.body.email);
    if (user) {
        next(new catchError(CONSTANTS.USER_ALREADY_EXIST, 400));
        return;
    }
    const newuser = await dbServices.createUser(req.body);
    successResponse({ res, message: CONSTANTS.SIGNUP_MESSAGE, data: newuser });
});

exports.signIn = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next(new catchError(CONSTANTS.GIVEN_DATA_IS_INVALID, 400));
    }
    const user = await dbServices.findUser(email);
    if (!user) {
        next(new catchError(CONSTANTS.USER_DOES_NOT_EXIST, 400));
        return;
    }

    const isMatched = await passwordMatching(password, user.password);

    if (!isMatched) {
        next(new catchError(CONSTANTS.PASSWORD_IS_INVALID, 400));
        return;
    }

    const token = await generateToken(user);
    res.cookie("token", token, {
        // httpOnly: true,
        // signed: true,
        // secure: true,
        // sameSite: 'None',
        maxAge: 12 * 60 * 60 * 1024,
    });
    successResponse({ res, message: CONSTANTS.LOGIN_MESSAGE });
});


exports.userDetail = asyncHandler(async (req, res, next) => {
   const data = await dbServices.findUser(req.user.email);

    successResponse({ res, message: CONSTANTS.SUCCESS, data });
});

exports.logout = asyncHandler(async (req, res, next) => {
    if (!req.cookies.token) {
        next(new catchError(CONSTANTS.LOGOUT_ERROR_MSG, 400));
        return;
    }

    res.clearCookie("token");
    successResponse({ res, message: CONSTANTS.LOGOUT_MESSAGE });
});

exports.addSearchHistory = asyncHandler(async (req, res, next) => {
    await dbServices.addHistory(req.user, req.body);
    successResponse({ res, message: CONSTANTS.SUCCESS});
});



