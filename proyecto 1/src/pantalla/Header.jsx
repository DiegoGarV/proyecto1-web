import PropTypes from 'prop-types'
import { useUser } from './UserContext'
import { useEffect, useState } from 'react'

const Header = ({ setRoute, setSearchValue }) => {
    const {logged, logout, loggedUser, permisos} = useUser()
    const [showAlert, setShowAlert] = useState(false)

    const handleLogin = () => {
        if (logged) {
            logout()
            setRoute('/')
        } else {
            window.history.pushState({},"","/login")
            setRoute('/login')
        }
    }

    // useEffect(() => {
    //     if (!logged) {
    //         console.log(`El usuario y los permisos se borraron correctamente: ${loggedUser} ${permisos}`)
    //     } else {
    //         console.log(`El usuario y los permisos son: ${loggedUser} ${permisos}`)
    //     }
    // }, [logged])

    const toNewPost = () => {
        if (loggedUser) {
            window.history.pushState({},"","/addPost")
            setRoute('/addPost')
        } else {
            setShowAlert(true)
        }
    }

    const closeAlert = () => {
        setShowAlert(false)
    }

    const searchPost = (event) => {
        if (event.key === 'Enter') {
            setSearchValue(event.target.value)
        }
    }
    
    return (
        <div id='header' style={{
            height:'auto',
            width:'100%',
            backgroundColor:'rgba(55,79,137,0.7)',
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
                onKeyDown={searchPost}
            />
            <button 
                style={{
                    backgroundColor: logged ? '#d94423' : '#55a61d',
                    color: 'black',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                }}
                onClick={handleLogin}    
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
                onClick={toNewPost}
                >
                Agregar Post
            </button>

            {showAlert && (
                <div style={{position: 'absolute', top: '50%', left: '35%', backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px', zIndex: 999 }}>
                    Debes iniciar sesión para agregar un post.
                    <button style={{ marginLeft: '10px', backgroundColor: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }} onClick={closeAlert}>Cerrar</button>
                </div>
            )}
        </div>
    )
}

Header.protoType = {
    setRoute: PropTypes.func.isRequired,
    setSearchValue: PropTypes.func.isRequired
}

export default Header