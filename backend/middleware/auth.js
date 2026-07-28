import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(401).json({ success: false, message: "Token not provided. Please login." })
        }

        let authToken = token.split(' ')[1];
        if (!authToken) {
            return res.status(401).json({ success: false, message: "Invalid token format" })
        }

        let decodeToken = jwt.verify(authToken, process.env.JWT_SECRET || "placement_portal_jwt_secret_2024");
        req.user = decodeToken;
        next()
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token expired. Please login again." })
        }
        return res.status(401).json({ success: false, message: "Invalid token. Please login." })
    }
}