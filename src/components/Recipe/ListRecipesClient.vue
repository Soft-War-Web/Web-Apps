<template>
<div style=";width: 100% ">
    <template >
      <v-toolbar flat color="white">
        <v-toolbar-title>Recetas</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer><v-spacer></v-spacer>
        <v-btn color="green" @click="goBack()">Atrás</v-btn>
        <v-dialog v-model="dialog" max-width="900px">
          <template v-slot:activator="{ on }">
            <v-btn color="green" v-on="on">Recetas Favoritas</v-btn>
          </template>
          <div class="d-flex flex-wrap  justify-space-between">
                <v-card class="mx-auto mb-10" max-width="400" v-for="(recipe,i) in favoriteRecipes" :key="i" >
                    <v-img class="white--text align-end" height="200px" src="https://www.welloneapp.com/wp-content/uploads/2019/05/29-4-768x512.jpg">
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
                    <v-btn color="green" text @click="deleteFavoriteRecipe(recipe)"> Quitar de favoritos </v-btn>
                    </v-card-actions>
                </v-card>
            </div>
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
            <v-btn color="orange" text @click="addFavorite(recipe)"> Añadir a favoritos </v-btn>
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
        favoriteRecipes: [],
        nutritionists: [],
        clientId: 0,
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
                axios.get('api/Recipes')
                .then(function(response){
                  me.recipes = response.data;
                  console.log(response.data);
                }).catch(function(error){
                  console.log(error);
                });
                axios.get('api/Clients/GetRecipesFromClient/'+this.clientId,{
                    'ClientId': this.clientId
                }).then(function(response){
                  me.favoriteRecipes = response.data;
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
           addFavorite(item){
               let me = this;
               if(confirm('¿Estás seguro de que quieres incluir esta receta a tu lista de favoritos?')){
                axios.put('api/Clients/AddFavoriteRecipe/'+this.clientId+'/'+item.recipeId,{
                      'ClientId': this.clientId},{
                      'RecipeId': item.recipeId
                }).then(function(response){
                  console.log(item.id);
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
               }
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
            deleteFavoriteRecipe (item) {
              let me = this;
              if(confirm('¿Estás seguro de que quieres eliminar esta receta de tu lista de favoritos?'))
                axios.put('api/Clients/RemoveFavoriteRecipe/'+this.clientId+'/'+item.recipeId,{
                      'ClientId': this.clientId},{
                      'RecipeId': item.recipeId
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
              me.$router.push({name: 'HomeC', params: {id: this.clientId}});
            }
    },
  }
</script>