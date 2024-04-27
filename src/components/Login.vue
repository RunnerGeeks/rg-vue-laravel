<template>
    <!-- Define la estructura del componente -->
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="4" lg="12">
                <v-card class="elevation-12">
                    <v-toolbar color="primary" dark flat>
                        <!-- Define el título de la barra de la tarjeta -->
                        <v-toolbar-title>Iniciar sesión</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <!-- Define el campo de texto para el correo electrónico -->
                        <v-text-field label="Correo electrónico" prepend-icon="mdi-account" type="email"
                            v-model="email"></v-text-field>
                        <!-- Define el campo de texto para la contraseña -->
                        <v-text-field label="Contraseña" prepend-icon="mdi-lock" type="password"
                            v-model="password"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- Define el botón para iniciar sesión -->
                        <v-btn color="primary" text @click="login">Ingresar</v-btn>
                        <!-- Define el botón para registrarse -->
                        <v-btn color="secondary" text @click="register">Registrarse</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

    <!-- Define el diálogo para mostrar los errores -->
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title class="headline">Error</v-card-title>
            <v-card-text>
                <!-- Muestra los errores -->
                <div v-for="(value, key, index) in errors" :key="index">
                    <strong>{{ key }}:</strong>
                    <ul>
                        <li v-for="(message, i) in value" :key="i">{{ message }}</li>
                    </ul>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <!-- Define el botón para cerrar el diálogo -->
                <v-btn color="green darken-1" text @click="dialog = false">Cerrar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
// Importa las funciones necesarias de Vue
import { ref } from 'vue';
// Importa axios para realizar solicitudes HTTP
import axios from 'axios';
// Importa el router para navegar entre rutas
import { useRouter } from 'vue-router';
// Importa la tienda de autenticación
import { useAuthStore } from '../store';

export default {
    setup() {
        // Define las propiedades reactivas para el correo electrónico y la contraseña
        const email = ref('');
        const password = ref('');
        // Usa el router
        const router = useRouter();
        // Define una propiedad reactiva para el diálogo
        const dialog = ref(false);
        // Define una propiedad reactiva para los errores
        const errors = ref({});
        // Usa la tienda de autenticación
        const auth = useAuthStore();

        // Define la función para iniciar sesión
        const login = async () => {
            try {
                // Realiza la solicitud de inicio de sesión
                const response = await axios.post('http://35.162.90.4/api/login', {
                    email: email.value,
                    password: password.value
                });
                // Guarda el token en el almacenamiento local
                localStorage.setItem('token', response.data);
                // Actualiza el estado en la tienda
                auth.login();
                // Navega a la ruta de los usuarios
                router.push('/users');
            } catch (error) {
                // Si ocurre un error, muestra el diálogo y guarda los errores
                if (error.message === 'Network Error' || error.message.includes('net::ERR_CONNECTION_REFUSED')) {
                    errors.value = {error: {message: error.message}};
                    dialog.value = true;
                } else if (error.response && (error.response.status === 400 || error.response.status === 422)) {
                    errors.value = error.response.data.errors;
                    dialog.value = true;
                }
            }
        };

        // Define la función para registrarse
        const register = () => {
            // Navega a la ruta de registro
            router.push('/register');
        };

        // Devuelve las propiedades y funciones que se utilizarán en la plantilla
        return {
            email,
            password,
            login,
            register,
            dialog,
            errors
        };
    }
};
</script>
