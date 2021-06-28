<template>
<div style=";width: 100% ">
    <template >
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Appointment</v-toolbar-title>
        <v-text-field v-model="searchNutritionist" label="Nutritionist Id"></v-text-field>
        <v-btn color="primary" text @click="listByNutritionistId()">Listar</v-btn>
        <v-divider 
          class="mx-4" 
          inset 
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Appointment</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="clientId" label="Client id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="nutritionistId" label="Nutritionist id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="dietId" label="Diet id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="nutritionistNotes" label="Nutritionist notes"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-date-picker v-model="appointmentDate" label="Appointment Date"></v-date-picker>
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
    <v-card class="mx-auto mb-10" max-width="400" v-for="(appointment,i) in appointments" :key="i" >
    <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <v-card-title>{{appointment.id}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">Appointment id</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{appointment.appointmentId}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">Client id</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{appointment.clientId}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">Nutritionist id</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{appointment.nutritionistId}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">Nutritionist notes</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{appointment.nutritionistNotes}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text @click="editItem(appointment)"> Edit </v-btn>
      <v-btn color="orange" text @click="deleteItem(appointment)"> Delete </v-btn>
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
            clientId: '',
            nutritionistId: '',
            dietId: '',
            appointmentDate: '',
            nutritionistNotes: '',
            appointments: [],
            nutritionists: [],
            clients:[],
            search: "",
            editedIndex: -1,
            searchNutritionist: '',
            loading: false,
    }),

    computed: {
        formTitle(){
            return this.editedIndex === -1 ? 'New Appointment' : 'Edit Appointment'
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
                axios.get('api/Appointments')
                .then(function(response){
                  me.appointments = response.data;
                  console.log(response.data);
                }).catch(function(error){
                  console.log(error);
                });
            },
            listByNutritionistId(){
              let me = this;
              axios.get('api/Appointments/GetAppointmentByNutritionist/'+this.searchNutritionist)
              .then(function(response){
                me.appointments = response.data;
                console.log(response.data);
              }).catch(function(error){
                console.log(error);
              });
            },
            editItem(item){
              this.id = item.appointmentId;
              this.clientId = item.clientId;
              this.nutritionistId = item.nutritionistId;
              this.dietId = item.dietId;
              this.appointmentDate = item.appointmentDate;
              this.nutritionistNotes = item.nutritionistNotes;
              this.editedIndex = 1;
              this.dialog = true;
            },
            deleteItem (item) {
              let me = this;
              if(confirm('¿Estás seguro que quieres eliminar este Category?'))
                axios.delete('api/Appointments/'+item.appointmentId,{
                      'id': item.appointmentId
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
            getClientById(){
                axios.get('api/Clients/GetClientById/'+this.clientId)
                .then(function(response){
                  this.clientId=response.data.clientId;
                }).catch(function(error){
                  console.log(error);
                });
            },
            close() {
                this.dialog = false
            },
            clean(){
                this.id = "";
                this.clientId = "";
                this.nutritionistId = "";
                this.dietId = "";
                this.appointmentDate = "";
                this.nutritionistNotes = "";
                this.editedIndex = -1;
            },
            
            save() {
              let me = this;
              this.getNutritionistById(this.nutritionistId);
              this.getClientById(this.clientId);
              if(this.editedIndex > -1) { //Editar Category
                axios.put('api/Appointments/PutAppointment',{
                          'appointmentId': me.id,
                          'clientId': me.clientId,
                          'nutritionistId': me.nutritionistId,
                          'dietId': me.dietId,
                          'appointmentDate': me.appointmentDate,
                          'nutritionistNotes': me.nutritionistNotes, 
                }).then(function(response){
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
              } else{
                axios.post('api/Appointments',{ // Nuevo Category
                          'clientId': me.clientId,
                          'nutritionistId': me.nutritionistId,
                          'appointmentDate': me.appointmentDate,
                          'nutritionistNotes': me.nutritionistNotes,           
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