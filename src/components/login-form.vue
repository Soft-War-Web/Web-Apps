<template>
  <section class="section-container">
    <v-row class="signin">
      <v-col cols="12" class="left">
        <h1>{{text}}</h1>
      </v-col>
      <v-col cols="16" class="right">
        <h2>LOGIN</h2>
        <validation-observer ref="observer">
          <v-form @submit.prevent="submit">
            <validation-provider v-slot="{ errors }" name="email" rules="required|email">
              <v-text-field
                v-model="email"
                :error-messages="errors"
                label="Email"
                required
                outlined
                dark
                filled
                dense
              ></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="password" rules="required">
              <v-text-field
                v-model="password"
                :error-messages="errors"
                label="Password"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPass = !showPass"
                required
                outlined
                dense
                dark
                filled
                :type="showPass ? 'text' : 'password'"
              ></v-text-field>
            </validation-provider>
            <div class="text-center">
              <v-btn class="green" type="submit" rounded color="white" dark>
                Ingresar
              </v-btn>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
              <v-btn class="green" rounded color="white" dark @click="goRegisterClient()">
                Registro Cliente
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn class="green" rounded color="white" dark @click="goRegisterNutritionist()">
                Registro Nutricionista
              </v-btn>
            </div>
          </v-form>
        </validation-observer>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { required, email } from 'vee-validate/dist/rules'
import { extend, ValidationProvider, setInteractionMode, ValidationObserver } from 'vee-validate'
import axios from 'axios'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    email: '',
    password: '',
    showPass: false,
    auth: '',
    pass: ''
  }),
  computed: {
    params() {
      return {
        email: this.email,
        password: this.password
      }
    }
  },
  methods: {
    clear(){
      this.email = '',
      this.password = ''
    },
    async submit() {
       try {
         let me = this;
         axios.get('api/Clients/GetClientByEmail/'+this.email)
         .then(function(response){
           if(me.password == response.data.password){
             me.$router.push({name: 'HomeC', params: {id: response.data.clientId}});
           }
           else{
             alert('La contraseña es incorrecta');
           }
         });
         }
         finally{
          let me = this;
         axios.get('api/Nutritionists/GetNutritionistByEmail/'+this.email)
         .then(function(response){
           if(me.password == response.data.password){
             me.$router.push({name: 'HomeN', params: {id: response.data.nutritionistId}});
           }
           else{
             alert('La contraseña es incorrecta');
           }
         });
       }
    },
    clear() {
      this.email = ''
      this.password = null
      this.$refs.observer.reset()
    },
    goRegisterClient(){
      let me = this;
      me.$router.push({name: 'registerClient'});
    },
    goRegisterNutritionist(){
      let me = this;
      me.$router.push({name: 'registerNutritionist'});
    }
  }
}
</script>