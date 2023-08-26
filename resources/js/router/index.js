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
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/Login.vue'),
        beforeEnter: [ensureGuest],
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/auth/Register.vue'),
        beforeEnter: [ensureGuest],
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/auth/ForgotPassword.vue'),
        beforeEnter: [ensureGuest],
    },
    {
        path: '/reset-password/:token',
        name: 'ResetPassword',
        component: () => import('@/views/auth/ResetPassword.vue'),
        beforeEnter: [ensureGuest],
        props: true,
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

export default router;
