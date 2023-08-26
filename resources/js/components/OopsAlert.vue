<template>
    <v-alert type="error">

        <div>{{ errorTitle }}</div>
        
        <div v-if="errorDetails" class="text-body-2 mt-1">
            {{ errorDetails }}
        </div>

        <div class="d-flex justify-end mt-2">
            <v-btn v-if="showRetry" variant="tonal" @click="$emit('retry')">
                Retry
            </v-btn>
        </div>
    </v-alert>
</template>
  
<script>
export default {
    props: {
        error: {
            type: Object,
            default: null
        },
        showRetry: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        errorTitle() {
            if (this.isValidation) {
                return this.serverErrorMessage;
            }

            return 'Oops! Something went wrong';
        },

        errorDetails() {
            if (this.error instanceof Error) {
                return null  
            }

            if (this.isAxiosError) {
                return this.serverErrorMessage;
            }

            return null
        },

        isValidation() {
            return this.isAxiosError && this.error.response?.status === 422
        },

        isAxiosError() {
            return this.error && this.error.isAxiosError  
        },

        serverErrorMessage() {
            return this.error.response?.data.message || 'Oops! Something went wrong. Please try again in a few seconds.'
        },

        onColor() {
            return this.color ? `on-${this.color}` : 'on-primary'
        }
    }
}
</script>