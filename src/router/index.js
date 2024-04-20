// Importa las funciones necesarias de vue-router
import { createRouter, createWebHistory } from 'vue-router';

// Importa los componentes de las vistas
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import UserList from '../components/UserList.vue';

// Define las rutas de la aplicación
const routes = [
  // Ruta para el registro de usuarios
  { path: '/register', component: Register },
  // Ruta para el inicio de sesión
  { path: '/login', component: Login },
  // Ruta para la lista de usuarios
  { path: '/users', component: UserList }
];

// Crea el router con las rutas definidas y el historial del navegador
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Añade un guardia global de navegación
router.beforeEach((to, from, next) => {
    // Si el usuario intenta acceder a la ruta '/users' y no tiene un token,
    // redirige al usuario a la ruta de inicio de sesión
    if (to.path === '/users' && !localStorage.getItem('token')) {
      next('/login');
    } else {
      // En cualquier otro caso, permite la navegación
      next();
    }
});

// Exporta el router
export default router;
