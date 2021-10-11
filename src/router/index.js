import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/sys/menu',
        name: '',
        component: () => import('../views/sys/SysMenu')
    },
    {
        path: '/sys/user',
        name: '',
        component: () => import('../views/sys/SysUser')
    },
    {
        path: '/sys/role',
        name: '',
        component: () => import('../views/sys/SysRole')
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
