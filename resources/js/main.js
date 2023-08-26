/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import './bootstrap';

import App from './App.vue';
import { createApp } from 'vue';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { md3 } from 'vuetify/blueprints';
import { createVuetify } from 'vuetify';
import router from './router';
import store from './store';


const vuetify = createVuetify({
    blueprint: md3,
    theme: {
        themes: {
            light: {
                colors: {
                    primary: '#89b307',
                    secondary: '#54CA92',
                },
            },
        },
    },
});

if (window.appData) {
    store.hydrate(window.appData);
}

createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app');
