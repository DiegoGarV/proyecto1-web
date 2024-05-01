import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Header = ({ setRoute }) => {
    const [logged, setLogged] = useState(false)

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('logged') === 'true'
        setLogged(isLoggedIn)
    }, [])

    const toggleLogin = () => {
        if (logged) {
            setLogged(false)
            localStorage.setItem('logged', 'false')
        } else {
            toLogin()
        }
    }

    const toAddPost = () => {
        setRoute('/addPost')
    }

    const toLogin = () => {
        setRoute('/login')
    }
    
    return (
        <div id='header' style={{
            height:'auto',
            width:'100%',
            backgroundColor:'rgba(5,94,150,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            boxSizing: 'border-box',
            paddingTop: '20px',
            paddingBottom: '20px'
        }}>
            <input 
                type="text" 
                placeholder="Buscar post..." 
                style={{
                    width: '50%',
                    backgroundColor: 'white',
                    color: 'black',
                    padding: '10px',
                    borderRadius: '5px',
                    border: 'none',
                }} 
            />

            <button 
                style={{
                    backgroundColor: logged ? 'red' : 'green',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                }}
                onClick={toggleLogin}    
            >
                {logged ? 'Cerrar Sesión' : 'Iniciar Sesión'}
            </button>

            <button 
                style={{
                    background: 'linear-gradient(to right, #faae46, #facd73)',
                    color: 'black',
                    border: '1px solid #c0240c',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                }}
                onClick={toAddPost}
                >
                Agregar Post
            </button>
        </div>
    )
}

Header.protoType = {
    setRoute: PropTypes.func.isRequired,
}

export default Header