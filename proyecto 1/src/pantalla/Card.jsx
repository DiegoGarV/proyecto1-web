import PropTypes from 'prop-types'
import tresPuntos from '../Imagenes/tres_puntos.png'
import React, { useState, useEffect, useRef } from 'react'

const Card = ({title, content, image, description, user, setRoute}) => {
    const [showOptions, setShowOptions] = useState(false)
    const modalRef = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

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
        const cardRect = modalRef.current.getBoundingClientRect()
        setShowOptions(true)
        setPosition({x: clientX, y: clientY})
    }

    const toEdit = () => {
        setShowOptions(false)
        setRoute('/editPost')
    }

    const handleDelete = () => {
        setShowOptions(false)
        console.log("Se eliminó")
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
                <div ref={modalRef} style={{ position: 'absolute', top: `${position.y}px`, left: `${position.x}px`, background: 'white', padding: '20px', borderRadius: '10px', zIndex: 999}}>
                    <button onClick={toEdit} style={{ marginRight: '10px' }}>Editar</button>
                    <button onClick={handleDelete}>Eliminar</button>
                </div>
            )}
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    setRoute: PropTypes.func.isRequired
}

export default Card