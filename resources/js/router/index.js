import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

// Navigation guards
function ensureAuthenticated(to, from) {
    if (!store.isLoggedIn) {
        return { name: 'Login' };
    }

    return true;
}

function ensureGuest(to, from) {
    if (store.isLoggedIn) {
        return { name: 'Dashboard' };
    }

    return true;
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        beforeEnter: [ensureGuest],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue'),
        beforeEnter: [ensureGuest],
        meta: {
            title: 'Login',
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/auth/Register.vue'),
        beforeEnter: [ensureGuest],
        meta: {
            title: 'Register',
        },
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/auth/ForgotPassword.vue'),
        beforeEnter: [ensureGuest],
        meta: {
            title: 'Forgot Password',
        },
    },
    {
        path: '/reset-password/:token',
        name: 'ResetPassword',
        component: () => import('@/views/auth/ResetPassword.vue'),
        beforeEnter: [ensureGuest],
        props: true,
        meta: {
            title: 'Reset Password',
        },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        beforeEnter: [ensureAuthenticated],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from) => {
    // If the route has a meta title set, update the document title
    const appName = import.meta.env.VITE_APP_NAME;

    document.title = to.meta.title
        ? `${to.meta.title} | ${appName}`
        : appName;
});


export default router;
