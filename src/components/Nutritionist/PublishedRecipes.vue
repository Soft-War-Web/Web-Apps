<template>
<div style=";width: 100% ">
    <template >
      <v-toolbar flat color="white">
        <v-toolbar-title>Tus Recetas</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer><v-spacer></v-spacer>
        <v-btn color="green" @click="goBack()">Atrás</v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="green" v-on="on">Publicar receta</v-btn>
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
                    <v-text-field v-model="preparation" label="Preparation"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="ingredients" label="Ingredients"></v-text-field>
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
        <v-card class="mx-auto mb-10" max-width="400" v-for="(recipe,i) in recipes" :key="i" >
            <v-img class="white--text align-end" height="200px" src="https://www.welloneapp.com/wp-content/uploads/2019/05/29-4-768x512.jpg">
                <v-card-title>{{recipe.name}}</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0">Descripción</v-card-subtitle>
            <v-card-text class="text--primary">
            <div>{{recipe.description}}</div>
            </v-card-text>
            <v-card-subtitle class="pb-0">Preparación</v-card-subtitle>
            <v-card-text class="text--primary">
            <div>{{recipe.preparation}}</div>
            </v-card-text>
            <v-card-subtitle class="pb-0">Ingredientes</v-card-subtitle>
            <v-card-text class="text--primary">
            <div>{{recipe.ingredients}}</div>
            </v-card-text>
            <v-card-subtitle class="pb-0">Favoritos</v-card-subtitle>
            <v-card-text class="text--primary">
            <div>{{recipe.favorites}}</div>
            </v-card-text>
            <v-card-actions>
            <v-btn color="orange" text @click="editRecipe(recipe)"> Modificar</v-btn>
            <v-btn color="orange" text @click="removeRecipe(recipe)"> Eliminar receta </v-btn>
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
        preparation: '',
        ingredients: '',
        lastModification: new Date(),
        createdAt: new Date(),
        favorites: 0,
        recipes: [],
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
                axios.get('api/Recipes/GetRecipesFromNutritionist/'+this.nutritionistId,{
                  'NutritionistId': this.nutritionistId,
                }).then(function(response){
                  me.recipes = response.data;
                  console.log(response.data);
                }).catch(function(error){
                  console.log(error);
                });
      },
      editItem(item){
        this.id = item.recipeId;
        this.name = item.name;
        this.description = item.description;
        this.preparation = item.preparation;
        this.ingredients = item.ingredients;
        this.createdAt = item.createdAt;
        this.lastModification = item.lastModification;
        this.nutritionistId = item.nutritionistId;
        this.favorites = item.favorites;
        this.editedIndex = 1;
        this.dialog = true;
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
                this.preparation = "";
                this.ingredients = "";
                this.createdAt = new Date();
                this.favorites = "";
                this.lastModification = new Date();
                this.editedIndex = -1;
                //this.nutritionistId= "";
            },
            save(){
                let me = this;
                axios.post('api/Recipes',{ // Publicar receta
                          'nutritionistId': this.nutritionistId,
                          'name': me.name,
                          'description': me.description,
                          'favorites': 0,
                          'preparation': me.preparation,
                          'ingredients': me.ingredients,
                          'createdAt': me.createdAt,
                          'lastModification': me.lastModification
                }).then(function(response){
                  me.list();
                  me.clean();
                  me.close();
                }).catch(function(error){
                  console.log(error);
                });
            },
            removeRecipe (item) {
              let me = this;
              if(confirm('¿Estás seguro de que quieres eliminar esta receta?'))
                axios.delete('api/Recipes/'+item.recipeId,{
                      'id': item.recipeId
                }).then(function(response){
                  console.log(item.id);
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
            },
      
      goBack(){
        let me = this;
        me.$router.push({name: 'HomeN', params: {id: this.nutritionistId}});
      }
    },
  }
</script>