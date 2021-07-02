<template>
  <v-card>
    <v-row cols="12">
      <v-col>
        <v-img
          :src="require('../assets/logo.png')"
          contain
          height="350"
        ></v-img>
      </v-col>
      <v-col>
        <v-col>
          <v-btn @click="goProfile()">
            perfil
          </v-btn>
          <br>
          <br>
          <v-btn @click="goPendingAppointments()">
            asesorías pendientes
          </v-btn>
          <br>
          <br>
          <v-btn @click="goAppointmentHistory()">
            historial de asesorías
          </v-btn>
          <br>
          <br>
          <v-btn @click="goRecipes()">
            recetas
          </v-btn>
          <br>
          <br>
          <v-btn @click="goRecommendations()">
            recomendaciones
          </v-btn>
          <br>
          <br>
          <v-btn @click="goPublishedRecipes()">
            recetas publicadas
          </v-btn>
          <br>
          <br>
          <v-btn @click="goPublishedRecommendations()">
            recomendaciones publicadas
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

  export default {
    name: 'HomeN',
    mounted(){
     this.idRoute=this.$route.params.id;
    },

    components: {
    },
    data: () => ({
      idRoute: null
    }),
    methods:{
      goProfile(){
        let me = this;
        me.$router.push({name: 'nutritionistProfile', params: {id: me.idRoute}});
      },
      goPendingAppointments(){
        let me = this;
        me.$router.push({name: 'pendingAppointments', params: {id: me.idRoute}});
      },
      goAppointmentHistory(){
        let me = this;
        me.$router.push({name: 'appointmentsHistoryNutritionist', params: {id: me.idRoute}});
      },
      goRecipes(){
        let me = this;
        me.$router.push({name: 'recipesNutritionist', params: {id: me.idRoute}});
      },
      goRecommendations(){
        let me = this;
        me.$router.push({name: 'recommendations', params: {id: me.idRoute}});
      },
      goPublishedRecipes(){
        let me = this;
        me.$router.push({name: 'PublishedRecipes', params: {id: me.idRoute}});
      },
      goPublishedRecommendations(){
        let me = this;
        me.$router.push({name: 'PublishedRecommendations', params: {id: me.idRoute}});
      }
    }
  }
</script>