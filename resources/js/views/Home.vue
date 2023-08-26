<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" offset-md="3">
                <v-card>
                    <v-card-title>{{ appName }}</v-card-title>
                    <v-card-text>
                        <p>{{ appName }} is a simple todo app built with Laravel and Vue.</p>
                        <p>It uses Laravel Fortify for authentication and Vue Router for routing.</p>
                        <p>It also uses Vuetify 3 for styling.</p>
                        <p>It is a great starting point for building your next Laravel + Vue app.</p>
                        <p>It is also a great learning resource for learning Laravel Fortify and Vue Router.</p>
                        <p>It is also a great learning resource for learning Vuetify 3.</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" to="/login">Login</v-btn>
                        <v-btn color="primary" to="/register">Register</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    data() {
        return {
            appName: import.meta.env.VITE_APP_NAME,
        }
    },
};
</script>