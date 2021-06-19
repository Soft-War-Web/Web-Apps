<template>
  <v-card height="82vh" class="d-flex flex-row align-center space-evenly elevation-0">
    <div class="d-flex flex-column align-center">
      <v-card-title class="mb-12 text-h4 font-weight-medium">Iniciar Sesión</v-card-title>
    </div>
    <v-form class="form-container">
      <v-container class="d-flex flex-column">
        <v-text-field
            label="E-mail"
            placeholder="name@example.com"
            required
            outlined
        >
        </v-text-field>
        <v-text-field
            name="input-10-1"
            label="Password"
            hint="Al menos 8 caracteres"
            placeholder="password"
            required
            outlined
        ></v-text-field>
      </v-container>
      <v-card-actions class="d-flex justify-center">
        <v-btn class="text-capitalize text-body-2" color="error" to="/home-c">Login Cliente</v-btn>
      </v-card-actions>
      <v-card-actions class="d-flex justify-center">
        <v-btn class="text-capitalize text-body-2" color="error" to="/home-n">Login Nutricionista</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    name: "login-form"
  }
</script>