<template>
    <v-app class="bg-login">
        <v-app-bar color="surface" elevation="2">
            <v-container>
                <v-row dense class="align-center">
                    <router-link :to="isLogged ? '/dashboard' : '/'" class="d-flex align-center no-underline">
                        <!-- App Icon by Icons8 -->
                        <img src="/images/logo.svg" alt="Logo" height="40" class="mt-n1"/>
                        <v-app-bar-title class="align-center d-flex">
                            <span class="ml-3 align-center">
                                <span class="font-weight-bold text-primary">Check</span>
                                <span class="font-weight-light text-black">Buddy</span>
                            </span>
                        </v-app-bar-title>
                    </router-link>

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
            appName: import.meta.env.VITE_APP_NAME,
            drawer: false,
        };
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
};
</script>
