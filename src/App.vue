<template>
  <v-app id="inspire">
    <v-navigation-drawer 
     v-model="drawer" 
     :clipped="$vuetify.breakpoint.lgAndUp"
     app  
    >
    <v-list dense>
      <template>
        <v-list-item>
          <v-list-item-action>
            <v-icon>home</v-icon>
          </v-list-item-action>
          <v-list-item-title>
            Inicio
          </v-list-item-title>
        </v-list-item>
      </template>
      <template>
        <v-list-group>
          <v-list-item slot="activator">
            <v-list-item-content>
              <v-list-item-title>
                Login
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{name:'clients'}">
            <v-list-item-action>
              <v-icon>table_chart</v-icon>
            </v-list-item-action> 
            <v-list-item-content>
              <v-list-item-title>
                Login
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list-group>
      </template>
    </v-list>
    </v-navigation-drawer>

    <v-app-bar 
      :clipped-left="$vuetify.breakpoint.lgAndUp" 
      app
      color="blue darken-3" 
      dark
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <span class="hidden-sm-and-down">Nutricare</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>view_list</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container 
        class="fill-height" 
        fluid
      >
        <v-slide-x-transition mode="out-in">
          <router-view></router-view>
          <Login></Login>
        </v-slide-x-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import Login from "./views/Login.vue";

export default {
  name: 'App',
  
  components:{
    Login,
  },

  data: () => ({
    drawer:null
  }),
};
</script>
