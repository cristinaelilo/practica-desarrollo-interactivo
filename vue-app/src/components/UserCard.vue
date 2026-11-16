<script setup>
// Datos que recibe del componente padre
defineProps({
  user: {
    type: Object,
    required: true
  },
  isFavorite: {
    type: Boolean,
    default: false
  }
})

// Evento que avisa al padre cuando se presiona el botón
const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <div class="card" :class="{ favorite: isFavorite }">
    <h3>{{ user.name }}</h3>
    <p><strong>Correo:</strong> {{ user.email }}</p>
    <p><strong>Ciudad:</strong> {{ user.address.city }}</p>

    <button @click="emit('toggle-favorite', user.id)">
      {{ isFavorite ? 'Quitar favorito' : 'Favorito' }}
    </button>
  </div>
</template>
