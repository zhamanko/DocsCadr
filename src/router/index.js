import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import AddTemplate from '@/pages/AddTemplate.vue'


const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/add-template', name: 'AddTemplate', component: AddTemplate },
]

const router = createRouter({
  history: createWebHistory(), // або createWebHashHistory()
  routes
})

export default router
