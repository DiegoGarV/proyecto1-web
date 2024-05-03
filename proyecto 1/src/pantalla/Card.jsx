import PropTypes from 'prop-types'
import tresPuntos from '../Imagenes/tres_puntos.png'
import React, { useState, useEffect, useRef } from 'react'
import { useUser } from './UserContext'

const Card = ({blogId, title, content, image, description, user, setRoute, refreshPosts}) => {
    const [showOptions, setShowOptions] = useState(false)
    const modalRef = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const {loggedUser, permisos} = useUser()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])

    const postSettings = (event) => {
        event.stopPropagation()
        const {clientX, clientY} = event
        const rect = event.target.getBoundingClientRect()
        setShowOptions(true)
        setPosition({x: clientX - rect.left/2.1, y: clientY - rect.top})
    }

    const toEdit = () => {
        setShowOptions(false)
        // console.log(`Lo que debería de mandarse es: /editPost/${blogId}`)
        setRoute(`/editPost/${blogId}`)
        window.history.pushState({},"",`/editPost/${blogId}`)
    }

    const handleDelete = async() => {
        setShowOptions(false)
        try {
            const response = await fetch(`http://127.0.0.1:3000/blogs/${blogId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                setRoute('/')
                window.history.pushState({},"","/")
                refreshPosts()
                // console.log(`Se borro el post ${blogId}`)
            } else {
                const data = await response.json()
                console.log(`Error: ${data}`)
            }
        } catch (error){
            console.error('Error al cargar la API:', error)
        }
    }
    
    return (
        <div id="card" style={{
            height: 'auto',
            width: '50%',
            background: 'linear-gradient(to right, #faae46, #facd73)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: '20px',
            paddingRight: '20px',
            paddingBottom: '20px',
            borderRadius: '20px',
            position: 'relative',
            border: '5px solid #c0240c',
            marginBottom: '20px'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <span style={{ marginRight: '10px', color: 'black', fontStyle: 'italic'}}>{user}</span>
                <img 
                    src={tresPuntos} 
                    alt="settings" 
                    style={{ width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer' }} 
                    onClick={(event) => postSettings(event)} />
            </div>
            <div id = "postText">
                <h1 style={{color: 'black'}}>{title}</h1>
                <p style={{color: 'black'}}>{content}</p>
            </div>
            <img src={image} alt={description} style={{ width: '100%', maxHeight: '50%', borderRadius: '10px', marginBottom: '5px' }} />

            {showOptions && (
                <div ref={modalRef} style={{ position: 'absolute', top: `${position.y}px`, left: `${position.x}px`, background: 'white', zIndex: 999}}>
                    {permisos === 'admin' || loggedUser === user ? (
                        <>
                            <button
                                onMouseOver={(e) => e.target.style.background = 'lightgrey'}
                                onMouseOut={(e) => e.target.style.background = 'white'}
                                onClick={toEdit}
                                style={{ width: '100%', padding: '10px', border: 'none', cursor: 'pointer', background: 'white', color: 'black', borderRadius: '0px' }}>Editar</button>
                            <button
                                onMouseOver={(e) => e.target.style.background = 'lightgrey'}
                                onMouseOut={(e) => e.target.style.background = 'white'}
                                onClick={handleDelete}
                                style={{ width: '100%', padding: '10px', border: 'none', cursor: 'pointer', background: 'white', color: 'black', borderRadius: '0px' }}>Eliminar</button>
                        </>
                    ) : (
                        <button
                            onClick={() => setShowOptions(false)}
                            style={{ width: '100%', padding: '10px', border: 'none', cursor: 'pointer', background: 'white', color: 'black', borderRadius: '0px' }}>Reportar</button>
                    )}
                </div>
            )}
        </div>
    )
}

Card.propTypes = {
    blogId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    setRoute: PropTypes.func.isRequired,
    refreshPosts: PropTypes.func.isRequired
}

export default Card