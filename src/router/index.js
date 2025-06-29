import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import AddTemplate from '@/pages/AddTemplate.vue'
import Template from '@/pages/Template.vue'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/add-template', name: 'AddTemplate', component: AddTemplate },
  { path: '/template', name: 'Template', component: Template },
]

const router = createRouter({
  history: createWebHistory(), // або createWebHashHistory()
  routes
})

export default router
