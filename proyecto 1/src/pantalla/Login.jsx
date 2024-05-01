import React, { useState } from 'react'
import { useUser } from './UserContext'

const Login = ({ setRoute }) => {
    const { login, userName, userPermisos, loggedUser, permisos } = useUser()
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async() => {
        try {
            const response = await fetch('http://127.0.0.1:3000/users')
            const jsonData = await response.json()
            const usersData = jsonData.data

            const user = usersData.find(user => user.nombre === usuario)

            if (user && user.contrasena === password) {
                userName(user.nombre)
                userPermisos(user.posicion)
                login()
                setRoute('/')
                // console.log(`El usuario ${loggedUser} tiene los permisos ${permisos}`)
            } else {
                setError('Usuario o contraseña no válidos')
            }

        } catch (error) {
            console.error('Error al cargar la API:', error)
            setError('Error al cargar la API')
        }
    }

    const toSignin = () => {
        setRoute('/signin')
    }
    
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div id="card" style={{
                width: '40%',
                background: 'linear-gradient(to right, #faae46, #facd73)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                borderRadius: '20px',
                border: '5px solid #c0240c'
            }}>
                <h1 style={{ color: 'black', marginBottom: '20px' }}>Inicio de Sesión</h1>
                <div className="datos-login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label style={{ color: 'black', marginBottom: '10px', alignSelf: 'start' }}>Usuario:</label>
                    <input
                        type="usuario"
                        id="usuario"
                        name="usuario"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor: 'white', color: 'black', borderRadius: '5px', border: `2px solid ${error ? 'red' : 'black'}` }}
                    />
                    <label style={{ color: 'black', marginBottom: '10px', alignSelf: 'start' }}>Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '5px', backgroundColor: 'white', color: 'black', borderRadius: '5px', border: `2px solid ${error ? 'red' : 'black'}` }}
                    />
                    {error && <p style={{color: 'red', marginBottom: '20px'}}>{error}</p>}
                </div>
                <div className="button" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <button onClick={handleLogin} style={{ flex: 1, padding: '10px 20px', backgroundColor: '#648e46', color: 'Black', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Iniciar Sesión</button>
                    <button onClick={toSignin} style={{ flex: 1, marginLeft: '10px', padding: '10px 20px', backgroundColor: '#6e9fbd', color: 'Black', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Registrarse</button>
                </div>
            </div>
        </div>
    )
}

export default Login
