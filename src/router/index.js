import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Manage from "@/views/Manage.vue";
import Trainings from "@/views/Trainings.vue";
import Training from "@/views/Training.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage
  },
  {
    path: '/trainings',
    name: 'Trainings',
    component: Trainings
  },
  {
    path: '/training/:id',
    name: 'Training',
    component: Training
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
