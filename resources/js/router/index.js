import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

// Navigation guards
function ensureAuthenticated(_to, _from) {
    if (!store.isLoggedIn) {
        return { name: 'Login' };
    }

    return true;
}

function ensureGuest(_to, _from) {
    if (store.isLoggedIn) {
        return { name: 'Dashboard' };
    }

    return true;
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomePage.vue'),
        beforeEnter: [ensureGuest],
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/auth/LoginPage.vue'),
        beforeEnter: [ensureGuest],
        meta: {
            title: 'Login',
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/auth/RegisterPage.vue'),
        beforeEnter: [ensureGuest],
        meta: {
            title: 'Register',
        },
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/auth/ForgotPasswordPage.vue'),
        beforeEnter: [ensureGuest],
        meta: {
            title: 'Forgot Password',
        },
    },
    {
        path: '/reset-password/:token',
        name: 'ResetPassword',
        component: () => import('@/views/auth/ResetPasswordPage.vue'),
        beforeEnter: [ensureGuest],
        props: true,
        meta: {
            title: 'Reset Password',
        },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/DashboardPage.vue'),
        beforeEnter: [ensureAuthenticated],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, _from) => {
    // If the route has a meta title set, update the document title
    const appName = import.meta.env.VITE_APP_NAME;

    document.title = to.meta.title
        ? `${to.meta.title} | ${appName}`
        : appName;
});


export default router;
