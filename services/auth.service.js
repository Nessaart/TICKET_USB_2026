const userDao = require('../dao/user.dao');

const authService = {
    async register(userData) {
        const email = userData.email || userData.correo_electronico;
        const fullName = userData.fullName || userData.nombre_completo;
        const role = userData.role || userData.rol || 'Cliente';
        const password = userData.password;

        const existingUser = await userDao.findByEmail(email);
        if (existingUser) {
            throw new Error('El correo electrónico ya se encuentra registrado.');
        }

        const dbUserData = {
            email: email,
            fullName: fullName,
            password: password,
            role: role
        };

        const userId = await userDao.create(dbUserData);
        return { id: userId, email: email, fullName: fullName };
    },

    async login(email, password) {
        const user = await userDao.findByEmail(email);
        if (!user || user.password !== password) {
            throw new Error('Credenciales inválidas.');
        }
        return {
            id: user.id,
            fullName: user.nombre_completo,
            email: user.correo_electronico,
            role: user.rol
        };
    }
};

module.exports = authService;