// Elementos de Registro
const registerBtn = document.getElementById("registerBtn");
const regNombreInput = document.getElementById("regNombre");
const regCorreoInput = document.getElementById("regCorreo");
const regPasswordInput = document.getElementById("regPassword");
const registerResult = document.getElementById("registerResult");

// Elementos de Login
const loginBtn = document.getElementById("loginBtn");
const loginCorreoInput = document.getElementById("loginCorreo");
const loginPasswordInput = document.getElementById("loginPassword");
const loginResult = document.getElementById("loginResult");

// Evento para Registrar
registerBtn.addEventListener('click', async function () {
    const data = {
        fullName: regNombreInput.value,
        email: regCorreoInput.value,
        password: regPasswordInput.value,
        role: "Cliente"
    };

    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        if (response.ok) {
            registerResult.innerHTML = `
                <div style="background-color: #f3e8ff; color: #581c87; padding: 12px; border-radius: 6px; border: 1px solid #d8b4fe;">
                    <strong>Registro Exitoso</strong><br>
                    <span>${result.message}</span><br>
                    <hr style="border: 0; border-top: 1px solid #d8b4fe; margin: 8px 0;">
                    <small>ID: <b>${result.data.id}</b> | Correo: <b>${result.data.email || result.data.correo_electronico}</b></small>
                </div>
            `;
        } else {
            registerResult.innerHTML = `
                <div style="background-color: #faf5ff; color: #6b21a8; padding: 12px; border-radius: 6px; border: 1px solid #e9d5ff;">
                    <strong>Aviso</strong><br>
                    <span>${result.error || 'No se pudo completar el registro.'}</span>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        registerResult.innerHTML = `
            <div style="background-color: #faf5ff; color: #6b21a8; padding: 12px; border-radius: 6px; border: 1px solid #e9d5ff;">
                <strong>Error de conexion</strong><br>
                <span>No se pudo conectar con el servidor.</span>
            </div>
        `;
    }
});

// Evento para Iniciar Sesion
loginBtn.addEventListener('click', async function () {
    const data = {
        email: loginCorreoInput.value,
        password: loginPasswordInput.value
    };

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            loginResult.innerHTML = `
                <div style="background-color: #f3e8ff; color: #581c87; padding: 12px; border-radius: 6px; border: 1px solid #d8b4fe;">
                    <strong>Sesion Iniciada</strong><br>
                    <span>${result.message}</span><br>
                    <hr style="border: 0; border-top: 1px solid #d8b4fe; margin: 8px 0;">
                    <small>Usuario: <b>${result.data.fullName || result.data.nombre_completo}</b> (${result.data.role || result.data.rol})</small>
                </div>
            `;
        } else {
            loginResult.innerHTML = `
                <div style="background-color: #faf5ff; color: #6b21a8; padding: 12px; border-radius: 6px; border: 1px solid #e9d5ff;">
                    <strong>Acceso Denegado</strong><br>
                    <span>${result.error || 'Credenciales invalidas.'}</span>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error:', error);
        loginResult.innerHTML = `
            <div style="background-color: #faf5ff; color: #6b21a8; padding: 12px; border-radius: 6px; border: 1px solid #e9d5ff;">
                <strong>Error de conexion</strong><br>
                <span>No se pudo conectar con el servidor.</span>
            </div>
        `;
    }
});