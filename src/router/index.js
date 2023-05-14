import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogIn from '../views/LogIn.vue'
import  DashUtilisateur from '../views/DashUtilisateur'
import ProfilUtilisateur from '../views/ProfilUtilisateur'
import PropositionView from '../views/PropositionView'
import ReclamationView from '../views/ReclamationView'
import RendezVous from '../views/RendezVous'
import NavDrawer from '../components/NavDrawer'
import FormView from '../views/FormView'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/form',
    name: 'form',
    component: FormView
  },
  {
    path: '/nav',
    name: 'nav',
    component: NavDrawer
  },
  {
    path: '/proposition',
    name: 'proposition',
    component: PropositionView
  },
  {
    path: '/rendezvous',
    name: 'rendezvous',
    component: RendezVous
  },
  {
    path: '/reclamation',
    name: 'reclamation',
    component: ReclamationView
  },
  {
    path: '/DashUtilisateur',
    name: 'DashUtilisateur',
    component: DashUtilisateur,
    
  },
  {
    path: '/ProfilUtilisateur',
    name: 'ProfilUtilisateur',
    component: ProfilUtilisateur
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
