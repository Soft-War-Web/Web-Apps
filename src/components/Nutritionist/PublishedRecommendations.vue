<template>
<div style=";width: 100% ">
    <template >
      <v-toolbar flat color="white">
        <v-toolbar-title>Tus Recomendaciones</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Publicar recomendación</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="name" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="description" label="Descripción"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="save()">Publicar</v-btn>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template >
    <div class="d-flex flex-wrap  justify-space-between">
        <v-card class="mx-auto mb-10" max-width="400" v-for="(recommendation,i) in recommendations" :key="i" >
            <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                <v-card-title>{{recommendation.name}}</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0">Descripción</v-card-subtitle>
            <v-card-text class="text--primary">
            <div>{{recommendation.description}}</div>
            </v-card-text>
            
            <v-card-actions>
            <v-btn color="orange" text @click="removeRecommendation(recommendation)"> Eliminar</v-btn>
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
        value: 'recent',
        id: '',
        name: '',
        description: '',
        lastModification: new Date(),
        createdAt: new Date(),
        recommendations: [],
        nutritionists: [],
        nutritionistId: 0,
        search: "",
        editedIndex: -1,
        loading: false,
    }),

    computed: {
        formTitle(){
            return this.editedIndex === -1 ? 'New Recipe' : 'Edit Recipe'
        },
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
                axios.get('api/Recommendations/GetRecommendationsFromNutritionist/'+this.nutritionistId,{
                  'NutritionistId': this.nutritionistId,
                }).then(function(response){
                  me.recommendations = response.data;
                  console.log(response.data);
                }).catch(function(error){
                  console.log(error);
                });
      },/*
      editItem(item){
        this.id = item.recipeId;
        this.name = item.name;
        this.description = item.description;
        this.createdAt = item.createdAt;
        this.lastModification = item.lastModification;
        this.nutritionistId = item.nutritionistId;
        this.editedIndex = 1;
        this.dialog = true;
      },*/
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
                this.createdAt = new Date();
                this.lastModification = new Date();
                this.editedIndex = -1;
                this.nutritionistId= "";
            },
            save(){
                let me = this;
                axios.post('api/Recommendations',{ // Publicar recomendación
                        'nutritionistId': this.nutritionistId,
                        'name': me.name,
                        'description': me.description,
                        'createdAt': me.createdAt,
                        'lastModification': me.lastModification,
                }).then(function(response){
                  me.list();
                  me.clean();
                  me.close();
                }).catch(function(error){
                  console.log(error);
                });
            },
            removeRecommendation (item) {
              let me = this;
              if(confirm('¿Estás seguro de que quieres eliminar esta recommendación?'))
                axios.delete('api/Recommendations/'+item.recommendationId,{
                      'recommendationId': item.recommendationId
                }).then(function(response){
                  console.log(item.id);
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
            },
    },
  }
</script>