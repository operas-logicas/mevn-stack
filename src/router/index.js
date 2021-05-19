import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import TasksAll from '../views/tasks/TasksAll.vue'
import TasksCreate from '../views/tasks/TasksCreate.vue'
import TasksEdit from '../views/tasks/TasksEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/tasks',
    name: 'tasks-all',
    component: TasksAll
  },
  {
    path: '/tasks/new',
    name: 'tasks-create',
    component: TasksCreate
  },
  {
    path: '/tasks/:id',
    name: 'tasks-edit',
    component: TasksEdit
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  mode: 'history',
  routes
})

export default router
