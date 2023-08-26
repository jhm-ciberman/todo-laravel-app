<template>
    <v-app class="bg-login">
        <v-app-bar color="surface" elevation="2">
            <v-container>
                <v-row dense>
                    <v-app-bar-title>TODO App</v-app-bar-title>
        
                    <v-spacer />
        
                    <v-btn v-if="isLogged" @click="logout" color="primary">Logout</v-btn>
                    <v-btn v-if="isGuest" to="/login" color="primary">Login</v-btn>
                    <v-btn v-if="isGuest" to="/register" color="primary">Register</v-btn>
                </v-row>
            </v-container>
        </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
import store from './store';

export default {
    data() {
        return {
            drawer: false,
        }
    },
    computed: {
        isMobile() {
            return this.$vuetify.display.smAndDown;
        },
        isLogged() {
            return store.isLoggedIn;
        },
        isGuest() {
            return !store.isLoggedIn;
        },
    },
    methods: {
        logout() {
            store.logout();
        },
    },
}
</script>
