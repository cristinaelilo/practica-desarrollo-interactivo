<script setup>
import { ref, computed, onMounted } from 'vue'
import UserCard from './components/UserCard.vue'
import { searchUsers } from './utils/searchUsers'

// Variables de estado
const users = ref([])
const loading = ref(true)
const error = ref('')
const search = ref('')
const favorites = ref([])

// Pedir los usuarios a la API
async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')

    // Si la respuesta no es correcta, mandamos un error
    if (!response.ok) {
      throw new Error('Respuesta incorrecta')
    }

    users.value = await response.json()
  } catch (e) {
    error.value = 'No se pudieron cargar los usuarios.'
  } finally {
    loading.value = false
  }
}

// Lista filtrada según lo que se escribe en el buscador
const filteredUsers = computed(function () {
  return searchUsers(users.value, search.value)
})

// Agrega o quita un usuario de favoritos
function toggleFavorite(id) {
  if (favorites.value.includes(id)) {
    favorites.value = favorites.value.filter(function (favId) {
      return favId !== id
    })
  } else {
    favorites.value.push(id)
  }
}

// Cuando la página carga, se llama a la API
onMounted(function () {
  getUsers()
})
</script>

<template>
  <div class="container">
    <h1>Directorio de usuarios</h1>

    <p>Favoritos: {{ favorites.length }}</p>

    <input
      v-model="search"
      type="text"
      placeholder="Buscar por nombre"
    />

    <p v-if="loading">Cargando...</p>

    <p v-else-if="error" class="error">{{ error }}</p>

    <p v-else-if="filteredUsers.length === 0">
      No se encontraron usuarios.
    </p>

    <div v-else class="grid">
      <UserCard
        v-for="user in filteredUsers"
        :key="user.id"
        :user="user"
        :is-favorite="favorites.includes(user.id)"
        @toggle-favorite="toggleFavorite"
      />
    </div>
  </div>
</template>
