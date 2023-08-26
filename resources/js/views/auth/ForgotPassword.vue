<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6" offset-md="3" lg="4" offset-lg="4" class="mt-4">
                <v-card>
                    <oops-alert v-if="error" :error="error" class="rounded-b-0"/>

                    <v-alert v-if="successMessage" type="success" class="rounded-b-0">
                        {{ successMessage }}
                    </v-alert>

                    <v-card-title class="text-center my-4">Reset your password</v-card-title>

                    <p class="mx-4 mb-2 text-center">Enter your email address and we will send you a link to reset your password.</p>

                    <v-card-text>
                        <v-form @submit.prevent="submit">
                            <v-text-field
                                v-model="form.email"
                                label="Email"
                                type="email"
                                required
                            ></v-text-field>
                            <v-btn type="submit" block color="primary" :loading="loading" :disabled="throtleCountdown > 0">
                                {{ throtleCountdown > 0 ? `Wait ${throtleCountdown} seconds to send again` : 'Send Password Reset Link' }}
                            </v-btn>
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
            },

            /**
             * The success message sent by the server.
             * 
             * @type {String|null}
             */
            successMessage: null,

            /**
             * The number of seconds until the user can submit the form again.
             * 
             * @type {Number}
             */
            throtleCountdown: 0,
        }
    },
    methods: {
        async submit() {
            if (this.throtleCountdown > 0) {
                return;
            }

            this.error = null;
            this.sucessMessage = null;
            this.loading = true;

            try {
                const response = await axios.post('/forgot-password', this.form);

                this.successMessage = response.data.message;
                this.throtleCountdown = 60; // Same as config('auth.passwords.users.throttle')
            } catch (error) {
                this.error = error;
                console.error(error);
            }

            this.loading = false;
        },
    },
    mounted() {
        setInterval(() => {
            if (this.throtleCountdown > 0) {
                this.throtleCountdown--;
            }
        }, 1000);
    },
}
</script>