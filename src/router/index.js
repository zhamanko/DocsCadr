import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import AddTemplate from '@/pages/AddTemplate.vue'
import Template from '@/pages/Template.vue'
import CheckTemplate from '@/pages/CheckTemplate.vue'
import CalculatorDays from '@/pages/CalculatorDays.vue'
import DateBase from '@/pages/DateBase.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/add-template', name: 'AddTemplate', component: AddTemplate },
  { path: '/template', name: 'Template', component: Template },
  { path: '/check-template', name: 'CheckTemplate', component: CheckTemplate },
  { path: '/calculator-days', name: 'CalculatorDays', component: CalculatorDays },
  { path: '/date-base', name: 'DateBase', component: DateBase }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
