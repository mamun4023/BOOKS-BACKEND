const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const generateToken = async (user) => {
    const token = await jwt.sign(
        { _id: user?._id, email: user?.email, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
    return token;
};

const passwordMatching = async (savedPassword, givenPassword) => {
    return await bcrypt.compare(savedPassword, givenPassword);
};

module.exports = { generateToken, passwordMatching };
