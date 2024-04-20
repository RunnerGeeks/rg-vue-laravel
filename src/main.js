// Importa la función createApp de Vue
import { createApp } from 'vue'

// Importa el componente principal de la aplicación
import App from './App.vue'

// Importa el router de la aplicación
import router from './router'

// Importa la función createPinia para la gestión del estado
import { createPinia } from 'pinia';

// Importaciones necesarias para Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// Crea una instancia de la aplicación Vue
const app = createApp(App);

// Crea una instancia de Vuetify con los componentes y directivas importados
const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
      },
})

// Le dice a Vue que use el router y Vuetify
app.use(router).use(vuetify);

// Le dice a Vue que use Pinia para la gestión del estado
app.use(createPinia());

// Monta la aplicación Vue en el elemento con id 'app'
app.mount('#app');
