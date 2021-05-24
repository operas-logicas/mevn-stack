import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from '../services/AuthService'
import Home from '../views/Home.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'
import TasksAll from '../views/tasks/TasksAll.vue'
import TasksCreate from '../views/tasks/TasksCreate.vue'
import TasksEdit from '../views/tasks/TasksEdit.vue'

Vue.use(VueRouter)

const ifLoggedInRedirectTo = function(route) {
  return (to, from, next) => {
    if (auth.isLoggedIn()) next({ name: route })
    next()
  }
}

const ifNotLoggedInRedirectTo = function(route) {
  return (to, from, next) => {
    if (!auth.isLoggedIn()) next({ name: route })
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: ifLoggedInRedirectTo('home')
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: ifLoggedInRedirectTo('home')
  },
  {
    path: '/tasks',
    name: 'tasks-all',
    component: TasksAll,
    beforeEnter: ifNotLoggedInRedirectTo('login')
  },
  {
    path: '/tasks/new',
    name: 'tasks-create',
    component: TasksCreate,
    beforeEnter: ifNotLoggedInRedirectTo('login')
  },
  {
    path: '/tasks/:id',
    name: 'tasks-edit',
    component: TasksEdit,
    beforeEnter: ifNotLoggedInRedirectTo('login')
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
