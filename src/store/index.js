// store.js

// Importa la función defineStore de Pinia
import { defineStore } from 'pinia';

// Define y exporta la tienda de autenticación
export const useAuthStore = defineStore({
  // Define el id de la tienda
  id: 'auth',
  
  // Define el estado inicial de la tienda
  state: () => ({
    // Define la propiedad isAuthenticated, que indica si el usuario está autenticado
    // Se inicializa a true si hay un token en el almacenamiento local, y a false en caso contrario
    isAuthenticated: !!localStorage.getItem('token'),
  }),
  
  // Define las acciones que pueden modificar el estado de la tienda
  actions: {
    // Define la acción login, que se llama cuando el usuario inicia sesión
    login() {
      // Realiza el inicio de sesión
      // En este ejemplo, simplemente se establece isAuthenticated a true
      // En una aplicación real, aquí es donde realizarías la lógica de inicio de sesión, como enviar una solicitud al servidor
      this.isAuthenticated = true;
    },
    
    // Define la acción logout, que se llama cuando el usuario cierra sesión
    logout() {
      // Realiza el cierre de sesión
      // En este ejemplo, se elimina el token del almacenamiento local y se establece isAuthenticated a false
      // En una aplicación real, aquí es donde realizarías la lógica de cierre de sesión, como enviar una solicitud al servidor
      localStorage.removeItem('token');
      this.isAuthenticated = false;
    },
    
    // Define la acción checkAuth, que se llama para comprobar si el usuario está autenticado
    checkAuth() {
      // Comprueba si el usuario está autenticado
      // En este ejemplo, se establece isAuthenticated a true si hay un token en el almacenamiento local, y a false en caso contrario
      // En una aplicación real, aquí es donde realizarías la lógica de comprobación de autenticación, como enviar una solicitud al servidor
      this.isAuthenticated = !!localStorage.getItem('token');
    }
  },
});
