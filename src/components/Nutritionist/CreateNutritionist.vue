<template>
<div style=";width: 100% ">
    <template >
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Nutritionist</v-toolbar-title>
        <v-divider 
          class="mx-4" 
          inset 
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Nutritionist</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                   <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="username" label="Username"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="password" label="Password"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="firstName" label="FirstName"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="lastName" label="LastName"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="cnpNumber" label="CnpNumber"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-date-picker v-model="createdAt" label="Created at"></v-date-picker>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn><!--Antes <v-btn>-->
              <v-btn color="blue darken-1" text @click="save">Save</v-btn><!--Antes <v-btn>-->
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template >
    <div class="d-flex flex-wrap  justify-space-between">
    <v-card class="mx-auto mb-10" max-width="400" v-for="(nutritionist,i) in nutritionists" :key="i" >
    <v-img class="white--text align-end" height="200px" src="https://bootdey.com/img/Content/avatar/avatar7.png">
      <v-card-title>{{nutritionist.username}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">Username</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{nutritionist.description}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">Password</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{nutritionist.password}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">FirstName</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{nutritionist.firstName}}</div>
    </v-card-text>
     <v-card-subtitle class="pb-0">LastName</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{nutritionist.lastName}}</div>
    </v-card-text>
     <v-card-subtitle class="pb-0">Email</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{nutritionist.eEmail}}</div>
    </v-card-text>
     <v-card-subtitle class="pb-0">CnpNumber</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{nutritionist.cnpNumber}}</div>
    </v-card-text>
     <v-card-subtitle class="pb-0">Created at</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{nutritionist.createdAt}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text @click="editItem(nutritionist)"> Edit </v-btn>
      <v-btn color="orange" text @click="deleteItem(nutritionist)"> Delete </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</div>
</template>

<script>
    import axios from 'axios'
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
            search: '',
            editedIndex: -1,
            loading: false,
    }),

    computed: {
        formTitle(){
            return this.editedIndex === -1 ? 'New Nutritionist' : 'Edit Nutritionist'
        },
    },
        watch: {
          dialog (val){
            val || this.close()
          },
        },
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
            editItem(item){
               this.id = item.nutritionistId;
              this.username = item.username;
              this.password = item.password;
              this.firstName = item.firstName;
              this.lastName = item.lastName;
              this.email = item.email;
              this.cnpNumber = item.cnpNumber;
              this.createdAt = item.createdAt;
              this.editedIndex = 1;
              this.dialog = true;
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
            close() {
                this.dialog = false
            },
            clean(){
                this.id = "";
                this.username = "";
                this.password = "";
                this.firstName = "";
                this.lastName = "";
                this.email = "";
                this.cnpNumber = "";
                this.createdAt = "";
                this.editedIndex=-1;
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