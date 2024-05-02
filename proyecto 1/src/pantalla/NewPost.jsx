import { useState } from 'react'
import { useUser } from './UserContext'
import arrow from '../Imagenes/white_arrow.png'

const NewPost = ({ setRoute }) => {
    const { loggedUser } = useUser()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [imageDescription, setImageDescription] = useState('')
    const [error, setError] = useState('')

    const handleCreatePost = async() => {
        try {
            const description = imageDescription || 'imagen del post'

            if(title && content && image){
                if (validarURL(image)) {
                    const res = await fetch('http://127.0.0.1:3000/users')
                    const jsonData = await res.json()
                    const usersData = jsonData.data
        
                    const user = usersData.find(user => user.nombre === loggedUser)
                    const userIdAsString = String(user.id)

                    // console.log("Body de la solicitud:", JSON.stringify({
                    //     title: title,
                    //     content: content,
                    //     item_image: image,
                    //     image_description: description,
                    //     user_id: userIdAsString
                    // }))

                    const response = await fetch('http://127.0.0.1:3000/blogs', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            title: title,
                            content: content,
                            item_image: image,
                            image_description: description,
                            user_id: userIdAsString
                        })
                    })

                    if (response.ok) {
                        setRoute('/')
                    } else {
                        const data = await response.json()
                        setError(data.error || 'Error al crear el post')
                    }
                } else {
                    setError('El URL de la imagen no es válido.')
                }
            } else {
                setError('Las casillas no deben de estar vacias')
            }
            
        } catch (error) {
            console.error('Error al cargar la API:', error)
            setError('Error al cargar la API')
        }
    }

    const validarURL = (url) => {
        try {
            new URL(url)
            return true
        } catch (error) {
            return false
        }
    }

    const returnHome = () => {
        setRoute('/')
    }
    
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <div id="return" style={{ alignSelf: 'start', margin: '10px' }}>
                <button onClick={returnHome} style={{ display: 'flex', padding: '10px', alignItems: 'center', backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }}>
                    <img src={arrow} alt='return arrow' style={{width: '30%', height: '30%', marginRight: '5px', transform: 'scaleX(-1)'}}></img>
                    <h2>Regresar</h2>
                </button>
            </div>
            <div id="card" style={{
                width: '60%',
                background: 'linear-gradient(to right, #faae46, #facd73)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
                borderRadius: '20px',
                border: '5px solid #c0240c'
            }}>
                <div className="datos-login" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90%' }}>
                    <h2 style={{ color: 'black', marginBottom: '10px', alignSelf: 'start' }}>Título:</h2>
                    <input
                        type="title"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor: 'white', color: 'black', borderRadius: '5px', border: `2px solid ${error ? 'red' : 'black'}` }}
                    />
                    <h2 style={{ color: 'black', marginBottom: '10px', alignSelf: 'start' }}>Contenido:</h2>
                    <textarea
                        type="content"
                        id="content"
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        style={{ width: '100%', height:'150px', padding: '10px', marginBottom: '5px', backgroundColor: 'white', color: 'black', borderRadius: '5px', border: `2px solid ${error ? 'red' : 'black'}` }}
                    />
                    <h2 style={{ color: 'black', marginBottom: '10px', alignSelf: 'start' }}>URL de la imagen:</h2>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '5px', backgroundColor: 'white', color: 'black', borderRadius: '5px', border: `2px solid ${error ? 'red' : 'black'}` }}
                    />
                    <h2 style={{ color: 'black', marginBottom: '10px', alignSelf: 'start' }}>Descripcion de la imagen:</h2>
                    <input
                        type="imageDescription"
                        id="imageDescription"
                        name="imageDescription"
                        value={imageDescription}
                        onChange={(e) => setImageDescription(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '5px', backgroundColor: 'white', color: 'black', borderRadius: '5px', border: `2px solid ${error ? 'red' : 'black'}` }}
                    />
                    {error && <p style={{color: 'red', marginBottom: '20px'}}>{error}</p>}
                </div>
                <div className="button" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10px' }}>
                    <button onClick={handleCreatePost} style={{ flex: 1, padding: '10px 20px', backgroundColor: '#648e46', color: 'Black', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Crear post</button>
                </div>
            </div>
        </div>
    )
}

export default NewPost
