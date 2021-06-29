<template>
<div style=";width: 100% ">
    <template >
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Recipe</v-toolbar-title>
        <v-divider 
          class="mx-4" 
          inset 
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Recipe</v-btn>
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
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="nutritionistId" label="Nutritionist Id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="favorites" label="Favorite"></v-text-field>
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
    <v-card class="mx-auto mb-10" max-width="400" v-for="(recipe,i) in recipes" :key="i" >
    <v-img class="white--text align-end" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
      <v-card-title>{{recipe.name}}</v-card-title>
    </v-img>
    <v-card-subtitle class="pb-0">Description</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{recipe.description}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">Preparation</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{recipe.preparation}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">Ingredients</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{recipe.ingredients}}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0">Favorites</v-card-subtitle>
    <v-card-text class="text--primary">
      <div>{{recipe.favorites}}</div>
    </v-card-text>
    <v-card-actions>
    <v-btn fab dark small color="orange" @click="updatefavorite(recipe)">
      <v-icon dark>star</v-icon>
    </v-btn>
      <v-btn color="orange" text @click="editItem(recipe)"> Edit </v-btn>
      <v-btn color="orange" text @click="deleteItem(recipe)"> Delete </v-btn>
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
            this.list();
        },
    methods: {
      reserve () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
      },
      list(){
                let me = this;
                axios.get('api/Recipes')
                .then(function(response){
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
            deleteItem (item) {
              let me = this;
              if(confirm('¿Estás seguro que quieres eliminar este Category?'))
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
                this.createdAt = "";
                this.favorites = "";
                this.lastModification = "";
                this.editedIndex = -1;
                this.nutritionistId= "";
            },

            //me -> es el elemento del bucle 
            updatefavorite(recipe){
              recipe.favorites=recipe.favorites+1;
              console.log(recipe.nutritionistId);
                axios.put('api/Recipes/PutRecipe',{
                          'recipeId': recipe.recipeId,
                          'name': recipe.name,
                          'description': recipe.description,
                          'preparation': recipe.preparation,
                          'ingredients': recipe.ingredients,
                          'favorites': recipe.favorites,
                }).then(function(response){
                  console.log(response);
                }).catch(function(error){
                  console.log(error);
                });
            },
            
            save() {
              let me = this;
              this.getNutritionistById(this.nutritionistId);
              if(this.editedIndex > -1) { //Editar Category
                axios.put('api/Recipes/PutRecipe',{
                          'recipeId': me.id,
                          'name': me.name,
                          'description': me.description,
                          'preparation': me.preparation,
                          'ingredients': me.ingredients,
                          'favorites': me.favorites,
                          'nutritionistId': me.nutritionistId,
                          'createdAt': me.createdAt,
                          'lastModification': me.lastModification
                }).then(function(response){
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
              } else{
                axios.post('api/Recipes',{ // Nuevo Category
                          'nutritionistId': me.nutritionistId,
                          'name': me.name,
                          'description': me.description,
                          'preparation': me.preparation,
                          'ingredients': me.ingredients,
                          'favorites': me.favorites,
                          'createdAt': me.createdAt,
                          'lastModification': me.lastModification
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