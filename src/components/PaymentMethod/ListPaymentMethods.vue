<template>

  <div  style="height: 40%; width: 40%;" class="d-flex flex-column  mx-auto" >
    <v-card class="d-flex flex-column" color:="darken-2">
        <div class=" d-flex flex-column align-center">
            <v-card-title class=" text-h6 text-md-h4 font-weight-medium">Métodos de pago</v-card-title>
            <v-card-subtitle  class="active text-h8 text-md-h6 font-weight-medium">Payment</v-card-subtitle>
        </div>
        <v-divider  color="black" style=" background-color: black;border:1px solid White ;width:100%;" ></v-divider>  
        <v-card class="elevation-0 justify-center font-weight-medium  flex-column d-flex " >
            <v-card-subtitle class="active text-h8 text-md-h6">Saved Cards</v-card-subtitle>
                <v-spacer></v-spacer>
                    <v-card class="elevation-0" v-for="(paymentMethod,i) in paymentMethods" :key="i" >
                        <v-card style=" width: 90%; " height="50px" class="elevation-7 mx-auto flex flex-row d-flex align-center" >
                            <v-spacer></v-spacer>
                            <v-img style=" height: 48px; width: 48px;" src="https://img.icons8.com/color/48/000000/visa.png"></v-img>
                            <v-spacer></v-spacer>
                            <v-card-text class="justify-center justify-space-between" style=" width: 50%;" >{{paymentMethod.cardNumber}}</v-card-text>
                            <v-spacer></v-spacer>
                            <v-btn  color="orange" text width="30%" @click="deleteItem(paymentMethod)">Remove Card</v-btn>
                            <v-spacer></v-spacer>
                        </v-card>
                        <v-card class="elevation-0" height="10px" ></v-card>
                    </v-card>
                <v-spacer></v-spacer>
            <v-card-actions class=" d-flex flex-column align-center">
                <v-spacer></v-spacer>
                <v-btn  color="orange" width="50%" text >Nuevo método de pago</v-btn><!--Antes <v-btn>-->
            </v-card-actions>
        </v-card>
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
    paymentMethods: [],
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
        axios.get('api/PaymentMethods/GetPaymentMethodByClient/'+1, {
                      'clientId': 1
                }).then(function(response){
                me.paymentMethods = response.data;
                console.log(response.data);
            }).catch(function(error){
                console.log(error);
            });
    },
    editItem(item){
        this.id= item.paymentMethodsId;
        this.clientId= item.clientId;
        this.cardType= item.cardType;
        this.expirationDateMonth= item.expirationDateMonth;
        this.expirationDateYear= item.expirationDateYear;
        this.cardNumber= item.cardNumber;
        this.securityCode= item.securityCode;
        this.ownerFirstName= item.ownerFirstName;
        this.ownerLastName= item.ownerLastName;
        this.city= item.city;
        this.billingAddress= item.billingAddress;
        this.billingAddressLine2= item.billingAddressLine2;
        this.postalCode= item.postalCode;
        this.country= item.country;
        this.phoneNumber= item.phoneNumber;
      },
    deleteItem (item) {
              let me = this;
              if(confirm('¿Estás seguro que quieres eliminar este Payment Methods?'))
                axios.delete('api/PaymentMethods/'+item.paymentMethodId,{
                      'id': item.paymentMethodId
                }).then(function(response){
                  console.log(item.id);
                  me.close();
                  me.list();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
    },

  },
}
</script>
