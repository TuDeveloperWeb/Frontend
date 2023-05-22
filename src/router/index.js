import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

import Client from '../views/Client.vue'
import CreateClient from '../views/CreateClient.vue'

import ListClient from '../components/ListClient.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { 
    path: '/client', 
    component: Client,
    redirect:{ name :'index-cliente' },

    children : [
      {
        path:'create',
        component:CreateClient,
        name:'create'
      },
      {
        path:'index',
        component:ListClient,
        name:'index-cliente'
      },
      {
        path:':id/edit',
        component:CreateClient,
        name:'edit',
        props:true
      },
    ]
    
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
