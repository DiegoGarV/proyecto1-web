import PropTypes from 'prop-types'
import Header from './Header'
import Content from './Content'
import NewPost from './NewPost'
import Login from './Login'
import Signin from './Signin'
import EditPost from './EditPost'

function Router({ ruta, setRoute }) {

    let blogId = null;
    if (ruta.startsWith('/editPost/')) {
        blogId = ruta.split('/')[2]
    }

    switch (ruta) {
        case "/":
            return(
                <>
                    <Header setRoute={setRoute}/>
                    <Content setRoute={setRoute}/>
                </>
            )
        case "/addPost":
            return <NewPost setRoute={setRoute}/>
        case ruta.startsWith("/editPost/") && ruta:
            return <EditPost setRoute={setRoute} blogId={blogId}/>
        case "/login":
            return <Login setRoute={setRoute}/>
        case "/signin":
            return <Signin setRoute={setRoute}/>
        default:
           return null 
    }
}

Router.propTypes = {
    ruta: PropTypes.string.isRequired,
    setRoute: PropTypes.func.isRequired
};

export default Router