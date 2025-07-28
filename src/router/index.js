import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import AddTemplate from '@/pages/AddTemplate.vue'
import Template from '@/pages/Template.vue'
import UpdateTemplate from '@/pages/UpdateTemplate.vue'
import CalculatorDays from '@/pages/CalculatorDays.vue'
import DateBase from '@/pages/DateBase.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/add-template', name: 'AddTemplate', component: AddTemplate },
  { path: '/template', name: 'Template', component: Template },
  { path: '/update-template', name: 'UpdateTemplate', component: UpdateTemplate },
  { path: '/calculator-days', name: 'CalculatorDays', component: CalculatorDays },
  { path: '/date-base', name: 'DateBase', component: DateBase }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
