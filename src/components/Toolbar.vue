<template>
    <v-card color="grey lighten-4" flat tile>
      <v-toolbar dense  height="70px" clipped-left>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up" v-if="!logged"></v-app-bar-nav-icon>
        <v-toolbar-title class="green--text font-weight-bold text-h4 ml-4">Nutricare</v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="!logged" class="hidden-sm-and-down">
          <v-btn class="text-toolbar-btn mr-4 green--text" elevation="0" text-to="/" to="/">Home</v-btn>
          <v-btn class="text-toolbar-btn mr-4 green--text" elevation="1" outlined text-to="/" to="/login">Iniciar Sesión</v-btn>
          <v-btn class="text-toolbar-btn mr-4 green--text" elevation="0" outlined text-to="/" to="/register">Registrar Cliente</v-btn>
          <v-btn class="text-toolbar-btn mr-4 green--text" elevation="0" outlined text-to="/" to="/register">Registrar Nutricionista</v-btn>
        </div>
        <v-navigation-drawer
            v-model="drawer"
            temporary
            absolute
            width = "200"
            height="100vh"
            id = "drawer"
        >
          <v-list dense nav>
            <v-list-item
                v-for="item in buttonsList"
                :key="item.name"
                link
                :to='item.path'
            >
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title to="/about">{{ item.name }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <v-menu left bottom v-if="logged">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" class="mr-2">
              <v-icon size="2rem">mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="() => {}">
              <v-list-item-title class="text-body-2">
                <router-link class="text-body-2" to="/home">
                  <v-icon size="2rem">mdi-home-circle</v-icon>Home
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="() => {}">
              <v-list-item-title class="text-body-2">
                <router-link class="text-body-2" to="/hobbyist/edit">
                  <v-icon size="2rem px-5">mdi-account-edit</v-icon>Perfil
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="() => {}">
              <v-list-item-title>
                <router-link class="text-body-2" to="/">
                  <v-icon size="2rem">mdi-logout</v-icon>Cerrar Sesión
                </router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-card>
</template>

<script>
export default {
    name: "tool-bar"
}
</script>