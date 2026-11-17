import { useState, useEffect } from 'react'
import UserCard from './components/UserCard'
import { searchUsers } from './utils/searchUsers'

function App() {
  // Variables de estado
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState([])

  // Cuando la página carga, se llama a la API
  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')

        // Si la respuesta no es correcta, mandamos un error
        if (!response.ok) {
          throw new Error('Respuesta incorrecta')
        }

        const data = await response.json()
        setUsers(data)
      } catch (e) {
        setError('No se pudieron cargar los usuarios.')
      } finally {
        setLoading(false)
      }
    }

    getUsers()
  }, [])

  // Lista filtrada según lo que se escribe en el buscador
  const filteredUsers = searchUsers(users, search)

  // Agrega o quita un usuario de favoritos
  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(function (favId) {
        return favId !== id
      }))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <div className="container">
      <h1>Directorio de usuarios</h1>

      <p>Favoritos: {favorites.length}</p>

      <input
        type="text"
        placeholder="Buscar por nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Cargando...</p>}

      {!loading && error && <p className="error">{error}</p>}

      {!loading && !error && filteredUsers.length === 0 && (
        <p>No se encontraron usuarios.</p>
      )}

      {!loading && !error && filteredUsers.length > 0 && (
        <div className="grid">
          {filteredUsers.map(function (user) {
            return (
              <UserCard
                key={user.id}
                user={user}
                isFavorite={favorites.includes(user.id)}
                onToggleFavorite={toggleFavorite}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App
