<template>
  <div style="height: 50%; width: 50%;" class="d-flex flex-column align-center mx-auto" >
    <v-card class="d-flex flex-column" color:="darken-2">
        <div class=" d-flex flex-column align-center">
            <v-card-title class=" text-h6 text-md-h4 font-weight-medium">Métodos de pago</v-card-title>
            <v-card-subtitle  class="active text-h8 text-md-h6 font-weight-medium">Payment</v-card-subtitle>
        </div>
      <v-divider  color="black" style=" background-color: black;border:1px solid White ;width:100%;" ></v-divider>  
      <v-form v-model="valid" class="form-container" >
        <v-container class="d-flex flex-column ">
            <v-card-subtitle class="active text-md-h6 ">Add new card:</v-card-subtitle>
            <v-text-field v-model="ownerFirstName" label="FirstName" placeholder="Ex.Hugo" outlined></v-text-field>
            <v-text-field v-model="ownerLastName" label="LastName" placeholder="Ex.Quispe" outlined></v-text-field>
            <v-text-field v-model="cardNumber" label="Card number" placeholder="Ex.Quispe" outlined></v-text-field>
            <v-row >
                <v-col sm="6" col="12" class="flex flex-row d-flex justify-space-between">
                    <v-text-field v-model="expirationDateMonth" label="Month" placeholder="Ex.Quispe" outlined></v-text-field>
                </v-col>
                <v-col sm="6" col="12" class="flex flex-row d-flex justify-space-between">
                    <v-text-field v-model="expirationDateYear" label="Year" placeholder="2001" outlined></v-text-field>
                </v-col>
            </v-row>
            <v-combobox v-model="cardType" :items="items" :search-input.sync="search" hide-selected hint="Maximum of 5 tags" label="Add some tags">
    </v-combobox>
            <v-row >
                <v-col sm="6" col="12" class="flex flex-row d-flex justify-space-between">
                    <v-text-field v-model="postalCode" label="Postal Code" placeholder="159667" outlined></v-text-field>
                </v-col>
                <v-col sm="6" col="12" class="flex flex-row d-flex justify-space-between">
                    <v-text-field v-model="securityCode" label="CVV" placeholder="6666665" outlined></v-text-field>
                </v-col>
            </v-row>
            <v-row >
                <v-col sm="4" col="12" class="flex flex-row d-flex justify-space-between">
                    <v-text-field v-model="phoneNumber" label="Celular" placeholder="964487170" outlined></v-text-field>
                </v-col>
                <v-col sm="4" col="12" class="flex flex-row d-flex justify-space-between">
                    <v-text-field v-model="country" label="País" placeholder="Perú" outlined></v-text-field>
                </v-col>
                <v-col sm="4" col="12" class="flex flex-row d-flex justify-space-between">
                    <v-text-field v-model="city" label="Ciudad" placeholder="Lima" outlined></v-text-field>
                </v-col>
            </v-row>
            <v-row >
                <v-col sm="6" col="12" class="flex flex-row d-flex justify-space-between">
                    <v-text-field v-model="billingAddress" label="Address" placeholder="Av.LaGallina#190" outlined></v-text-field>
                </v-col>
                <v-col sm="6" col="12" class="flex flex-row d-flex justify-space-between">
                    <v-text-field v-model="billingAddressLine2" label="Referring Address" placeholder="Av.LaCalle#12" outlined></v-text-field>
                </v-col>
                
            </v-row>
            <v-text-field v-model="clientId" label="clientId" placeholder="clientId" outlined></v-text-field>
        </v-container> 
      </v-form>
      <v-card-actions class=" d-flex flex-column align-center">
        <v-spacer></v-spacer>
        <v-btn  color="orange" width="50%" @click="save">Save</v-btn><!--Antes <v-btn>-->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  data: () => ({
    items: ['Crédito', 'Dévito'],
    search: null,
    id: '',
    clients: [],
    clientId: 0,
    cardType: '',
    expirationDateMonth: 0,
    expirationDateYear: 0,
    cardNumber: 0,
    securityCode: 0,
    ownerFirstName: '',
    ownerLastName: '',
    city: '',
    billingAddress: '',
    billingAddressLine2: '',
    postalCode: '',
    country: '',
    phoneNumber: 0,
  }),
    clean(){
      this.id= "";
      this.clientId= "";
      this.cardType= "";
      this.expirationDateMonth= "";
      this.expirationDateYear= "";
      this.cardNumber= "";
      this.securityCode= "";
      this.ownerFirstName= "";
      this.ownerLastName= "";
      this.city= "";
      this.billingAddress= "";
      this.billingAddressLine2= "";
      this.postalCode= "";
      this.country= "";
      this.phoneNumber= "";
    },
  methods: {
    getClientById(){
            axios.get('api/Clients/GetClientById/'+this.clientId)
            .then(function(response){
                this.getClientById=response.data.clientId;  
            }).catch(function(error){
                console.log(error);
            }); 
        },

    save(){
      let me = this;
      axios.post('api/PaymentMethods',{
        'clientId': me.clientId,
        'cardType': me.cardType,
        'expirationDateMonth': me.expirationDateMonth,
        'expirationDateYear': me.expirationDateYear,
        'cardNumber': me.cardNumber,
        'securityCode': me.securityCode,
        'ownerFirstName': me.ownerFirstName,
        'ownerLastName': me.ownerLastName,
        'city': me.city,
        'billingAddress': me.billingAddress,
        'billingAddressLine2': me.billingAddressLine2,
        'postalCode': me.postalCode,
        'country': me.country,
        'phoneNumber': me.phoneNumber,
      }).then(function(response){
          console.log(response);
      }).catch(function(error){
          console.log(error);
      });
      //this.$router.push('/register');
    },
  },
}
</script>