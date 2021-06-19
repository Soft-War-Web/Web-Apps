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
            asesorías
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
            métodos de pago
          </v-btn>
          <br>
          <br>
          <v-btn>
            pagos realizados
          </v-btn>
        </v-col>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

  export default {
    name: 'HomeC',

    components: {
    },
  }
</script>
