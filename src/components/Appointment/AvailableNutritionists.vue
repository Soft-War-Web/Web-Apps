<template>
<div style=";width: 100% ">
      <v-toolbar flat color="blue">
        <v-toolbar-title>Nutricionistas disponibles</v-toolbar-title>
      </v-toolbar>
    <br>
    <div class="d-flex flex-wrap  justify-space-between">
    <v-card class="mx-auto mb-10" max-width="400" v-for="(nutritionist,i) in nutritionists" :key="i" >
    <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <v-card-title>{{nutritionist.username}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">Nombre</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{nutritionist.firstName+' '+nutritionist.lastName}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">Email</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{nutritionist.email}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">Número CNP</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{nutritionist.cnpNumber}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn text @click="goSelectedNutritionist(nutritionist)"> Agendar </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data: () => ({
        idRoute: null,
        id: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        clientId: '',
        cnpNumber:'',
        createdAt: '',    
        nutritionists: [],
        loading: false,
    }),
    created () 
    {
      this.clientId=this.$route.params.id;
      this.list();
    },
    methods: 
    {
      reserve ()
      {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
      list()
      {
        let me = this;
        axios.get('api/Nutritionists')
        .then(function(response){
          me.nutritionists = response.data;
          console.log(response.data);
          }).catch(function(error){
            console.log(error);
            });
      },
      goSelectedNutritionist(item)
      {
        let me = this;
        me.$router.push({name: 'nutritionistSelected', params: {clientId: me.idRoute, nutritionistId: item.nutritionistId}});
      },
    },
  }
</script>