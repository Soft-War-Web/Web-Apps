<template>
<div style=";width: 100% ">
  <v-toolbar flat color="blue">
    <v-toolbar-title>Nutricionista seleccionado</v-toolbar-title>
  </v-toolbar>
  <br>
  <div class="d-flex flex-wrap  left-space-between">
    <v-card max-width="400">
    <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <v-card-title>{{username}}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">Nombre</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{firstName+' '+lastName}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">Email</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{email}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">Número CNP</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{cnpNumber}}</div>
    </v-card-text>
  </v-card>
  <div class="d-flex flex-wrap  justify-space-between mx-auto mb-2">
    <v-btn text @click="submit">{{appointmentDate}}</v-btn>
    <v-btn text @click="submit">{{appointmentDate}}</v-btn>
    <v-btn text @click="submit">{{appointmentDate}}</v-btn>
    <v-btn text @click="submit">{{appointmentDate}}</v-btn>
  </div>
  <div class="d-flex flex-wrap  left-space-between mx-auto mb-8">
 
  </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
            id: '',
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            cnpNumber:'',
            nutritionistId: 1,
            clientId: 1,
            nutritionistNotes: '',
            loading: false,
            appointmentDate: new Date(),
            amount: 35,
            ruc: 12345,
            billDate: new Date()
    }),
    created () 
    {
      this.getNutritionist();
    },
    methods: {
      reserve () 
      {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
      getNutritionist()
      {
        let me = this;
        axios.get('api/Nutritionists/GetNutritionistById/'+this.nutritionistId)
        .then(function(response){
          me.nutritionistId = response.data.nutritionistId;
          me.username = response.data.username;
          me.firstName = response.data.firstName;
          me.lastName = response.data.lastName;
          me.cnpNumber = response.data.cnpNumber;
          me.email = response.data.email;
          }).catch(function(error){
            console.log(error);
            });
      },
      submit()
      {
        try
        {
          let me = this;
          axios.post('api/Appointments',{
            'clientId': me.clientId,
            'nutritionistId': me.nutritionistId,
            'appointmentDate': me.appointmentDate,
            'nutritionistNotes': me.nutritionistNotes,
            })
        }
        finally
        {
          let me = this;
          axios.post('api/Bills',{
            'clientId': me.clientId,
            'amount': me.amount,
            'ruc': me.ruc,
            'billDate': me.billDate,
            })
        }
      }
    },
  }
</script>