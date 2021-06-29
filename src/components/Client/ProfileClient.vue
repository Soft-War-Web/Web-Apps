<template>
  <div>
  <v-card class="d-flex d-flex flex-column flex-sm-row">
    <div class="d-flex flex-column align-center">
      <v-card-title class="mb-12 text-h6 text-md-h4 font-weight-medium">Client Profile</v-card-title>
      <v-img
          src="https://assets.turbologo.com/blog/es/2019/11/19132900/gaming-logo-cover-958x575.jpg"
          alt=""
          max-width="400px"
          max-height="400px"
      ></v-img>
    </div>
    
    <v-card class="elevation-0" width="10vh" height="40vh">

    </v-card>
    <v-card class="elevation-0 d-flex flex-column space-evenly font-weight-medium justify-center" width="40vh" >
      <v-card-subtitle class="pb-1 " >Username</v-card-subtitle>
      <v-card-text class="text--primary">
      <div>{{username}}</div>
      </v-card-text>  
      <v-card-subtitle class="pb-0">First Name</v-card-subtitle>
      <v-card-text class="text--primary">
      <div>{{firstName}}</div>
      </v-card-text>
      <v-card-subtitle class="pb-0">Last Name</v-card-subtitle>
      <v-card-text class="text--primary">
      <div>{{lastName}}</div>
      </v-card-text>
      <v-card-subtitle class="pb-0">E-mail</v-card-subtitle>
      <v-card-text class="text--primary">
      <div>{{email}}</div>
      </v-card-text>
    </v-card>
  </v-card>
  </div>
</template>

<script>
  import axios from 'axios'
export default{
  data: () => ({
    id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    createdAt: new Date(),
    clients: '',
    clientId: 1,
    showPassword: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
  }),
  created () {
    this.listByClientId();
  },
  methods: {
    
    listByClientId(){
      let me = this;
      axios.get('api/Clients/GetClientById/'+this.clientId)
      .then(function(response){
        me.username = response.data.username;
        me.firstName = response.data.firstName;
        me.lastName = response.data.lastName;
        me.email = response.data.email;
        console.log(response.data);
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
      this.createdAt = "";
    },
    save(){
      let me = this;
      axios.post('api/Clients',{
        'username': me.username,
        'password': me.password,
        'firstName': me.firstName,
        'lastName': me.lastName,
        'email': me.email,
        'createdAt': me.createdAt
      }).then(function(response){
          me.close();
          me.clean();
      }).catch(function(error){
          console.log(error);
      });
      this.$router.push('/register');
    }
  }
}
</script>
