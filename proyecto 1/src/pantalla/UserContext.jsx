import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  return useContext(UserContext)
}

export const UserProvider = ({ children }) => {
  const [logged, setLogged] = useState(false)
  const [loggedUser, setLoggedUser] = useState('')
  const [permisos, setPermisos] = useState('')

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('logged') === 'true'
    setLogged(isLoggedIn)

    const storedUser = localStorage.getItem('loggedUser')
    if (storedUser) {
      setLoggedUser(storedUser)
    }

    const storedPermisos = localStorage.getItem('permisos')
    if (storedPermisos) {
      setPermisos(storedPermisos)
    }
  }, [])

  const login = () => {
    setLogged(true)
    localStorage.setItem('logged', 'true')
  }

  const logout = () => {
    setLogged(false)
    localStorage.setItem('logged', 'false')

    setLoggedUser('')
    localStorage.setItem('loggedUser', '')

    setPermisos('')
    localStorage.setItem('permisos', '')
  }

  const userName = (nombreUsuario) => {
    setLoggedUser(nombreUsuario)
    localStorage.setItem('loggedUser', nombreUsuario)
  }

  const userPermisos = (permisosUsuario) => {
    setPermisos(permisosUsuario)
    localStorage.setItem('permisos', permisosUsuario)
  }

  return (
    <UserContext.Provider value={{ logged, loggedUser, permisos, login, logout, userName, userPermisos }}>
      {children}
    </UserContext.Provider>
  )
}
