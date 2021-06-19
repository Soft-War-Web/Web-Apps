<template>
  <v-card>
    <v-row cols="12">
      <v-col>
        <v-img
          :src="require('../assets/logo.png')"
          contain
          height="350"
        ></v-img>
      </v-col>
      <v-col>
        <v-col>
          <v-btn>
            perfil
          </v-btn>
          <br>
          <br>
          <v-btn>
            asesorías pendientes
          </v-btn>
          <br>
          <br>
          <v-btn>
            historial de asesorías
          </v-btn>
          <br>
          <br>
          <v-btn>
            recetas
          </v-btn>
          <br>
          <br>
          <v-btn>
            recomendaciones
          </v-btn>
          <br>
          <br>
          <v-btn>
            recetas publicadas
          </v-btn>
          <br>
          <br>
          <v-btn>
            recomendaciones publicadas
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'HomeN',

    components: {
      HelloWorld
    },
  }
</script>