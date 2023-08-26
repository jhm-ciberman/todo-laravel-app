<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" offset-md="3" lg="4" offset-lg="4" class="mt-4">
                <v-card>
                    <oops-alert v-if="error" :error="error" class="rounded-b-0"/>

                    <v-card-title class="text-center my-4">Welcome back!</v-card-title>
                    
                    <v-card-text>
                        <v-form @submit.prevent="submit" :readonly="loading">
                            <v-text-field
                                v-model="form.email"
                                label="Email"
                                type="email"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="form.password"
                                label="Password"
                                type="password"
                                required
                            ></v-text-field>
                            <v-btn type="submit" block color="primary">Login</v-btn>
                        </v-form>
                        <v-btn variant="text" class="mt-2 mb-n1" block to="/forgot-password">Forgot Password?</v-btn>
                    </v-card-text>
                </v-card>

                <v-card class="mt-4 pa-4 d-flex align-center">
                    <span>Don't have an account yet?</span>
                    <v-spacer />
                    <v-btn variant="text" to="/register">Register</v-btn>                        
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>




<script>
import store from '@/store';
import OopsAlert from '@/components/OopsAlert.vue';

export default {
    components: {
        OopsAlert,
    },
    data() {
        return {
            /**
             * Indicates if data is being loaded from the server.
             */
             loading: false,

            /**
             * An error produced when submitting the form.
             * 
             * @type {Error|null}
             */
            error: null,

            /**
             * The form fields.
             */
            form: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        async submit() {
            this.error = null;
            this.loading = true;
            try {
                await store.login(this.form);
            } catch (error) {
                this.error = error;
                console.error(error);
            }
            this.loading = false;
        },
    },
}
</script>