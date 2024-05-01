import PropTypes from 'prop-types'
import Header from './Header'
import Content from './Content'
import NewPost from './NewPost'
import Login from './Login'
import Signin from './Signin'
import EditPost from './EditPost'

function Router({ ruta, setRoute, tasks, setTasks }) {

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
        case "/editPost":
            return <EditPost setRoute={setRoute}/>
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
    setRoute: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    setTasks: PropTypes.func.isRequired,
};

export default Router