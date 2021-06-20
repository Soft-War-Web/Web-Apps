<template>
  <v-data-table
    :headers="headers"
    :items="recipes"
    :search="search"
    sort-by="name"
    class="elevation-1" style="width:800px"><!--Se agregó el style-->
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Recipe</v-toolbar-title>
        <v-divider 
          class="mx-4" 
          inset 
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="search" 
        append-icon="search" label="Search Recipe"  
        single-line hide-details></v-text-field>
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
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.preparation }}</td>
        <td>{{ item.ingredients }}</td>
        <td>{{ item.nutritionistId }}</td>
        
        <td class="justify-center layout px-0">
          <v-icon 
            small 
            class="mr-2" 
            @click="editItem(item)"
          >
            edit
          </v-icon>
          <v-icon 
            small 
            class="mr-2" 
            @click="deleteItem(item)"
          >
            delete
          </v-icon>
        </td>
      </tr>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="list">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
    import axios from 'axios'
    export default {
        data: () => ({
          dialog: false,
          headers: [
                { text: 'Name', value: 'name', sortable: true},
                { text: 'Description', value: 'description', sortable: false},
                { text: 'Preparation', value: 'preparation', sortable: true},
                { text: 'Ingredients', value: 'ingredients', sortable: true},
                { text: 'NutritionistId', value: 'nutritionistId', sortable: true},
          ],
            id: '',
            name: '',
            description: '',
            preparation: '',
            ingredients: '',
            lastModification: '',
            createdAt: '',
            recipes: [],
            nutritionists: [],
            nutritionistId: 0,
            search: "",
            editedIndex: -1
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
            list(){
                let me = this;
                axios.get('api/Recipes')
                .then(function(response){
                  me.recipes = response.data;
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
                this.lastModification = "";
                this.editedIndex=-1;
                this.nutritionistId="";
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
                          'createdAt': me.createdAt,
                          'lastModification': me.lastModification,
                          'nutritionistId': me.nutritionistId,
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