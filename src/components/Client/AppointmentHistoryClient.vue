<template>
<div style=";width: 100% ">
    <template >
      <v-toolbar flat color="white">
        <v-toolbar-title>Appointment History</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template >
    <div class="d-flex flex-wrap  justify-space-between">
        <v-card class="mx-auto mb-10" max-width="400" v-for="(appointment,i) in appointments" :key="i" >
            <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
            </v-img>
            <v-card-text class="text--primary">
            <div><b>Nutricionista:</b> {{getNutritionistById(appointment.nutritionistId)}}</div>
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
        clientId: 0,
        nutritionistName: '',
        dietName: '',
        search: "",
        editedIndex: -1,
        loading: false,
        dietId: '',
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
            this.clientId=this.$route.params.id;
            this.list();
        },
    methods: {
      reserve () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
      list(){
                let me = this;
                axios.get('api/Appointments/GetAppointmentByClient/'+this.clientId,{
                  'id': this.clientId
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
            getNutritionistById: function(id){
              let me = this;
              axios.get('api/Nutritionists/GetNutritionistById/'+ id,{
                'id': id
              }).then(function(response){
                me.nutritionistName = response.data.firstName + ' ' + response.data.lastName;
              }).catch(function(error){
                console.log(error);
              });
              return this.nutritionistName;
            },
            getDietById: function(id){
              let me = this;
                axios.get('api/Diets/GetDietById/'+ id,{
                  'id': id
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
            }

    },
  }
</script>