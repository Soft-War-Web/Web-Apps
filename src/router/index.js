import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home-c/:id',
    name: 'HomeC',
    component: () => import('../views/HomeC.vue')
  },
  {
    path: '/home-n/:id',
    name: 'HomeN',
    component: () => import('../views/HomeN.vue')
  },
  {
    path: '/availableNutritionists/:id',
    name: 'availableNutritionists',
    component: () => import('../components/Appointment/AvailableNutritionists.vue')
  },
  {
    path: '/nutritionistSelected/:id/:nutritionistId',
    name: 'nutritionistSelected',
    component: () => import('../components/Appointment/NutritionistSelected.vue')
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
    path: '/nutritionists',
    name: 'nutritionists',
    component: () => import('../components/Nutritionist/CreateNutritionist.vue')
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import('../components/Recipe/CreateRecipe.vue')
  },
  {
    path: '/recipes-client/:id',
    name: 'recipesClient',
    component: () => import('../components/Recipe/ListRecipesClient.vue')
  },
  {
    path: '/recipes-nutritionist/:id',
    name: 'recipesNutritionist',
    component: () => import('../components/Recipe/ListRecipesNutritionist.vue')
  },
  {
    path: '/recommendations/:id',
    name: 'recommendations',
    component: () => import('../components/Recommendation/ListRecommendations.vue')
  },
  {
    path: '/clientProfile/:id',
    name: 'clientProfile',
    component: () => import('../components/Client/ProfileClient.vue')
  },
  {
    path: '/nutritionistProfile/:id',
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
    path: '/appointmentsHistoryClient/:id',
    name: 'appointmentsHistoryClient',
    component: () => import('../components/Client/AppointmentHistoryClient.vue')
  },
  {
    path: '/appointmentsHistoryNutritionist/:id',
    name: 'appointmentsHistoryNutritionist',
    component: () => import('../components/Nutritionist/AppointmentHistoryNutritionist.vue')
  },
  {
    path: '/pendingAppointments/:id',
    name: 'pendingAppointments',
    component: () => import('../components/Nutritionist/PendingAppointments.vue')
  },


  {
    path: '/Specialty',
    name: 'Specialty',
    component: () => import('../components/Specialty/CreateSpecialty.vue')
  },

  {
    path: '/PaymentMethod',
    name: 'PaymentMethod',
    component: () => import('../components/PaymentMethod/CreatePaymentMethod.vue')
  },

  {
    path: '/ListPaymentMethods/:id',
    name: 'ListPaymentMethods',
    component: () => import('../components/PaymentMethod/ListPaymentMethods.vue')
  },
  {
    path: '/ListBill/:id',
    name: 'ListBill',
    component: () => import('../components/Bill/ListBill.vue')
  },

  {
    path: '/published-recommendations/:id',
    name: 'PublishedRecommendations',
    component: () => import('../components/Nutritionist/PublishedRecommendations.vue')
  },
  {
    path: '/published-recipes/:id',
    name: 'PublishedRecipes',
    component: () => import('../components/Nutritionist/PublishedRecipes.vue')
  },


]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
