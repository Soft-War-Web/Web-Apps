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
          <v-btn to="/clientProfile">
            {{url_data}}perfil
          </v-btn>
          <br>
          <br>
          <v-btn to="/availableNutritionists">
            asesorías
          </v-btn>
          <br>
          <br>
          <v-btn to="/clientProfile">
            historial de asesorías
          </v-btn>
          <br>
          <br>
          <v-btn to="/clientProfile">
            recetas
          </v-btn>
          <br>
          <br>
          <v-btn to="/clientProfile">
            recomendaciones
          </v-btn>
          <br>
          <br>
          <v-btn to="/clientProfile">
            métodos de pago
          </v-btn>
          <br>
          <br>
          <v-btn to="/clientProfile">
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
    mounted(){
     this.url_data=this.$route.params.id;
    },

    components: {
    },
    data: () => ({
      url_data: null
    }),
  }
</script>
