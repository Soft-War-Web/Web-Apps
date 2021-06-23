<template>
<div style=";width: 100% ">
    <template >
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Recommendation</v-toolbar-title>
        <v-divider 
          class="mx-4" 
          inset 
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Recommendation</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="name" label="Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="description" label="Description"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-date-picker v-model="createdAt" label="created At"></v-date-picker>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-date-picker v-model="lastModification" label="Last Modificaction"></v-date-picker>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="nutritionistId" label="Nutritionist Id"></v-text-field>
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
    <v-card class="mx-auto mb-10" max-width="400" v-for="(recommendation,i) in recommendations" :key="i" >
    <v-card-text>
      <p class="text-h4 text--primary"> {{recommendation.name}} </p>
      <div class="text--primary"> {{recommendation.description}} </div>
    </v-card-text>
    <v-card-actions>
      <v-btn  color="deep-purple accent-4" text @click="editItem(recommendation)"> Edit </v-btn>
      <v-btn  color="deep-purple accent-4" text @click="deleteItem(recommendation)"> Delete </v-btn>
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
        name: '',
        description: '',
        lastModification: '',
        createdAt: '',
        recommendations: [],
        nutritionists: [],
        nutritionistId: 0,
        search: "",
        editedIndex: -1,
        loading: false,
    }),
    computed: {
        formTitle(){
            return this.editedIndex === -1 ? 'New Recommendation' : 'Edit Recommendation'
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
            axios.get('api/Recommendations')
            .then(function(response){
                me.recommendations = response.data;
                console.log(response.data);
            }).catch(function(error){
                console.log(error);
            });
        },
        editItem(item){
            this.id = item.recommendationId;
            this.name = item.name;
            this.description = item.description;
            this.createdAt = item.createdAt;
            this.lastModification = item.lastModification;
            this.nutritionistId = item.nutritionistId;
            this.editedIndex = 1;
            this.dialog = true;
        },
        deleteItem (item) {
            let me = this;
            if(confirm('¿Estás seguro que quieres eliminar este Recommendation?'))
            axios.delete('api/Recommendations/'+item.recommendationId,{
                'id': item.recommendationId
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
            this.name = "";
            this.description = "";
            this.createdAt = "";
            this.lastModification = "";
            this.editedIndex = -1;
            this.nutritionistId="";
        },
            
        save() {
            let me = this;
            this.getNutritionistById(this.nutritionistId);
            if(this.editedIndex > -1) {
                axios.put('api/Recommendations/PutRecommendation',{
                    'recommendationId': me.id,
                    'name': me.name,
                    'description': me.description, 
                    'nutritionistId': me.nutritionistId,
                    'createdAt': me.createdAt,
                    'lastModification': me.lastModification,
                }).then(function(response){
                    me.close();
                    me.list();
                    me.clean();
                }).catch(function(error){
                    console.log(error);
                });
            } else{
                axios.post('api/Recommendations',{
                    'nutritionistId': me.nutritionistId,
                    'name': me.name,
                    'description': me.description,
                    'createdAt': me.createdAt,
                    'lastModification': me.lastModification,
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