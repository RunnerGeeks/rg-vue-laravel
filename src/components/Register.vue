<template>
    <!-- Define la estructura del componente -->
    <v-container>
        <v-row justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-toolbar color="secondary" dark flat>
                        <!-- Define el título de la barra de la tarjeta -->
                        <v-toolbar-title>Registro de Usuarios</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <!-- Define los campos de texto para el nombre, correo electrónico y contraseña -->
                        <v-text-field label="Nombre" prepend-icon="mdi-account" type="text" v-model="name"
                            required></v-text-field>
                        <v-text-field label="Correo Electrónico" prepend-icon="mdi-email" type="email" v-model="email"
                            required></v-text-field>
                        <v-text-field label="Contraseña" prepend-icon="mdi-lock" type="password" v-model="password"
                            required></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <!-- Define el botón para registrarse -->
                        <v-btn color="secondary" text @click="register">Registrar</v-btn>
                        <!-- Define el botón para ir a la página de inicio de sesión -->
                        <v-btn color="primary" text @click="goToLogin">Iniciar Sesión</v-btn>
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

export default {
    setup() {
        // Usa el router
        const router = useRouter();

        // Define las propiedades reactivas para el nombre, correo electrónico y contraseña
        const name = ref('');
        const email = ref('');
        const password = ref('');

        // Define una propiedad reactiva para el diálogo
        const dialog = ref(false);
        // Define una propiedad reactiva para los errores
        const errors = ref({});

        // Define la función para registrarse
        const register = async () => {
            try {
                // Realiza la solicitud de registro
                const response = await axios.post('http://localhost:8000/api/register', {
                    name: name.value,
                    email: email.value,
                    password: password.value
                });
                console.log('Usuario registrado:', response.data);
                // Aquí puedes redirigir al usuario o manejar la respuesta como prefieras
            } catch (error) {
                // Si ocurre un error, muestra el diálogo y guarda los errores
                if (error.message === 'Network Error' || error.message.includes('net::ERR_CONNECTION_REFUSED')) {
                    errors.value = {error: {message: error.message}};
                    dialog.value = true;
                } else if (error.response && error.response.status === 400) {
                    errors.value = error.response.data;
                    dialog.value = true;
                }
            }
        };

        // Define la función para ir a la página de inicio de sesión
        const goToLogin = () => {
            router.push('/login');
        };

        // Devuelve las propiedades y funciones que se utilizarán en la plantilla
        return {
            name,
            email,
            password,
            register,
            goToLogin,
            dialog,
            errors
        };
    }
};
</script>
