<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" offset-md="3" lg="4" offset-lg="4" class="mt-4">
                <v-card>
                    <oops-alert v-if="error" :error="error" class="rounded-b-0"/>

                    <v-card-title class="text-center my-4">Create an account</v-card-title>
                    
                    <v-card-text>
                        <p class="mb-5 text-center">Start managing your tasks and projects right now.</p>

                        <v-form @submit.prevent="submit" :readonly="loading">
                            <v-text-field
                                v-model="form.name"
                                label="Name"
                                type="text"
                                required />
                            <v-text-field
                                v-model="form.email"
                                label="Email"
                                type="email"
                                required />
                            <v-text-field
                                v-model="form.password"
                                label="Password"
                                type="password"
                                required />
                            <v-text-field
                                v-model="form.password_confirmation"
                                label="Confirm Password"
                                type="password"
                                required />
                            <v-btn type="submit" block color="primary" :loading="loading">Register</v-btn>
                        </v-form>
                        <v-btn variant="text" class="mt-2 mb-n1" block to="/login">I already have an account</v-btn>
                    </v-card-text>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import OopsAlert from '@/components/OopsAlert.vue';
import store from '@/store';

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
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
        };
    },
    methods: {
        async submit() {
            this.error = null;
            this.loading = true;
            try {
                await store.register(this.form);
            } catch (error) {
                this.error = error;
                console.error(error);
            }
            this.loading = false;
        },
    },
};
</script>