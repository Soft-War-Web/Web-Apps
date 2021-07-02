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
          <v-btn>
            perfil
          </v-btn>
          <br>
          <br>
          <v-btn>
            asesorías pendientes
          </v-btn>
          <br>
          <br>
          <v-btn>
            historial de asesorías
          </v-btn>
          <br>
          <br>
          <v-btn>
            recetas
          </v-btn>
          <br>
          <br>
          <v-btn>
            recomendaciones
          </v-btn>
          <br>
          <br>
          <v-btn>
            recetas publicadas
          </v-btn>
          <br>
          <br>
          <v-btn>
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
      goAppointment(){
        let me = this;
        me.$router.push({name: 'availableNutritionists', params: {id: me.idRoute}});
      },
      goAppointmentHistory(){
        let me = this;
        me.$router.push({name: 'appointmentsHistoryClient', params: {id: me.idRoute}});
      },
      goRecipes(){
        let me = this;
        me.$router.push({name: 'recipesClient', params: {id: me.idRoute}});
      },
      goRecommendations(){
        let me = this;
        me.$router.push({name: 'recommendations', params: {id: me.idRoute}});
      },
      goPaymentMethods(){
        let me = this;
        me.$router.push({name: 'ListPaymentMethods', params: {id: me.idRoute}});
      },
      goBills(){
        let me = this;
        me.$router.push({name: 'ListBill', params: {id: me.idRoute}});
      }
    }
  }
</script>