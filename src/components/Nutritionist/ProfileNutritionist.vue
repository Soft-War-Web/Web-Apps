<template>
  <div>
  <v-card class="d-flex d-flex flex-column flex-sm-row ">
    <div class="d-flex flex-column align-center">
      <v-card-title class="mb-12 text-h6 text-md-h4 font-weight-medium">Perfil Nutricionista</v-card-title>
      <v-img
          src="https://bootdey.com/img/Content/avatar/avatar7.png"
          alt=""
          max-width="400px"
          max-height="400px"
      ></v-img>
      <v-card-text class="d-flex flex-column align-items-center text-center">
      <div><h2>{{username}}</h2></div>
      </v-card-text>  
      <v-card-subtitle class="pb-1 " >Perfil personal</v-card-subtitle>
      <v-card-text class="d-flex flex-column align-items-center text-center">
      <div>{{professionalExperienceDescription}}</div>
      </v-card-text> 
       <v-btn @click="editProfessionalProfile(professionalProfile)">
            Actualizar información Personal 
          </v-btn> 
       
          <v-card v-model="dialogS" class="d-flex d-flex flex-column flex-sm-row ">
          <div class="d-flex flex-column align-center">
            <v-card-subtitle class="pb-0">Especialidad:   {{specialtyName}}    institución:   {{institutionName}}</v-card-subtitle>
            

          </div>
          <div>
            <v-btn v-model="dialogS" @click="deleteSpecialty()">
            Eliminar
          </v-btn>
          </div></v-card>
    </div>
    
    <v-card class="elevation-0" width="10vh" height="40vh">

    </v-card>
    <v-card class="elevation-0 d-flex flex-column space-evenly font-weight-medium justify-center" width="40vh" >
      <v-card-subtitle class="pb-0"><b>Nombres: </b></v-card-subtitle>
      <v-card-text class="text--primary">
      <div>{{firstName}} {{lastName}}</div>
      </v-card-text>
      <v-card-subtitle class="pb-0"><b>Email: </b></v-card-subtitle>
      <v-card-text class="text--primary">
      <div>{{email}}</div>
      </v-card-text>
      <v-card-subtitle class="pb-0"><b>CNP: </b></v-card-subtitle>
      <v-card-text class="text--primary">
      <div>{{cnpNumber}}</div>
      </v-card-text>
       <!--<v-btn @click="editNutritionist(nutritionist)">
            Actualizar 
          </v-btn>
        <v-btn @click="deleteNutricionist()">
            Eliminar cuenta
          </v-btn>
        <v-btn @click="addSpecialty(specialty)">
           Añadir especialidad 
          </v-btn>-->
          <v-btn color = "green" @click="goBack()">
            Atrás
          </v-btn>
    </v-card>
  </v-card>
  <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Editar Perfíl</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="username" label="Username"></v-text-field>
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
                  
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn><!--Antes <v-btn>-->
              <v-btn color="blue darken-1" text @click="save">Aceptar</v-btn><!--Antes <v-btn>-->
            </v-card-actions>
          </v-card>
        </v-dialog>
         <v-dialog v-model="dialogProfile" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Actualizar información profesional</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="professionalExperienceDescription" label="ProfessionalExperienceDescription"></v-text-field>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeP">Cancelar</v-btn><!--Antes <v-btn>-->
              <v-btn color="blue darken-1" text @click="saveP">Aceptar</v-btn><!--Antes <v-btn>-->
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogC" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Actualizar especialidad</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="specialtyName" label="especialidad"></v-text-field>
                  </v-col>
                    <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="institutionName" label="institución"></v-text-field>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeS">Cancelar</v-btn><!--Antes <v-btn>-->
              <v-btn color="blue darken-1" text @click="saveS">Aceptar</v-btn><!--Antes <v-btn>-->
            </v-card-actions>
          </v-card>
        
       </v-dialog>
       
  
  </div>
  
</template>

<script>
  import axios from 'axios'
 //import {email} from './views/login-form'
export default{
  data: () => ({
    id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    dialogC:false,
    dialogS:false,
    cnpNumber:'0',
    createdAt: new Date(),
    email: '',
    fp:-1,
    professionalprofileId:'',
    professionalExperienceDescription:'',
    nutritionists: [],
    nutritionistId: 0,
    showPassword: false,
    dialog: false,
    specialtyName:' ',
    institutionName:' ',
    
    dialogProfile: false,
    newProfile: false,
    loading : false,
  }),
  created () {
    this.nutritionistId=this.$route.params.id;
    this.listByNutricionistId();
    this.getProfileNutritionistById();
      
  },
  reserve () {
        this.loading = true
        setTimeout(() => (this.loading = false), 2000)
        },
  methods: {
    closeS()
    {
      this.dialogS=false;
    },
    deleteSpecialty()
    {this.specialtyName='';
    this.institutionName='';
    this.dialogS=false;},
      closeP()
    {
      this.dialogP=false;
    },
    addSpecialty(item)
    {
    
    this.dialogC=true;
      this.specialtyName= item.specialtyName;
        this.pinstitutionName= item.institutionName;
        
        
    },
    saveS()
    {
      let me= this;
       axios.post('api/Specialties',{
          'specialtyName': me.specialtyName,
          'institutionName': me.institutionName
        });
        
        this.dialogC = false;
        this.dialogS =true;
       
        



    },
    listByNutricionistId(){
      let me = this;
      axios.get('api/Nutritionists/GetNutritionistById/'+this.nutritionistId)
      .then(function(response){
      me.username = response.data.username;
      me.firstName = response.data.firstName;
      me.lastName = response.data.lastName;
      me.email = response.data.email;
      me.params=response.data.password;
      me.cnpNumber = response.data.cnpNumber;

        console.log(response.data);
      }).catch(function(error){
        console.log(error);
        console.log('no');

    });
    },
    close() {
      this.dialog = false;
    },

    getProfileNutritionistById()
    {let me=this;
    axios.get('api/Professionalprofiles/GetProfessionalprofileByNutritionist'+this.nutritionistId,
         {'NutritionistId':this.nutritionistId}).then(function(response){
            me.professionalExperienceDescription=response.data.professionalExperienceDescription;
            me.professionalprofileId=response.data.professionalprofileId;
         }).catch(function(error)
         {
           me.professionalExperienceDescription='Soy un nutricionista'; 
           me.fp = 1;
         });
         }, 
  
      listByNutritionistId(){
      let me = this;
      axios.get('api/nutritionists/GetNutritionistById/'+this.nutritionistId)
      .then(function(response){
        me.username = response.data.username;
        me.firstName = response.data.firstName;
        me.lastName = response.data.lastName;
        me.email = response.data.email;
        console.log(response.data);
      }).catch(function(error){
        console.log(error);
    });
    },
    


  
    saveP()
    {
      let me = this;
      confirm('ewe2');
      if(me.fp==1)
      {
        confirm('ewe1');
        axios.post('api/Professionalprofiles',{
          'nutritionistId': me.nutritionistId,
          'professionalExperienceDescription': me.professionalExperienceDescription
        })
        confirm('ewe2');
        this.closeP();
      }
      else{
               confirm('fefe');
                axios.put('api/Professionalprofiles/PutProfessionalprofile',{
                          'professionalprofileId': this.professionalprofileId,
                          'nutritionistId': this.nutritionistId,
                          'professionalExperienceDescription': this.professionalExperienceDescription                         
                }).then(function(response){
                  confirm(this.username);
                  me.closeP();                 
                  me.listByNutritionistId();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });            
            this.closeP();
      }
    },
    editProfessionalProfile()
    {
       this.dialogProfile = true;
        this.professionalExperienceDescription=item.professionalExperienceDescription;
      
       
    },
    
    

    closeP() {
      this.dialogProfile = false;
    },





    getNutritionistByEmail()
    {
      axios.get('api/Nutritionists/GetNutritionistByEmail/'+this.email)
      .then(function(response)
      {this.nutritionistId=response.data.nutritionistId
      this.username=response.data.username}
      
      )
      

    },
    deleteNutricionist () {
              let me = this;
              if(confirm('¿Estás seguro que quieres eliminar este Category?'))
                axios.delete('api/Nutritionists/'+this.nutritionistId,{
                      'id': this.nutritionistId
                }).then(function(response){
                  console.log(this.id);
                  me.close();
                  me.listByNutritionistId();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
                this.$router.push('/register');
            },
       editNutritionist(item){
         this.dialog = true;
        this.nutritionistId= item.nutritionistId;
        this.username  = item.username ;
        this.firstName = item.firstName;
        this.lastName = item.lastName;
        this.email = item.email;
        
       
        
      },
    
 
    close() {
      this.dialog = false
    },
    clean(){
      this.nutritionistId = "";
      this.username = "";
      this.password = "";
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.createdAt = "";
    },
       getNutritionistById(){
                axios.get('api/Nutritionists/GetNutritionistById/'+this.nutritionistId)
                .then(function(response){
                  this.nutritionistId=response.data.nutritionistId;
                }).catch(function(error){
                  console.log(error);
                });
            },
    
    save(){
     let me = this;
              this.getNutritionistById(this.nutritionistId);
              confirm(this.nutritionistId);
                axios.put('api/Nutritionists/PutNutritionist',{
                          'nutritionistId': this.nutritionistId,
                          'username': this.username,
                          'password': this.password,
                          'firstName':this.firstName,
                          'lastName':this.lastName,
                          'email':this.email,
                          'cnpNumber': this.cnpNumber
                }).then(function(response){
                  confirm(this.username);
                  me.close();
                  
                  me.listByNutritionistId();
                  me.clean();
                }).catch(function(error){
                  console.log(error);
                });
              
            this.close()
      
    },
    
    goBack(){
      let me = this;
      me.$router.push({name: 'HomeN', params: {id: this.nutritionistId}});
    }
  }
}
</script>
