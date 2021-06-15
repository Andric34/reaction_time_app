import Vue from 'vue'
import VueRouter from 'vue-router'
import Matchmaking from '../components/matchmaking.vue'
import Match from '../components/match.vue'
import Home from '../components/welcome.vue'
import Login from '../components/login.vue'
import Register from '../components/register.vue'
import Leaderboard from '../components/leaderboard.vue'
import PageMising from '../components/page-mising.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/matchmaking',
    name: 'Matchmaking',
    component: Matchmaking
  },
  {
    path: '/match',
    name: 'Match',
    component: Match
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: Leaderboard
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/*',
    name: '404',
    component: PageMising
  }
]

const router = new VueRouter({
  routes
})

export default router
