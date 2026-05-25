// backend/src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const UserModel = require('../model/user.model'); // Adjust path to your user model

const authInterviewRoom = async (req, res, next) => {
    try {
        // 1. Get the token from cookies (requires cookie-parser)
        const token = req.cookies?.token;

        // Alternative: If you use headers instead of cookies, use this line:
        // const token = req.headers.authorization?.split(" ")[1];

        // 2. Check if token exists
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                error: "Access Denied. No token provided." 
            });
        }

        // 3. Verify the token using your secret key from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 4. Find the user in the database
        // Select("-password") ensures we don't accidentally pass the hash around
        const user = await UserModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                error: "Invalid token. User no longer exists." 
            });
        }

        // 5. Inject the user object into the request
        // Now, req.user is available in all controllers that follow this middleware
        req.user = user;

        // 6. Proceed to the actual controller
        next();
        
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({ 
            success: false, 
            error: "Token is invalid or expired." 
        });
    }
};

module.exports = authInterviewRoom ;