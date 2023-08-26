<template>
    <v-container>
        <v-row>
            <v-col cols="12" lg="6" offset-lg="3">
                <v-card>
                    <v-row class="pa-6">
                        <v-col cols="12" md="3" class="text-center">
                            <v-row>
                                <v-col cols="12" sm="6" md="12">
                                    <img src="@/../images/checklist.png" alt="Checklist" class="mx-auto"/>
                                </v-col>
                                <v-col cols="12" sm="6" md="12">
                                    <v-btn color="primary" block class="mt-4" to="/login">Login</v-btn>
                                    <v-btn color="primary" block class="mt-4" to="/register">Register</v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col>
                            <h1 class="text-h5 mb-4">{{ appName }}</h1>
                            <p>
                                CheckBuddy is a simple laravel checklist demo app. It is a simple app that allows you to create checklists and add items to them. You can also mark items as completed and delete them. 
                            </p>
                            <h2 class="mt-4">Features</h2> 
                            <h3 class="mt-3">Backend</h3>
                            <ul class="ml-6">
                                <li>Laravel 10</li>
                                <li>Laravel Fortify for authentication (login, registration & password reset)</li>
                                <li>Laravel Sail for local development</li>
                                <li>Laravel Pint for backend linting</li>
                                <li>MySQL database</li>
                            </ul>

                            <h3 class="mt-3">Frontend SPA</h3>
                            <ul class="ml-6">
                                <li>Vue 3</li>
                                <li>Vuetify 3</li>
                                <li>Vue router</li>
                                <li>ESLint for frontend linting</li>
                            </ul>
                        </v-col>
                    </v-row>
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
        };
    },
};
</script>