<template>
  <div class="align-center d-flex flex-column mx-auto">
    <v-card  class="d-flex flex-column  align-center space-evenly elevation-10 mt-10 mt-sm-0 mx-auto my-auto">
      <div class="d-flex flex-column align-center">
        <v-card-title class="mb-12 text-h6 text-md-h4 font-weight-medium">Registro Nutricionista</v-card-title>
        <v-img
            src="https://bootdey.com/img/Content/avatar/avatar7.png"
            alt=""
            max-width="112px"
            max-height="112px"
        ></v-img>
      </div>
      <v-form v-model="valid" class="form-container">
        <v-container class="d-flex flex-column">
          <v-text-field v-model="username" label="Username" placeholder="Ex.vetaman999" required outlined></v-text-field>
          <v-text-field v-model="password" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'" name="input-10-1" label="Password" hint="Al menos 8 caracteres" placeholder="Password" @click:append="showPassword = !showPassword" required outlined></v-text-field> 
          <v-text-field v-model="firstName" label="FirstName" placeholder="Ex.Hugo" required outlined></v-text-field>
          <v-text-field  v-model="lastName" label="LastName" placeholder="Ex.Quispe" required outlined></v-text-field>
          <v-text-field v-model="email" label="Email" placeholder="Ex.hugo.quispe12359@gmail.com" required  outlined></v-text-field>
          <v-text-field v-model="cnpNumber" label="CNP" placeholder="123456" required  outlined></v-text-field>
          
        </v-container> 
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="save()">Registrarse</v-btn>
        <v-btn color="blue darken-1" text @click="close()">Cancelar</v-btn>
      </v-card-actions>
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
    cnpNumber: '',
    showPassword: false,
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => (`The email and password you entered don't match`),
    },
  }),
  
  methods: {
    close() {
      this.$router.push('/');
    },
    clean(){
      this.id = "";
      this.username = "";
      this.password = "";
      this.firstName = "";
      this.lastName = "";
      this.email = new Date();
      this.cnpNumber = "";
      this.createdAt = "";
    },
    save(){
      let me = this;
      axios.post('api/Nutritionists',{
        'username': me.username,
        'password': me.password,
        'firstName': me.firstName,
        'lastName': me.lastName,
        'email': me.email,
        'cnpNumber': me.cnpNumber,
        'createdAt': me.createdAt
      }).then(function(response){
          me.close();
          me.clean();
      }).catch(function(error){
          console.log(error);
      });
      this.$router.push('/');
    }
  }
}
</script>