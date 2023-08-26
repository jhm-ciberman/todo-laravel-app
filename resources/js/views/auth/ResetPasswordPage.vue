<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" offset-md="3" lg="4" offset-lg="4" class="mt-4">
                <v-card>
                    <oops-alert v-if="error" :error="error" class="rounded-b-0"/>

                    <v-alert v-if="successMessage" type="success" class="rounded-b-0">
                        {{ successMessage }}
                        <template #append>
                            <v-btn variant="tonal" color="on-primary" to="/login">Login</v-btn>
                        </template>
                    </v-alert>

                    <v-card-title class="text-center my-4">Create a new password</v-card-title>

                    <v-card-text>
                        <v-form @submit.prevent="submit" :readonly="loading">
                            <v-text-field
                                v-model="form.email"
                                label="Email"
                                type="email"
                                required></v-text-field>
                            <v-text-field
                                v-model="form.password"
                                label="Password"
                                type="password"
                                required></v-text-field>
                            <v-text-field
                                v-model="form.password_confirmation"
                                label="Confirm Password"
                                type="password"
                                required></v-text-field>
                            <v-btn type="submit" color="primary" block :loading="loading">Reset Password</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import OopsAlert from '@/components/OopsAlert.vue';
import axios from 'axios';

export default {
    components: {
        OopsAlert,
    },
    props: {
        token: {
            type: String,
            required: true,
        },
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
                password_confirmation: '',
            },

            /**
             * The success message sent by the server.
             * 
             * @type {String|null}
             */
            successMessage: null,
        };
    },
    methods: {
        async submit() {
            this.successMessage = null;
            this.error = null;
            this.loading = true;
            try {
                const response = await axios.post('/reset-password', { ...this.form, token: this.token });

                this.successMessage = response.data.message;
            } catch (error) {
                this.error = error;
                console.error(error);
            }
            this.loading = false;
        },
    },
    created() {
        this.form.email = this.$route.query.email;
    },
};
</script>