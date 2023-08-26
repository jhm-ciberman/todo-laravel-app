import { reactive } from 'vue';
import router from './router';


// Using Pinia is an overkill for this project. Let's keep it simple. :)
// Conventions: 
// - props are public get only
// - methods are the only way to mutate state
// Let's rock!
const store = reactive({
    isLoggedIn: false,

    user: null,

    /**
     * Login the user.
     * 
     * @param {{ email: string, password: string }} data
     * @returns {Promise<void>}
     */
    async login(data) {
        const response = await axios.post('/login', data);

        this.isLoggedIn = true;
        this.user = null;

        router.push({ name: 'Dashboard' });
    },

    /**
     * Logout the user.
     * 
     * @returns {Promise<void>}
     */
    async logout() {
        await axios.post('/logout');

        this.isLoggedIn = false;
        this.user = null;

        router.push({ name: 'Home' });
    },

    /**
     * Force logout the user. This method should be called when the server
     * returns a 401 or 419 response.
     */
    sessionExpired() {
        this.isLoggedIn = false;
        router.push({ name: 'Login' });
    },

    /**
     * Register the user.
     * 
     * @param {{ name: string, email: string, password: string, password_confirmation: string }} data
     * @returns {Promise<void>}
     */
    async register(data) {
        const response = await axios.post('/register', data);

        this.isLoggedIn = true;
        this.user = null;

        router.push({ name: 'Dashboard' });
    }
});

export default store;