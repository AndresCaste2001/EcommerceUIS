import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Token no proporcionado" });
        }

        const token = authHeader.substring(7); // Remove "Bearer " prefix

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request

        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expirado" });
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Token inválido" });
        }
        res.status(500).json({ error: "Error verificando token" });
    }
}