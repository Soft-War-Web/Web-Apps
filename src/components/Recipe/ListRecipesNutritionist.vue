<template>
<div style=";width: 100% ">
    <template >
      <v-toolbar flat color="white">
        <v-toolbar-title>Recetas</v-toolbar-title>
        <v-spacer></v-spacer>
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