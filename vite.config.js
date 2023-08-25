import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/main.css', 'resources/js/main.js'],
            refresh: true,
        }),
        vue({ 
            template: { transformAssetUrls },
        }),
        vuetify({
            autoImport: true,
        }),
    ],

    // Required to make HMR work with Laravel Sail (https://laracasts.com/discuss/channels/vite/laravel-vite-err-address-invalid)
    server: {
        host: '0.0.0.0',
        hmr: {
            host: 'localhost',
        },
    },
});
