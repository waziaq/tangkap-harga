import { createWebHistory, createRouter } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            name:'Public',
            component:() => import('../components/Layouts/DefaultLayouts/index.vue'),
            redirect: '/',
            children:[
                {
                    path:'/',
                    name:'Home',
                    component:() => import('../views/Home/index.vue')
                },
                {
                    path: '/product',
                    name: 'Product',
                    component: () => import('../views/Product/index.vue')
                }
            ]
        },
    ],
});

export default router