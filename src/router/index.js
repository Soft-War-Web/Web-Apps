import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home-c',
    name: 'HomeC',
    component: () => import('../views/HomeC.vue')
  },
  {
    path: '/home-n',
    name: 'HomeN',
    component: () => import('../views/HomeN.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/clients',
    name: 'clients',
    component: () => import('../components/Client/CreateClient.vue')
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import('../components/Recipe/CreateRecipe.vue')
  },
  {
    path: '/recommendations',
    name: 'recommendations',
    component: () => import('../components/Recommendation/CreateRecommendation.vue')
  },
  {
    path: '/clientProfile',
    name: 'clientProfile',
    component: () => import('../components/Client/ProfileClient.vue')
  },
  {
    path: '/nutritionists',
    name: 'nutritionists',
    component: () => import('../components/Nutritionist/CreateNutritionist.vue')
  },
  {
    path: '/nutritionistProfile',
    name: 'nutritionistProfile',
    component: () => import('../components/Nutritionist/ProfileNutritionist.vue')
  },
  {
    path: '/professionalProfile',
    name: 'professionalProfile',
    component: () => import('../components/ProfessionalProfile/CreateProfessionalProfile.vue')
  },
  {
   
    path: '/appointments',
    name: 'appointments',
    component: () => import('../components/Appointment/CreateAppointment.vue')
  },


  {
    path: '/Specialty',
    name: 'Specialty',
    component: () => import('../components/Specialty/CreateSpecialty.vue')
  },


]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
