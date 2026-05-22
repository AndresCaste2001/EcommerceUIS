import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "10m";

export class AuthController {
    static async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({
                    error: "Usuario y contraseña son requeridos"
                });
            }

            // Find user in database
            const user = await User.findByUsername(username);
            if (!user) {
                return res.status(401).json({
                    error: "Usuario o contraseña incorrectos"
                });
            }

            // Check password (in production, use bcrypt for hashing!)
            if (user.password !== password) {
                return res.status(401).json({
                    error: "Usuario o contraseña incorrectos"
                });
            }

            // Create JWT token
            const token = jwt.sign(
                { id: user.id, username: user.username },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username
                }
            });
        } catch (err) {
            console.error("Login error:", err);
            res.status(500).json({ error: "Error en el login" });
        }
    }

    static async register(req, res) {
        try {
            const { username, email, password, passwordConfirm } = req.body;

            if (!username || !email || !password) {
                return res.status(400).json({
                    error: "Usuario, email y contraseña son requeridos"
                });
            }

            if (password !== passwordConfirm) {
                return res.status(400).json({
                    error: "Las contraseñas no coinciden"
                });
            }

            // Check if user already exists
            const existingUser = await User.findByUsername(username);
            if (existingUser) {
                return res.status(409).json({
                    error: "El usuario ya existe"
                });
            }

            // Create user
            const newUser = await User.create({ username, email, password });

            // Create token
            const token = jwt.sign(
                { id: newUser.id, username: newUser.username },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            res.status(201).json({
                token,
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email
                }
            });
        } catch (err) {
            console.error("Register error:", err);
            res.status(500).json({ error: "Error en el registro" });
        }
    }

    static async me(req, res) {
        try {
            const userId = req.user.id;
            const user = await User.getById(userId);
            
            if (!user) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            res.json(user);
        } catch (err) {
            console.error("Me error:", err);
            res.status(500).json({ error: "Error obteniendo usuario" });
        }
    }
}