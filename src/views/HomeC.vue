<template>
  <v-card>
    <v-toolbar>
        <v-toolbar-title>Menu Cliente</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="green" @click="goBack()">Atrás</v-btn>
      </v-toolbar>
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
          <v-btn @click="goAppointment()">
            asesorías
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
          <v-btn @click="goPaymentMethods()">
            métodos de pago
          </v-btn>
          <br>
          <br>
          <v-btn @click="goBills()">
            pagos realizados
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'HomeC',
    mounted(){
     this.idRoute=this.$route.params.id;
    },

    components: {
    },
    data: () => ({
      idRoute: null,
      lastAppointment: '',
      lastDiet: '',
      userType: "client"
    }),
    created(){
      axios.put('api/Appointments/AssingDiet/'+1+'/'+1,{
          'AppointmentId': 1},{
          'DietId': 1
        })
    },
    methods:{
      goProfile(){
        let me = this;
        me.$router.push({name: 'clientProfile', params: {id: me.idRoute}});
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
        me.$router.push({name: 'recommendations', params: {id: me.idRoute, userType: me.userType}});
      },
      goPaymentMethods(){
        let me = this;
        me.$router.push({name: 'ListPaymentMethods', params: {id: me.idRoute}});
      },
      goBills(){
        let me = this;
        me.$router.push({name: 'ListBill', params: {id: me.idRoute}});
      },
      assignLast(){
        
        axios.put('api/Appointments/AssingDiet/'+this.lastAppointment+'/'+this.lastDiet,{
          'AppointmentId': this.lastAppointment},{
          'DietId': this.lastDiet
        })
      },
      goBack(){
        let me = this;
        me.$router.push({name: 'Login'});
      }
    }
  }
</script>
