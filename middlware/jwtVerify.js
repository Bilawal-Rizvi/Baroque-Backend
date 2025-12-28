import jwt from 'jsonwebtoken';

import dotenv from "dotenv";
dotenv.config();
export  const jwtVerify = function (req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    // Bearer token check
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied. Invalid token format." });
    }

    const token = authHeader.split(' ')[1];
    // console.log(token)

    try {
        const verified = jwt.verify(token,process.env.JWT_SECRET ); // Ensure this matches the secret used to sign the token
         req.userId = verified._id;
    req.userEmail = verified.email; // attach user payload
    req.role = verified.role;
        next(); // only call next() if token is valid
    } catch(err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token Expired" });
        }
        return res.status(401).json({ message: "Invalid Token" });
    }
};
