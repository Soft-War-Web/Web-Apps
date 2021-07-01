<template>
<div style=";width: 100% ">
    <template >
      <v-toolbar flat color="white">
        <v-toolbar-title>Nutricionistas disponibles</v-toolbar-title>
      </v-toolbar>
    </template >
    <div class="d-flex flex-wrap  justify-space-between">
    <v-card class="mx-auto mb-10" max-width="400" v-for="(nutritionist,i) in nutritionists" :key="i" >
    <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <v-card-title>{{nutritionist.username}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">Name</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{nutritionist.firstName+' '+nutritionist.lastName}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">Email</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{nutritionist.email}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">CnpNumber</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{nutritionist.cnpNumber}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" to="/nutritionistSelected"> Agendar </v-btn>
      <v-btn to="/nutritionistSelected"> Nose </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</div>
</template>

<nutritionistSelected: clientId="clientId" @send=""/>

<script>
import axios from 'axios'
import { nutritionistSelected } from "./NutritionistSelected.vue";
export default {
    data: () => ({
        dialog: false,
        id: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        cnpNumber:'',
        createdAt: '',    
        nutritionists: [],
        loading: false,
        return: {
            clientId: 1
            }
    }),
        created () {
            this.list();
        },
    methods: {
      reserve () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
      list(){
                let me = this;
                axios.get('api/Nutritionists')
                .then(function(response){
                  me.nutritionists = response.data;
                  console.log(response.data);
                }).catch(function(error){
                  console.log(error);
                });
            },
            deleteItem (item) {
              let me = this;
              if(confirm('¿Estás seguro que quieres eliminar este Category?'))
                axios.delete('api/Nutritionists/'+item.nutritionistId,{
                      'id': item.nutritionistId
                }).then(function(response){
                  console.log(item.id);
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
            },
            getNutritionistById(){
                axios.get('api/Nutritionists/GetNutritionistById/'+this.nutritionistId)
                .then(function(response){
                  this.nutritionistId=response.data.nutritionistId;
                }).catch(function(error){
                  console.log(error);
                });
            },            
            save() {
              let me = this;
              this.getNutritionistById(this.nutritionistId);
              if(this.editedIndex > -1) { //Editar Category
                axios.put('api/Nutritionists/PutNutritionist',{
                           'nutritionistId': me.id,
                          'username': me.username,
                          'password': me.password,
                          'firstName': me.firstName,
                          'lastName': me.lastName,
                          'email': me.email,
                          'cnpNumber':me.cnpNumber,
                          'createdAt': me.createdAt
                }).then(function(response){
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
              } else{
                axios.post('api/Nutritionists',{ // Nuevo Category
                         'username': me.username,
                          'password': me.password,
                          'firstName': me.firstName,
                          'lastName': me.lastName,
                          'email': me.email,
                          'cnpNumber':me.cnpNumber,
                          'createdAt': me.createdAt
                          
                }).then(function(response){
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
            }
            this.close()
          },
    },
  }
</script>