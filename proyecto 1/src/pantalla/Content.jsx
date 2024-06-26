import PropTypes from 'prop-types'
import Card from './Card'
import Loading from './Loading'
import NoPosts from './NoPosts'
import { useEffect, useState } from 'react'
import gameLogo from '../Imagenes/game logo.png'

const Content = ({ setRoute, searchValue }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    async function apiCall() {
        try {
            const response = await fetch('http://uwu-guate.site:3560/blogs')
            const jsonData = await response.json()
    
            const blogsData = jsonData.data
    
            const enhancedBlogData = await Promise.all(
                blogsData.map(async (blog) => {
                    const userId = blog.user_id
                    const userResponse = await fetch(`http://uwu-guate.site:3560/users/${userId}`)
                    const userData = await userResponse.json()
                    // console.log(`Los datos obtenidos del id ${userId} son:`, userData)
                    if (userData && userData.data && userData.data[0].nombre) {
                        const username = userData.data[0].nombre
                        // console.log(`Nombre obtenido para userId ${userId}:`, username)

                        return {
                            ...blog,
                            username: username
                        }
                    } else {
                        // console.log(`Error al obtener el nombre para userId ${userId}: Datos incompletos`)
                        return blog
                    }
                })
            )
            setData(enhancedBlogData)
            setLoading(false)
        } catch (error) {
            console.error('Error al cargar la API:', error)
            setLoading(false)
        }
    }

    const filteredData = data.filter(post =>
        post.title.includes(searchValue) ||
        post.username.includes(searchValue) ||
        post.content.includes(searchValue)
    )

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            apiCall()
            setLoading(false)
        },1500)
    }, [searchValue])

    if (loading) {
        return(<Loading />)
    } else if (data.length === 0) {
        return (<NoPosts />)
    }

    return (
        <div id="content" style={{
            height:'auto',
            width:'100%', 
            boxSizing: 'border-box',
            backgroundColor:'rgba(250,250,250,0)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
            marginTop: '30px'
        }}>
            <img src={gameLogo} alt="Logo" style={{ 
                width: '40%',
                height: 'auto',
                marginBottom: '20px'
            }} />
            <div className='datos' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {filteredData.map(elemento => (
                    <Card key={elemento.id} blogId={elemento.id} title={elemento.title} content={elemento.content} image={elemento.item_image} description={elemento.image_description} user={elemento.username} setRoute={setRoute} refreshPosts={apiCall}/>
                ))}
            </div>
        </div>
    )
}

Content.propTypes = {
    setRoute: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired
}

export default Content