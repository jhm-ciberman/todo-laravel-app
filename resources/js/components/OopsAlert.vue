<template>
    <v-alert type="error">

        <div>{{ errorTitle }}</div>
        
        <div class="d-flex justify-end mt-2">
            <v-btn v-if="showRetry" variant="tonal" @click="$emit('retry')">
                Retry
            </v-btn>
        </div>
    </v-alert>
</template>
  
<script>
export default {
    emits: ['retry'],

    props: {
        error: {
            type: Object,
            default: null,
        },
        showRetry: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        errorTitle() {
            if (this.isAxiosError) {
                return this.serverErrorMessage;
            }

            return 'Oops! Something went wrong';
        },

        isAxiosError() {
            return this.error?.isAxiosError;
        },

        serverErrorMessage() {
            return this.error.response?.data.message || 'Oops! Something went wrong. Please try again in a few seconds.';
        },
    },
};
</script>