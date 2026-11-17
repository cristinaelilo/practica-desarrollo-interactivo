// Datos que recibe del componente padre:
// user, isFavorite y la función onToggleFavorite
function UserCard({ user, isFavorite, onToggleFavorite }) {
  return (
    <div className={isFavorite ? 'card favorite' : 'card'}>
      <h3>{user.name}</h3>
      <p><strong>Correo:</strong> {user.email}</p>
      <p><strong>Ciudad:</strong> {user.address.city}</p>

      {/* Al presionar, avisamos al padre con el id del usuario */}
      <button onClick={() => onToggleFavorite(user.id)}>
        {isFavorite ? 'Quitar favorito' : 'Favorito'}
      </button>
    </div>
  )
}

export default UserCard
