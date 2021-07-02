<template>
<div style=";width: 100% ">
    <template >
      <v-toolbar flat color="white">
        <v-toolbar-title>Asesorías pendientes</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn color="green" @click="goBack()">Atrás</v-btn>
      </v-toolbar>
    </template >
    <div class="d-flex flex-wrap  justify-space-between">
        <v-card class="mx-auto mb-10" max-width="400" v-for="(appointment,i) in appointments" :key="i" >
            <v-img class="white--text align-end" height="200px" src="https://www.crmsoftwareapp.com/blog/blog-image/lumin-header.png">
            </v-img>
            <v-card-text class="text--primary">
            <div><b>Cliente:</b> {{getClientById(appointment.clientId)}}</div>
            </v-card-text>
            <v-card-text class="text--primary">
            <div><b>Fecha:</b> {{appointment.appointmentDate}}</div>
            </v-card-text>
            <v-card-text class="text--primary">
            <div><b>Dieta:</b> {{getDietById(appointment.dietId)}}</div>
            </v-card-text>
            <v-card-text class="text--primary">
            <div><b>Anotaciones:</b> {{appointment.nutritionistNotes}}</div>
            </v-card-text>
        </v-card>
    </div>
</div>
</template>
<script>
    import axios from 'axios'
  export default {
    data: () => ({
        dialog: false,
        value: 'recent',
        id: '',
        name: '',
        description: '',
        preparation: '',
        ingredients: '',
        lastModification: new Date(),
        createdAt: new Date(),
        favorites: 0,
        recipes: [],
        appointments: [],
        nutritionists: [],
        nutritionistId: 0,
        clientName: '',
        dietName: '',
        search: "",
        editedIndex: -1,
        loading: false,
    }),

    computed: {
        formTitle(){
            return this.editedIndex === -1 ? 'New Recipe' : 'Edit Recipe'
        }
    },
        watch: {
          dialog (val){
            val || this.close()
          },
        },
        created () {
            this.nutritionistId=this.$route.params.id;
            this.list();
        },
    methods: {
      reserve () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
      list(){
                let me = this;
                axios.get('api/Appointments/GetAppointmentByNutritionist/'+this.nutritionistId,{
                  'id': this.nutritionistId
                })
                .then(function(response){
                  me.appointments = response.data;
                  console.log(response.data);
                }).catch(function(error){
                  console.log(error);
                });
      },
      editItem(item){
        this.nutritionistId = item.nutritionistId;
        this.dietId = item.dietId;
        this.appointmentId = item.appointmentId;
        this.appointmentDate = item.appointmentDate;
      },
            getNutritionistById(){
                axios.get('api/Nutritionists/GetNutritionistById/'+this.nutritionistId)
                .then(function(response){
                  this.nutritionistId=response.data.nutritionistId;
                }).catch(function(error){
                  console.log(error);
                });
            },
            getClientById: function(id){
              let me = this;
              axios.get('api/Clients/GetClientById/'+ id,{
                'id': id
              }).then(function(response){
                me.clientName = response.data.firstName + ' ' + response.data.lastName;
              }).catch(function(error){
                console.log(error);
              });
              return this.clientName;
            },
            getDietById: function(id2){
              let me = this;
              axios.get('api/Diets/GetDietById/'+ id2,{
                'id': id2
              }).then(function(response){
                me.dietName = response.data.dietName;
              }).catch(function(error){
                console.log(error);
              });
              return this.dietName;
            },
            close() {
                this.dialog = false
            },
            clean(){
                this.id = "";
                this.name = "";
                this.description = "";
                this.preparation = "";
                this.ingredients = "";
                this.createdAt = "";
                this.favorites = "";
                this.lastModification = "";
                this.editedIndex = -1;
                this.nutritionistId= "";
            },
      goBack(){
        let me = this;
        me.$router.push({name: 'HomeN', params: {id: this.nutritionistId}});
      }

    },
  }
</script>