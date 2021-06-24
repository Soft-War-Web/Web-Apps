<template>
  <v-data-table
    :headers="headers"
    :items="clients"
    :search="search"
    sort-by="username"
    class="elevation-1" style="width:800px"><!--Se agregó el style-->
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>CRUD Categories</v-toolbar-title>
        <v-divider 
          class="mx-4" 
          inset 
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field class="text-xs-center" v-model="search" 
        append-icon="search" label="Search Category"  
        single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Client</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="username" label="Username"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="password" label="Password"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="firstName" label="FirstName"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="lastName" label="LastName"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-date-picker v-model="createdAt" label="Created at"></v-date-picker>
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
        <td>{{ item.username }}</td>
        <td>{{ item.password }}</td>
        <td>{{ item.firstName }}</td>
        <td>{{ item.lastName }}</td>
        <td>{{ item.email }}</td>
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
                { text: 'Username', value: 'username', sortable: true},
                { text: 'Password', value: 'password', sortable: false},
                { text: 'FirstName', value: 'firstName', sortable: true},
                { text: 'LastName', value: 'lastName', sortable: true},
                { text: 'Email', value: 'email', sortable: true}
          ],
            id: '',
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: '',
            createdAt: '',
            clients: [],
            search: '',
            editedIndex: -1
        }),
        computed: {
          formTitle(){
            return this.editedIndex === -1 ? 'New Client' : 'Edit Client'
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
                axios.get('api/Clients')
                .then(function(response){
                  me.clients = response.data;
                }).catch(function(error){
                  console.log(error);
                });
            },
            editItem(item){
              this.id = item.clientId;
              this.username = item.username;
              this.password = item.password;
              this.firstName = item.firstName;
              this.lastName = item.lastName;
              this.email = item.email;
              this.createdAt = item.createdAt;
              this.editedIndex = 1;
              this.dialog = true;
            },
            deleteItem (item) {
              let me = this;
              if(confirm('¿Estás seguro que quieres eliminar este Category?'))
                axios.delete('api/Clients/'+item.clientId,{
                      'id': item.clientId
                }).then(function(response){
                  console.log(item.id);
                  me.close();
                  me.list();                    
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
            },
            close() {
                this.dialog = false
            },
            clean(){
                this.id = "";
                this.username = "";
                this.password = "";
                this.firstName = "";
                this.lastName = "";
                this.email = "";
                this.createdAt = "";
                this.editedIndex=-1;
            },
            save() {
              let me = this;
              if(this.editedIndex > -1) { //Editar Category
                axios.put('api/Clients/PutClient',{
                          'clientId': me.id,
                          'username': me.username,
                          'password': me.password,
                          'firstName': me.firstName,
                          'lastName': me.lastName,
                          'email': me.email,
                          'createdAt': me.createdAt
                }).then(function(response){
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
              } else{
                axios.post('api/Clients',{ // Nuevo Category
                          'username': me.username,
                          'password': me.password,
                          'firstName': me.firstName,
                          'lastName': me.lastName,
                          'email': me.email,
                          'createdAt': me.createdAt
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