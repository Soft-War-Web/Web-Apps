<template>
  <div style=";width: 100%;">
    <template >
      <v-toolbar flat color="white">
        <v-toolbar-title>Método de pago</v-toolbar-title>
        <v-divider 
          class="mx-4" 
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on }">
            <v-btn color="orange" text dark class="mb-2" v-on="on">Añadir método de pago</v-btn>
          </template>
          <div style="height: 50%; width: 100%;" class="d-flex flex-column align-center mx-auto" >
            <v-card class="d-flex flex-column" color:="darken-2">
                <div class=" d-flex flex-column align-center">
                    <v-card-title class=" text-h6 text-md-h4 font-weight-medium">Métodos de pago</v-card-title>
                    <v-card-subtitle  class="active text-h8 text-md-h6 font-weight-medium">Payment</v-card-subtitle>
                </div>
              <v-divider  color="black" style=" background-color: black;border:1px solid White ;width:100%;" ></v-divider>  
              <v-form v-model="valid" class="form-container" >
                <v-container class="d-flex flex-column ">
                    <v-card-subtitle class="active text-md-h6 ">Agregar Nuevo Método:</v-card-subtitle>
                    <v-text-field v-model="ownerFirstName" label="Nombres" placeholder="Ex.Hugo" outlined></v-text-field>
                    <v-text-field v-model="ownerLastName" label="Apellidos" placeholder="Ex.Quispe" outlined></v-text-field>
                    <v-text-field v-model="cardNumber" label="N° de Tajerta" placeholder="Ex.12354564898" outlined></v-text-field>
                    <v-row >
                        <v-col sm="6" col="12" class="flex flex-row d-flex justify-space-between">
                            <v-text-field v-model="expirationDateMonth" label="Mes" placeholder="Ex.12" outlined></v-text-field>
                        </v-col>
                        <v-col sm="6" col="12" class="flex flex-row d-flex justify-space-between">
                            <v-text-field v-model="expirationDateYear" label="Año" placeholder="2001" outlined></v-text-field>
                        </v-col>
                    </v-row>
                    <v-combobox v-model="cardType" :items="items" :search-input.sync="search" hide-selected hint="Maximum of 5 tags" label="Tipo de tarjeta">
                    </v-combobox>
                    <v-row >
                        <v-col sm="6" col="12" class="flex flex-row d-flex justify-space-between">
                            <v-text-field v-model="postalCode" label="Cod. Postal" placeholder="Ex.159667" outlined></v-text-field>
                        </v-col>
                        <v-col sm="6" col="12" class="flex flex-row d-flex justify-space-between">
                            <v-text-field v-model="securityCode" label="CVV" placeholder="Ex.6666665" outlined></v-text-field>
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
                            <v-text-field v-model="billingAddress" label="Dirección" placeholder="Av.LaGallina#190" outlined></v-text-field>
                        </v-col>
                        <v-col sm="6" col="12" class="flex flex-row d-flex justify-space-between">
                            <v-text-field v-model="billingAddressLine2" label="Dirección Adicional" placeholder="Av.LaCalle#12" outlined></v-text-field>
                        </v-col>
                        
                    </v-row>
                </v-container> 
              </v-form>
              <v-card-actions class=" d-flex flex-column align-center">
                <v-spacer></v-spacer>
                <v-btn  color="orange" width="50%" @click="save">Save</v-btn><!--Antes <v-btn>-->
              </v-card-actions>
            </v-card>
          </div>
        </v-dialog>
      </v-toolbar>
    </template >
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
                              <v-btn  color="orange" text width="30%" @click="deleteItem(paymentMethod)">Eliminar Carta</v-btn>
                              <v-spacer></v-spacer>
                          </v-card>
                          <v-card class="elevation-0" height="10px" ></v-card>
                      </v-card>
                  <v-spacer></v-spacer>
          </v-card>
      </v-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default{
  data: () => ({
    dialog: false,
    items: ['Crédito', 'Débito'],
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
      //this.clientId= "";
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
      this.clientId=this.$route.params.id;
      this.list();
    },
  methods: {
    close() {
      this.dialog = false
    },
    list(){
        let me = this;
        axios.get('api/PaymentMethods/GetPaymentMethodByClient/'+this.clientId, {
            'clientId': this.clientId
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
        me.close();
        me.list();
        me.clean();
        console.log(response);
      }).catch(function(error){
          console.log(error); 
      });
    },
  },
}
</script>
