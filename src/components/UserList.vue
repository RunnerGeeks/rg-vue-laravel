<template>
  <!-- Define la estructura del componente -->
  <v-container>
    <!-- Crea una tabla de datos con los usuarios -->
    <v-data-table
      :headers="headers"
      :items="users"
      class="elevation-1"
    >
      <!-- Define cómo se mostrará el nombre del usuario -->
      <template v-slot:item.name="{ item }">
        <v-chip>{{ item.name }}</v-chip>
      </template>
      <!-- Define cómo se mostrará el correo electrónico del usuario -->
      <template v-slot:item.email="{ item }">
        <v-chip>{{ item.email }}</v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
// Importa las funciones necesarias de Vue
import { ref, onMounted } from 'vue';
// Importa axios para realizar solicitudes HTTP
import axios from 'axios';
// Importa el router para navegar entre rutas
import { useRouter } from 'vue-router';

export default {
  setup() {
      // Define las propiedades reactivas para los usuarios y las cabeceras de la tabla
      const users = ref([]);
      const headers = [
          { text: 'Nombre', value: 'name' },
          { text: 'Email', value: 'email' }
      ];
      // Usa el router
      const router = useRouter();

      // Define la función que se ejecutará cuando se monte el componente
      onMounted(async () => {
          // Obtiene el token del almacenamiento local
          const token = localStorage.getItem('token');
          // Si no hay token, redirige al usuario a la página de inicio de sesión
          if (!token) {
              router.push('/login');
          } else {
              try {
                  // Realiza la solicitud para obtener los usuarios
                  const response = await axios.get('https://api.runnergeeks.com/api/users', {
                      headers: {
                          'Authorization': `Bearer ${token}`
                      }
                  });
                  // Guarda los usuarios en la propiedad reactiva
                  users.value = response.data.users;
              } catch (error) {
                  // Si ocurre un error, lo muestra en la consola
                  console.error(error);
              }
          }
      });

      // Devuelve las propiedades y funciones que se utilizarán en la plantilla
      return {
          users, headers
      };
  }
};
</script>
