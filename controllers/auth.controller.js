const authService = require('../services/auth.service');

const authController = {
    async register(req, res) {
        try {
            const { email, password, fullName } = req.body;
            if (!email || !password || !fullName) {
                return res.status(400).json({ error: 'Faltan campos obligatorios.' });
            }
            const newUser = await authService.register(req.body);
            return res.status(201).json({ message: 'Usuario registrado con éxito', data: newUser });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: 'Faltan correo y contraseña.' });
            }
            const session = await authService.login(email, password);
            return res.status(200).json({ message: 'Inicio de sesión exitoso', data: session });
        } catch (err) {
            return res.status(401).json({ error: err.message });
        }
    }
};

module.exports = authController;