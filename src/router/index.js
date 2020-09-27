import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'index',
        component: () => import(/* webpackChunkName: "index" */ '../views/index'),
        redirect: '/moveNumber',
        children: [
            {
                path: '/moveNumber',
                name: 'moveNumber',
                component: () => import(/* webpackChunkName: "moveNumber" */ '../views/moveNumber'),
            },
            {
                path: '/countdown',
                name: 'countdown',
                component: () => import(/* webpackChunkName: "countdown" */ '../views/countdown'),
            },
            {
                path: '/virtualList',
                name: 'virtualList',
                component: () => import(/* webpackChunkName: "virtualList" */ '../views/virtualList'),
            },
            {
                path: '/ruler',
                name: 'ruler',
                component: () => import(/* webpackChunkName: "ruler" */ '../views/ruler'),
            },
            {
                path: '/marquee',
                name: 'marquee',
                component: () => import(/* webpackChunkName: "marquee" */ '../views/marquee'),
            },
            {
                path: '/observer',
                name: 'observer',
                component: () => import(/* webpackChunkName: "observer" */ '../views/observer'),
            },
            {
                path: '/sgyRequest',
                name: 'sgyRequest',
                component: () => import(/* webpackChunkName: "sgyRequest" */ '../views/sgyRequest'),
            },
            {
                path: '/toast',
                name: 'toast',
                component: () => import(/* webpackChunkName: "toast" */ '../views/toast'),
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
