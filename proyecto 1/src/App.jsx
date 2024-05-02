import { useEffect, useState } from 'react'
import { UserProvider } from './pantalla/UserContext'
import './App.css'
import Router from './pantalla/Router'

function App() {
  
  const [rutaActual, setRutaActual] = useState("app")
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [])

  useEffect(() => {
    console.log("Se ha montado el componente")
    console.log("RUTA ACTUAL: ", window.location.pathname)
    setRutaActual(window.location.pathname)
    console.log(window.location)

  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const getBackgroundClass = () => {
    switch (rutaActual) {
      case "/":
        return "bg-image-1"
      case "/login":
        return "bg-image-2"
      case "/signin":
        return "bg-image-2"
      case "/addPost":
        return "bg-image-3"
      case rutaActual.startsWith("/editPost") && rutaActual:
        return "bg-image-3"
      default:
        return "bg-image-4"
    }
  }

  return (
    <UserProvider>
      <div id='root' className={getBackgroundClass()}>
        <div className='sitio-web'>
          <div className='paginas'>
              <Router ruta={rutaActual} setRoute={setRutaActual}></Router> 
          </div>
        </div>
      </div>
    </UserProvider>
  )
}

export default App
