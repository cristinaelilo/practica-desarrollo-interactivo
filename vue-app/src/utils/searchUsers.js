// recibe la lista de usuarios y el texto escrito
// devuelve solo los usuarios cuyo nombre contiene ese texto
export function searchUsers(users, text) {
  const word = text.trim().toLowerCase()

  return users.filter(function (user) {
    return user.name.toLowerCase().includes(word)
  })
}
