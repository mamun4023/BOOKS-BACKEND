
const router = require('express').Router();
const errorCatcher = require('../errorHandlers/errorCatcher')
const userControllers = require("../controllers/user");
const {isUser} = require('../middlewares/auth')

router.post("/sign-up", userControllers.signUp);
router.post("/sign-in", userControllers.signIn);
router.get('/me', isUser, userControllers.userDetail)
router.post("/logout", isUser, userControllers.logout);
router.post('/add-history', isUser, userControllers.addSearchHistory)

router.use("*", (req, res, next)=>{
    next(new errorCatcher("Route does not exist!"))
})

module.exports = router;
