<template>
  <!-- Define la estructura de la aplicación -->
  <v-app>
    <!-- Define la barra de la aplicación -->
    <v-app-bar app color="primary" dark>
      <!-- Define el título de la barra de la aplicación -->
      <v-toolbar-title>Laravel & VueJS</v-toolbar-title>
      <!-- Añade un espacio entre el título y el botón de cierre de sesión -->
      <v-spacer></v-spacer>
      <!-- Define el botón de cierre de sesión, que se muestra si el usuario está autenticado -->
      <v-btn v-if="auth.isAuthenticated" text @click="logout">Cerrar Sesion</v-btn>
    </v-app-bar>
    <!-- Define el contenido principal de la aplicación -->
    <v-main>
      <!-- Define la vista del router, que cambiará dependiendo de la ruta actual -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// Importa las funciones necesarias de Vue
import { onMounted, onUnmounted } from 'vue';
// Importa la tienda de autenticación
import { useAuthStore } from './store';
// Importa el router
import { useRouter } from 'vue-router';

export default {
  setup() {
    // Usa la tienda de autenticación
    const auth = useAuthStore();
    // Usa el router
    const router = useRouter();

    // Define una función para comprobar si el usuario está autenticado
    const checkAuth = () => {
      auth.checkAuth();
    };

    // Comprueba si el usuario está autenticado cuando se monta el componente
    onMounted(checkAuth);
    // Comprueba si el usuario está autenticado cuando cambia el almacenamiento local
    window.addEventListener('storage', checkAuth);
    // Elimina el controlador del evento cuando se desmonta el componente
    onUnmounted(() => {
      window.removeEventListener('storage', checkAuth);
    });

    // Define una función para cerrar la sesión del usuario
    const logout = () => {
      auth.logout();
      router.push('/login');
    }

    // Devuelve las propiedades reactivas y las funciones que se utilizarán en la plantilla
    return {
      auth,
      logout
    };
  },
};
</script>
