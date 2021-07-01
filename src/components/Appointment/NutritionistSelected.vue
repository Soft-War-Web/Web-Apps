<template>
<v-btn block>
    {{clientId}}
</v-btn>
</template>

<script>
import axios from 'axios'
  export default {
    data: () => ({
        dialog: false,
            id: '',
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            cnpNumber:'',
            createdAt: '',    
            nutritionist: '',
            props: [
                clientId
            ],
            loading: false,
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
            metodo(){
                alert('a');
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