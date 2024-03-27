import {createRouter, createWebHistory} from 'vue-router'

import ProductCreate from './components/ProductCreate.vue'
import ProductEdit from './components/ProductEdit.vue'
import ProductList from './components/ProductList.vue'

const routes = [
    {
      name: 'ProductCreate',
      path: '/create',
      component: ProductCreate
    },
    {
      name: 'ProductEdit',
      path: '/edit/:id',
      component: ProductEdit
    },
    {
      name: 'ProductList',
      path: '/',
      component: ProductList
    },
  ];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;