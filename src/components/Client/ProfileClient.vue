<template>
  <div>
   <!-- 
  <template>
  <v-toolbar flat color="white">
        <v-toolbar-title>Perfil</v-toolbar-title>
  </v-toolbar>
  </template>
  -->
  <v-card class="d-flex d-flex flex-column flex-sm-row">
    <div class="d-flex flex-column align-center">
      <v-card-title class="mb-12 text-h6 text-md-h4 font-weight-medium">Perfil</v-card-title>
      <v-img
          src="https://bootdey.com/img/Content/avatar/avatar7.png"
          alt=""
          max-width="400px"
          max-height="400px"
      ></v-img>
      <br>
      <div><h2><b>{{username}}</b> </h2></div>
    </div>
    
    <v-card class="elevation-0" width="10vh" height="40vh">

    </v-card>
    <v-card class="elevation-0 d-flex flex-column space-evenly font-weight-medium justify-center" width="40vh" >
      <v-card-text class="text--primary">
      </v-card-text>
      <v-card-text class="text--primary">
      <div><h2><b>Nombre:</b> {{firstName}} {{lastName}}</h2></div>
      </v-card-text>
      <v-card-text class="text--primary">
      <div><h2><b>Email:</b> {{email}}</h2></div>
      </v-card-text>
      <v-card-actions>
        
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="green" v-on="on">Modificar información</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Modificar información</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="username" label="Username"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="firstName" label="Nombres"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="lastName" label="Apellidos"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="email" label="Email"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-btn color="green" @click="editClient()">Modificar</v-btn>
              <v-btn color="green" @click="close()">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-spacer></v-spacer>
        
      <v-btn color="green" @click="deleteClient()"> Eliminar cuenta </v-btn>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
      <v-btn color="green" @click="goBack()"> Atrás </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
  </div>
</template>

<script>
  import axios from 'axios'
export default{
  data: () => ({
    dialog: false,
    id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    createdAt: new Date(),
    client: null,
    clientId: 0,
    showPassword: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
  }),
  created () {
    this.clientId=this.$route.params.id;
    this.listByClientId();
  },
  methods: {
    listByClientId(){
      let me = this;
      axios.get('api/Clients/GetClientById/'+this.clientId)
      .then(function(response){
        me.username = response.data.username;
        me.password = response.data.password;
        me.firstName = response.data.firstName;
        me.lastName = response.data.lastName;
        me.email = response.data.email;
        console.log(response.data);
      }).catch(function(error){
        console.log(error);
    });
    },
    close() {
      this.dialog = false;
    },
    clean(){
      this.id = "";
      this.username = "";
      this.password = "";
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.createdAt = "";
    }, 
    deleteClient(){
      let me = this;
      if(confirm('¿Estás seguro de que quieres eliminar tu cuenta?'))
        axios.delete('api/Clients/'+this.clientId,{
          'id': this.clientId
        }).then(function(response){
          console.log(me.clientId);
          me.close();
          me.listByClientId();
        }).catch(function(error){
          console.log(error);
        });
    },
    editClient(){
      let me = this;
      if(confirm('¿Estás seguro de que quieres modificar tu información?'))
      axios.put('api/Clients/PutClient',{
        "clientId": this.clientId,
        "username": me.username,
        "password": me.password,
        "firstName": me.firstName,
        "lastName": me.lastName,
        "email": me.email
      }).then(function(response){
        me.close();
        me.listByClientId();
      }).catch(function(error){
        console.log(error);
      });
    },
    goBack(){
      let me = this;
      me.$router.push({name: 'HomeC', params: {id: this.clientId}});
    }
  }
}
</script>
