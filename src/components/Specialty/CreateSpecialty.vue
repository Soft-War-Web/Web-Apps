<template>
  <div class="align-center d-flex flex-column mx-auto">
    <v-card  class="d-flex flex-column  align-center space-evenly elevation-10 mt-10 mt-sm-0 mx-auto my-auto">
      <div class="d-flex flex-column align-center">
        <v-card-title class="mb-12 text-h6 text-md-h4 font-weight-medium">Register Specialty</v-card-title>
        <v-img
            src="https://assets.turbologo.com/blog/es/2019/11/19132900/gaming-logo-cover-958x575.jpg"
            alt=""
            max-width="112px"
            max-height="112px"
        ></v-img>
      </div>
      <v-form  class="form-container">
        <v-container class="d-flex flex-column">
          <v-text-field v-model="specialtyName" label="specialtyName" placeholder="Ex.Medicina" required outlined></v-text-field>
          <v-text-field v-model="institutionName" label="institutionName" placeholder="Ex.UPC" required outlined></v-text-field>     
        </v-container> 
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="clean">Cancel</v-btn><!--Antes <v-btn>-->
        <v-btn color="blue darken-1" text @click="save">Save</v-btn><!--Antes <v-btn>-->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  data: () => ({
    id: '',
    specialtyName: '',
    institutionName: '',
   
  }),
  
  methods: {
    close() {
      this.dialog = false
    },
    clean(){
      this.id = "";
      this.specialtyName = "";
      this.institutionName = "";
    },
    save(){
      let me = this;
      axios.post('api/Specialties',{
        'specialtyName': me.specialtyName,
        'institutionName': me.institutionName
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