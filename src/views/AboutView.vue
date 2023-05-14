<template>
  <v-container>
      <v-row align="center" justify="center" >
          <v-col cols="12" sm="10">
           
             <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12">
                        <h4
                          class="text-center"
                        > <b>Accéder à votre compte</b></h4>
                        <h6
                          class="text-center  grey--text "
                        > Connectez-vous pour bénificier de nos services</h6>
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8">
                           
                          <v-text-field
                            label="Cin"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                           class="mt-16"
                           type="password"
                          />
                          <v-text-field
                            label="Mot de passe"
                            outlined
                            dense
                            color="blue"
                          autocomplete="false"
                           type="password"
                          
                          />
                            <v-row>
                              <v-col cols="12" sm="7">
                                
                              </v-col>
                             
                            </v-row>
                          <v-btn color="blue" dark block tile>Connexion</v-btn>
                     
                        
                          </v-col>
                        </v-row>  
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="6" class="blue rounded-bl-xl" >
                    <div style="  text-align: center; padding: 180px 0;">
                      <v-card-text class="white--text" >
                        <h3 class="text-center ">Vous êtes nouveau ?  </h3>
                        <h6
                          class="text-center"
                        >Créez votre compte rapidement </h6>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step++">Créer un nouveau compte</v-btn>
                      </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row >
                    <v-col cols="12" md="6" >
                     <div style="  text-align: center; padding: 180px 0;">
                      <v-card-text class="white--text" >
                        <h3 class="text-center ">Vous avez déja un compte??</h3>
                        <h6
                          class="text-center"
                        >Connectez-vous pour bénificier de nos services</h6>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn tile outlined dark @click="step--">se connecter</v-btn>
                      </div>
                      </div>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-card-text class="mt-12">
                        <h4
                          class="text-center"
                        >Créer votre compte</h4>
                        
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="8">
                           <v-row>
                           <v-col cols="12" sm="6">
                            <v-text-field
                            label="Nom"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                           class="mt-4"
                          />
                           </v-col>
                            <v-col cols="12" sm="6">
                            <v-text-field
                            label="Prénom"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                           class="mt-4"
                          />
                           </v-col>
                         
                           </v-row>
                           <v-text-field
                            label="Cin"
                            type="password"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                          />
                          <v-text-field
                            label="Téléphone"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                          />
                          <v-text-field
                            label="Adresse"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                          />
                          <v-text-field
                            label="Email"
                            type="email"
                            outlined
                            dense
                            color="blue"
                            autocomplete="false"
                          />
                          
                         
                           
                          <v-text-field
                            label="Mot de passe"
                            outlined
                            dense
                            color="blue"
                          autocomplete="false"
                           type="password"
                          
                          />
                            <v-row>
                              <v-col cols="12" sm="7">
                                
                              </v-col>
                            </v-row>
                          <v-btn color="blue" dark block tile>S'inscrire</v-btn>
                     
                         
                          </v-col>
                        </v-row>  
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
        
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
  
  export default {
   data: () => ({
    step: 1
  }),
  props: {
    source: String
  } 
    
  }
</script>
<style scoped>

</style>