<template>
  <HeaderApp></HeaderApp>

  <router-view>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10">
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-row>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                    <h4 class="text-center"><b>Accéder à votre compte</b></h4>
                    <h6 class="text-center grey--text">
                      Connectez-vous pour bénificier de nos services
                    </h6>
                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-text-field v-model="email" :value="email" label="Email" outlined dense color="blue"
                          autocomplete="false" class="mt-10" />
                        <v-text-field :value="password" v-model="password" label="Mot de passe" id="password"
                          type="password" outlined dense color="blue" autocomplete="false" class="mt-1"></v-text-field>

                        <input type="checkbox"
                          onclick="document.getElementById('password').type = this.checked ? 'text' : 'password'" />
                        Show password
                        <br />
                        <br />
                        <v-row>
                          <v-col cols="12" sm="7"> </v-col>
                        </v-row>
                        <v-btn color="blue" type="submit" @click="login()" dark block tile>Connexion</v-btn>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="6" class="blue rounded-bl-xl">
                  <div style="text-align: center; padding: 180px 0">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Vous êtes nouveau ?</h3>
                      <h6 class="text-center">Créez votre compte rapidement</h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step++">Créer un nouveau compte</v-btn>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-window-item>
            <v-window-item :value="2">
              <v-row>
                <v-col cols="12" md="6">
                  <div style="text-align: center; padding: 180px 0">
                    <v-card-text class="white--text">
                      <h3 class="text-center">Vous avez déja un compte??</h3>
                      <h6 class="text-center">
                        Connectez-vous pour bénificier de nos services
                      </h6>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn tile outlined dark @click="step--">se connecter</v-btn>
                    </div>
                  </div>
                </v-col>

                <v-col cols="12" md="6">
                  <v-card-text class="mt-12">
                   
                    <h4 class="text-center">Créer votre compte</h4>

                    <v-row align="center" justify="center">
                      <v-col cols="12" sm="8">
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field v-model="nom" :value="nom" label="Nom" outlined dense color="blue" autocomplete="false"   :rules="[v => !!v || 'Champ requis']"
                              class="mt-4"  clearable required/>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field v-model="prenom" :value="prenom" label="Prénom" outlined dense color="blue" autocomplete="false"
                              class="mt-4" :rules="[v => !!v || 'Champ requis']"   clearable required
   />
                          </v-col>
                        </v-row>

                        <v-text-field v-model="telephone" :value="telephone" label="Téléphone" outlined dense color="blue" :rules="[v => !!v || 'Champ requis', v => /^[0-9]{8}$/.test(v) || 'Le numéro de téléphone doit contenir exactement 8 chiffres']" required
                          autocomplete="false"     clearable />

                        <v-text-field v-model="email" :value="email" label="Email" outlined dense color="blue" autocomplete="false" :rules="[v => !!v || 'Champ requis', v => /.+@.+/.test(v) || 'Adresse e-mail invalide']"  clearable placeholder="user@exemple.com" required/>
                        

                        <v-text-field v-model="password" :value="password" label="Mot de passe" outlined dense color="blue" :rules="[v => !!v || 'Champ requis', v => v.length >= 6 || 'Le mot de passe doit contenir au moins 6 caractères']"
                          autocomplete="false" type="password"  clearable>
                        </v-text-field>
                        <div>
    <v-btn color="blue" dark block tile @click="signup" :disabled="loading" >
      S'inscrire
      <div v-if="showSpinner" class="spinner"></div>
    </v-btn>
  </div>
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
  </router-view>
</template>

<script >

import HeaderApp from "@/components/HeaderApp.vue";
import axios from "axios";
import Swal from "sweetalert2";




export default {
  components: {
    HeaderApp,
    
  },
  data: () => ({
    step: 1,
    return: {
      email:"",
      password: "",
      nom:"",
      prenom:"",
      telephone:"",
      adresse:"",
      showPassword: false,
      errorMessages: '',
      recaptchaResponse: null,
      loading: false,
      spinner: null,
      showSpinner: false,
      gouvernorat: '',
      municipalite: '',
      countries: [  
      { 'code': 'Ariana', 'name': 'Ariana' },  
      { 'code': 'Ben Arous', 'name': 'Ben Arous' }, 
       { 'code': 'Manouba', 'name': 'Manouba' }, 
        { 'code': 'Tunis', 'name': 'Tunis' },  
        { 'code': 'Beja', 'name': 'Beja' },  
        { 'code': 'Bizerte', 'name': 'Bizerte' },  
        { 'code': 'Jendouba', 'name': 'Jendouba' },  
        { 'code': 'Le Kef', 'name': 'Le Kef' },  
        { 'code': 'Nabeul', 'name': 'Nabeul' },  
        { 'code': 'Siliana', 'name': 'Siliana' }, 
         { 'code': 'Zaghouan', 'name': 'Zaghouan' },  
         { 'code': 'Gafsa', 'name': 'Gafsa' },  
         { 'code': 'Kairouan', 'name': 'Kairouan' }, 
          { 'code': 'Kasserine', 'name': 'Kasserine' },  
          { 'code': 'Mahdia', 'name': 'Mahdia' },  
          { 'code': 'Monastir', 'name': 'Monastir' }, 
           { 'code': 'Sfax', 'name': 'Sfax' },  
           { 'code': 'Sidi Bouzid', 'name': 'Sidi Bouzid' }, 
            { 'code': 'Sousse', 'name': 'Sousse' },  
            { 'code': 'Gabes', 'name': 'Gabes' },  
            { 'code': 'Kebili', 'name': 'Kebili' },  
            { 'code': 'Medenine', 'name': 'Medenine' },  
            { 'code': 'Tataouine', 'name': 'Tataouine' },  
            { 'code': 'Tozeur', 'name': 'Tozeur' }
          ],
      states: {
        'Ariana': [
        {'code': 'Soukra', 'name': 'Soukra'},
{'code': 'Ariana Ville', 'name': 'Ariana Ville'},
{'code': 'Raoued', 'name': 'Raoued'},
{'code': 'Mnihla', 'name': 'Mnihla'},
{'code': 'Ettadhamen', 'name': 'Ettadhamen'},
{'code': 'Kalaat-el-Andalous', 'name': 'Kalaat-el-Andalous'},
{'code': 'Sidi Thabet', 'name': 'Sidi Thabet'}
        ],
        'Ben Arous': [
        { 'code': 'El Mourouj', 'name': 'El Mourouj' },
{ 'code': 'Ben Arous Ville', 'name': 'Ben Arous Ville' },
{ 'code': 'Mohameedia', 'name': 'Mohameedia' },
{ 'code': 'Radès', 'name': 'Radès' },
{ 'code': 'Fouchana', 'name': 'Fouchana' },
{ 'code': 'Hammam Lif', 'name': 'Hammam Lif' },
{ 'code': 'Mornag', 'name': 'Mornag' },
{ 'code': 'Boumhel el-Bassatine', 'name': 'Boumhel el-Bassatine' },
{ 'code': 'Ezzahra', 'name': 'Ezzahra' },
{ 'code': 'Hammam Chot ', 'name': 'Hammam Chot ' },
{ 'code': 'Naasen', 'name': 'Naasen' },
{ 'code': 'Mégrine', 'name': 'Mégrine' },
{ 'code': 'Khalidia', 'name': 'Khalidia' }

        ],
        'Manouba' : [
        { 'code': 'Douar Hicher', 'name': 'Douar Hicher' },
{ 'code': 'Oued Elil', 'name': 'Oued Elil' },
{ 'code': 'Jedaida', 'name': 'Jedaida' },
{ 'code': 'Manouba', 'name': 'Manouba' },
{ 'code': 'Mornaguia', 'name': 'Mornaguia' },
{ 'code': 'Denden', 'name': 'Denden' },
{ 'code': 'Batan', 'name': 'Batan' },
{ 'code': 'Borj Amri', 'name': 'Borj Amri' },
{ 'code': 'Bassatine', 'name': 'Bassatine' },
        ],
        'Tunis' : [
        { 'code': 'Tunis', 'name': 'Tunis' },
    { 'code': 'Sidi Hssine', 'name': 'Sidi Hssine' },
    { 'code': 'La Marsa', 'name': 'La Marsa' },
    { 'code': 'Le Kram', 'name': 'Le Kram' },
    { 'code': 'Bardo', 'name': 'Bardo' },
    { 'code': 'La Goulette', 'name': 'La Goulette' },
    { 'code': 'Carthage', 'name': 'Carthage' },
    { 'code': 'Sidi Bou Said', 'name': 'Sidi Bou Said' },
         
        ],
        'Beja': [
        { 'code': 'Medjez el Beb', 'name': 'Medjez el Beb' },
     { 'code': 'Testour', 'name': 'Testour' },
    { 'code': 'Nefza', 'name': 'Nefza' },
     { 'code': 'Teboursouk', 'name': 'Teboursouk' },
     { 'code': 'Ouechtata Jamila', 'name': 'Ouechtata Jamila' },
    { 'code': 'Zahret Madian', 'name': 'Zahret Madian' },
    { 'code': 'Goubellat', 'name': 'Goubellat' },
   { 'code': 'El Maagoula', 'name': 'El Maagoula' },
     { 'code': 'Thibar', 'name': 'Thibar' },
     { 'code': 'Sidi Ismail', 'name': 'Sidi Ismail' },
     { 'code': 'Slouguia', 'name': 'Slouguia' }
        ],
        'Bizerte': [
        { 'code': 'MB', 'name': 'Menzel Bourguiba' },
          { 'code': 'MT', 'name': 'Mateur' },
          { 'code': 'REJ', 'name': 'Ras-El Jbel' },
          { 'code': 'JM', 'name': 'Joumine' },
          { 'code': 'MJ', 'name': 'Menzel Jemil' },
          { 'code': 'EA', 'name': 'El Alia' },
          { 'code': 'GZ', 'name': 'Ghezela' },
          { 'code': 'TN', 'name': 'Tinja' },
          { 'code': 'SJ', 'name': 'Sejnane' },
          { 'code': 'UT', 'name': 'Utique ' },
          { 'code': 'MAR', 'name': 'Menzel Abderahmen' },
          { 'code': 'EH', 'name': 'El Hachechna' },
          { 'code': 'MT', 'name': 'Metline' },
          { 'code': 'RR', 'name': 'Raf Raf' },
          { 'code': 'OS', 'name': 'Ousja' },
          { 'code': 'GEM', 'name': 'Ghar El Melh' },
        ],
        
  'Jendouba': [
    { 'code': 'Jendouba', 'name': 'Jendouba' },
    { 'code': 'Ghar Dimah', 'name': 'Ghar Dimah' },
    { 'code': 'Bou Salem', 'name': 'Bou Salem' },
    { 'code': 'Souk Essebt - Malka Etaouer', 'name': 'Souk Essebt - Malka Etaouer' },
    { 'code': 'Tabarka', 'name': 'Tabarka' },
    { 'code': 'Balta Bouaouene', 'name': 'Balta Bouaouene' },
    { 'code': 'Fernana', 'name': 'Fernana' },
    { 'code': 'Ain Draham', 'name': 'Ain Draham' },
    { 'code': 'Oued Meliz', 'name': 'Oued Meliz' },
    { 'code': 'Jouaouda ', 'name': 'Jouaouda ' },
    { 'code': 'Ain Sobh Nadhour', 'name': 'Ain Sobh Nadhour' },
    { 'code': 'El Kalaa - Maaden - Gorgessan', 'name': 'El Kalaa - Maaden - Gorgessan' },
    { 'code': 'Khemairia', 'name': 'Khemairia' },
    { 'code': 'Beni Mtir', 'name': 'Beni Mtir' }
  ],
  'Le Kef': [
    { 'code': 'Kef', 'name': 'Kef' },
    { 'code': 'Dahmeni', 'name': 'Dahmeni' },
    { 'code': 'Tajrouine', 'name': 'Tajrouine' },
    { 'code': 'Es-Sers', 'name': 'Es-Sers' },
    { 'code': 'Sakhiet Sidi Youssef', 'name': 'Sakhiet Sidi Youssef' },
    { 'code': 'Kalaat Sinen', 'name': 'Kalaat Sinen' },
    { 'code': 'El Ksour', 'name': 'El Ksour' },
    { 'code': 'Nebeur', 'name': 'Nebeur' },
    { 'code': 'Zaafrane - Dyr el Kef', 'name': 'Zaafrane - Dyr el Kef' },
    { 'code': 'Menzel Salem', 'name': 'Menzel Salem' },
    { 'code': 'Kalaat Khasbah', 'name': 'Kalaat Khasbah' },
    { 'code': 'Touiref', 'name': 'Touiref' },
    { 'code': 'El Marja', 'name': 'El Marja' }
  ],
  'Nabeul': [
{'code': 'Hammamet', 'name': 'Hammamet'},
{'code': 'Nabeul', 'name': 'Nabeul'},
{'code': 'Korba', 'name': 'Korba'},
{'code': 'Menzel Temime', 'name': 'Menzel Temime'},
{'code': 'Kelibia', 'name': 'Kelibia'},
{'code': 'Dar Chaabaane el Fehri', 'name': 'Dar Chaabaane el Fehri'},
{'code': 'Grombalia', 'name': 'Grombalia'},
{'code': 'Slimane', 'name': 'Slimane'},
{'code': 'Menzel Bouzalfa', 'name': 'Menzel Bouzalfa'},
{'code': 'Bou Argoub ', 'name': 'Bou Argoub '},
{'code': 'El Mida', 'name': 'El Mida'},
{'code': 'Beni Khaled', 'name': 'Beni Khaled'},
{'code': 'El Haouaria', 'name': 'El Haouaria'},
{'code': 'Beni Khiar', 'name': 'Beni Khiar'},
{'code': 'Foundouk Djedid- Sultana', 'name': 'Foundouk Djedid- Sultana'},
{'code': 'Takelsa', 'name': 'Takelsa'},
{'code': 'Menzel Hor', 'name': 'Menzel Hor'},
{'code': 'Tazaghrane- Boukrim-Zaoueit El Meghaiez', 'name': 'Tazaghrane- Boukrim-Zaoueit El Meghaiez'},
{'code': 'Sedi Djedidi', 'name': 'Sedi Djedidi'},
{'code': 'Cherifa Boucharey', 'name': 'Cherifa Boucharey'},
{'code': 'Zaoueit Jedidi', 'name': 'Zaoueit Jedidi'},
{'code': 'Maamoura', 'name': 'Maamoura'},
{'code': 'Azmour', 'name': 'Azmour'},
{'code': 'Hammam El Ghezaz', 'name': 'Hammam El Ghezaz'},
{'code': 'Tazerka', 'name': 'Tazerka'},
{'code': 'Somaa', 'name': 'Somaa'},
{'code': 'Korbous', 'name': 'Korbous'}
],

        'Siliana' : [
        {'code': 'Siliana', 'name': 'Siliana'},
{'code': 'Makthar', 'name': 'Makthar'},
{'code': 'Bou Arada', 'name': 'Bou Arada'},
{'code': 'El Krib', 'name': 'El Krib'},
{'code': 'Gaafour', 'name': 'Gaafour'},
{'code': 'Kesra', 'name': 'Kesra'},
{'code': 'Er-Rouhia', 'name': 'Er-Rouhia'},
{'code': 'Sidi Morched', 'name': 'Sidi Morched'},
          { 'code': 'Bourouis', 'name': 'Bourouis' },
          { 'code': 'El Hababsa Nord', 'name': 'El Hababsa Nord' },
          { 'code': 'El Aroussa', 'name': 'El Aroussa' },
        ],
        'Zaghouan' : [
        [    {'code': 'Zaghouan', 'name': 'Zaghouan'},  
          {'code': 'El Fahs', 'name': 'El Fahs'},   
           {'code': 'El Nadhour', 'name': 'El Nadhour'},  
             {'code': 'El Zriba', 'name': 'El Zriba'},    
             {'code': 'Bir Mchergua', 'name': 'Bir Mchergua'},   
              {'code': 'Saouaf', 'name': 'Saouaf'},   
               {'code': 'El Amaiem', 'name': 'El Amaiem'}, 
                  {'code': 'Jbel Ouast', 'name': 'Jbel Ouast'}]

        ],
        'Gafsa' : [
        {'code': 'Metlaoui', 'name': 'Metlaoui'},
{'code': 'El Ksar', 'name': 'El Ksar'},
{'code': 'Redeyef', 'name': 'Redeyef'},
{'code': 'Oum El Araies', 'name': 'Oum El Araies'},
{'code': 'Sned', 'name': 'Sned'},
{'code': 'El Guettar', 'name': 'El Guettar'},
{'code': 'Mdhila', 'name': 'Mdhila'},
{'code': 'Zanouche', 'name': 'Zanouche'},
{'code': 'Belkhir', 'name': 'Belkhir'},
{'code': 'Sidi Aich', 'name': 'Sidi Aich'},
{'code': 'Lala', 'name': 'Lala'},
{'code': 'Sidi Boubaker', 'name': 'Sidi Boubaker'}
      ],
      'Kairouan' : [
      { 'code': 'Bouhajla', 'name': 'Bouhajla' },
      { 'code': 'Sbikha', 'name': 'Sbikha' },
      { 'code': 'Sayseb el Dhriaat', 'name': 'Sayseb el Dhriaat' },
      { 'code': 'El Alaa', 'name': 'El Alaa' },
      { 'code': 'El Oueslatia', 'name': 'El Oueslatia' },
      { 'code': 'Haffouz', 'name': 'Haffouz' },
      { 'code': 'Jehina', 'name': 'Jehina' },
      { 'code': 'Hajeb Al Ayoun', 'name': 'Hajeb Al Ayoun' },
      { 'code': 'Rakada', 'name': 'Rakada' },
      { 'code': 'Nasrallah', 'name': 'Nasrallah' },
      { 'code': 'Echekiba', 'name': 'Echekiba' },
      { 'code': 'Abida', 'name': 'Abida' },
      { 'code': 'Echrarda', 'name': 'Echrarda' },
      { 'code': 'Chouayhia', 'name': 'Chouayhia' },
      { 'code': 'Ain El Beidha', 'name': 'Ain El Beidha' },
      { 'code': 'Menzel Mhiri', 'name': 'Menzel Mhiri' },
      { 'code': 'Ain Jelloula', 'name': 'Ain Jelloula' },
      { 'code': 'Chouachi', 'name': 'Chouachi' },
  ],

  'Kasserine': [
{ 'code': 'Ennour', 'name': 'Ennour' },
{ 'code': 'Thala', 'name': 'Thala' },
{ 'code': 'Sbeitla', 'name': 'Sbeitla' },
{ 'code': 'Feriana', 'name': 'Feriana' },
{ 'code': 'Ennour', 'name': 'Ennour' },
{ 'code': 'Thala', 'name': 'Thala' },
{ 'code': 'Kasserine', 'name': 'Kasserine' },
{ 'code': 'Foussana', 'name': 'Foussana' },
{ 'code': 'Echaraayaa Machrek El Chams', 'name': 'Echaraayaa Machrek El Chams' },
{ 'code': 'Mejel Bel Abes', 'name': 'Mejel Bel Abes' },
{ 'code': 'Sbiba', 'name': 'Sbiba' },
{ 'code': 'Ezzouhour', 'name': 'Ezzouhour' },
{ 'code': 'Hassi Ferid', 'name': 'Hassi Ferid' },
{ 'code': 'El Ayoun', 'name': 'El Ayoun' },
{ 'code': 'Ain El Khemaissa', 'name': 'Ain El Khemaissa' },
{ 'code': 'Telept', 'name': 'Telept' },
{ 'code': 'Khamouda', 'name': 'Khamouda' },
{ 'code': 'Errakhmet', 'name': 'Errakhmet' },
{ 'code': 'Bouzguam', 'name': 'Bouzguam' },
{ 'code': 'Jediliane', 'name': 'Jediliane' },
{ 'code': 'Ennour', 'name': 'Ennour' },
{ 'code': 'Hidra', 'name': 'Hidra' },
],
      'Mahdia': [
      {'code': 'Mahdia', 'name': 'Mahdia'},
{'code': 'Ksour Essaf', 'name': 'Ksour Essaf'},
{'code': 'El Jam', 'name': 'El Jam'},
{'code': 'Essouassi', 'name': 'Essouassi'},
{'code': 'Chorbana', 'name': 'Chorbana'},
{'code': 'Sidi Alouane', 'name': 'Sidi Alouane'},
{'code': 'Chebba', 'name': 'Chebba'},
{'code': 'Ouled Chamekh', 'name': 'Ouled Chamekh'},
{'code': 'Melloulech', 'name': 'Melloulech'},
{'code': 'Sidi Zid- Ouled Moulahem', 'name': 'Sidi Zid- Ouled Moulahem'},
{'code': 'Bradaa', 'name': 'Bradaa'},
{'code': 'Kerker', 'name': 'Kerker'},
{'code': 'El Hekaima', 'name': 'El Hekaima'},
{'code': 'Talasa', 'name': 'Talasa'},
{'code': 'Zalba', 'name': 'Zalba'},
{'code': 'Hebira', 'name': 'Hebira'},
{'code': 'Rejiche', 'name': 'Rejiche'}
      ],
      'Monastir' : [
      {'code': 'Monastir', 'name': 'Monastir'},

{'code': 'Jemmal', 'name': 'Jemmal'},
{'code': 'Kesar Hellal', 'name': 'Kesar Hellal'},
{'code': 'Teboulba', 'name': 'Teboulba'},
{'code': 'Ouerdanine', 'name': 'Ouerdanine'},
{'code': 'Sahline', 'name': 'Sahline'},
{'code': 'Bekalta', 'name': 'Bekalta'},
{'code': 'Zeramdine', 'name': 'Zeramdine'},
{'code': 'Bembla - El Mnara', 'name': 'Bembla - El Mnara'},
{'code': 'Benen Bodher', 'name': 'Benen Bodher'},
{'code': 'Sayada', 'name': 'Sayada'},
{'code': 'Menzel Hayet', 'name': 'Menzel Hayet'},
{'code': 'Menzel Nour', 'name': 'Menzel Nour'},
{'code': 'Khenis', 'name': 'Khenis'},
{'code': 'Beni Hassen', 'name': 'Beni Hassen'},
{'code': 'Sidi Ameur / Masjed Aissa', 'name': 'Sidi Ameur / Masjed Aissa'},
{'code': 'Menzel Kemel', 'name': 'Menzel Kemel'},
{'code': 'Amiret El Hojjej', 'name': 'Amiret El Hojjej'},
{'code': 'Touza', 'name': 'Touza'},
{'code': 'Zaouiet Kontoch', 'name': 'Zaouiet Kontoch'},
{'code': 'Amiret Touazra', 'name': 'Amiret Touazra'},
{'code': 'Bou-Hjar', 'name': 'Bou-Hjar'},
{'code': 'Lamta', 'name': 'Lamta'},
{'code': 'Amiret El Fehoul', 'name': 'Amiret El Fehoul'},
{'code': 'Ghanada', 'name': 'Ghanada'},
{'code': 'El Masdour-Menzel Hareb', 'name': 'El Masdour-Menzel Hareb'},
{'code': 'Sidi Bennour', 'name': 'Sidi Bennour'},
{'code': 'Cherahill', 'name': 'Cherahill'},
{'code': 'Menzel Farsi', 'name': 'Menzel Farsi'},
      ],
      'Sfax' : [
      {'code': 'Sakiet Ezzit', 'name': 'Sakiet Ezzit'},
{'code': 'Sakiet Eddaier', 'name': 'Sakiet Eddaier'},
{'code': 'Thyna', 'name': 'Thyna'},
{'code': 'El Ain', 'name': 'El Ain'},
{'code': 'Agareb', 'name': 'Agareb'},
{'code': 'Gremda', 'name': 'Gremda'},
{'code': 'Aouebed-Khazanet', 'name': 'Aouebed-Khazanet'},
{'code': 'Skhira', 'name': 'Skhira'},
{'code': 'Mahres', 'name': 'Mahres'},
{'code': 'El Hencha', 'name': 'El Hencha'},
{'code': 'Bir Ali Ben Khelifa', 'name': 'Bir Ali Ben Khelifa'},
{'code': 'Djebeniana', 'name': 'Djebeniana'},
{'code': 'El Amra', 'name': 'El Amra'},
{'code': 'Chihia', 'name': 'Chihia'},
{'code': 'Nadhour- Sidi Ali Belabed', 'name': 'Nadhour- Sidi Ali Belabed'},
{'code': 'Menzel Chaker', 'name': 'Menzel Chaker'},
{'code': 'El Hajeb', 'name': 'El Hajeb'},
{'code': 'Hazeg- El Louza', 'name': 'Hazeg- El Louza'},
{'code': 'Achecha- Boujarbouaa', 'name': 'Achecha- Boujarbouaa'},
{'code': 'En Nasr', 'name': 'En Nasr'},
{'code': 'El Ghraiba', 'name': 'El Ghraiba'},
{'code': 'Kerkennah', 'name': 'Kerkennah'}

      ],
      'Sidi Bouzid': [
      {'code': 'Regeub', 'name': 'Regeub'},

{'code': 'Menzel Bouzayen', 'name': 'Menzel Bouzayen'},
{'code': 'El Ahwess Al Assouada', 'name': 'El Ahwess Al Assouada'},
{'code': 'Mezzouna', 'name': 'Mezzouna'},
{'code': 'Bir El Hafey', 'name': 'Bir El Hafey'},
{'code': 'Jilma', 'name': 'Jilma'},
{'code': 'Faidh Bennour', 'name': 'Faidh Bennour'},
{'code': 'Meknassy', 'name': 'Meknassy'},
{'code': 'Essaiida', 'name': 'Essaiida'},
{'code': 'Souk Jedid', 'name': 'Souk Jedid'},
{'code': 'Cebalet Ouled Asker', 'name': 'Cebalet Ouled Asker'},
{'code': 'Ouled Haffouz', 'name': 'Ouled Haffouz'},
{'code': 'Sidi Ali Ben Aoun', 'name': 'Sidi Ali Ben Aoun'},
{'code': 'Batan El Ghezal', 'name': 'Batan El Ghezal'},
{'code': 'Rahal', 'name': 'Rahal'},
{'code': 'El Mansoura', 'name': 'El Mansoura'}
] ,
'Sousse':[
{'code': 'Sousse', 'name': 'Sousse'},
{'code': 'Msaken', 'name': 'Msaken'},
{'code': 'Ezzouhour', 'name': 'Ezzouhour'},
{'code': 'Kalaa Kebira', 'name': 'Kalaa Kebira'},
{'code': 'Hammam Sousse', 'name': 'Hammam Sousse'},
{'code': 'Kalaa Sghira', 'name': 'Kalaa Sghira'},
{'code': 'Enfidha', 'name': 'Enfidha'},
{'code': 'Akouda', 'name': 'Akouda'},
{'code': 'Bouficha', 'name': 'Bouficha'},
{'code': 'El Ghrimet Hicher', 'name': 'El Ghrimet Hicher'},
{'code': 'Zaouiet Sousse', 'name': 'Zaouiet Sousse'},
{'code': 'Sidi Bou Ali', 'name': 'Sidi Bou Ali'},
{'code': 'Kondar', 'name': 'Kondar'},
{'code': 'Sidi El Heni', 'name': 'Sidi El Heni'},
{'code': 'Messaadine', 'name': 'Messaadine'},
{'code': 'Ksibet Thrayet', 'name': 'Ksibet Thrayet'},
{'code': 'Hergla ', 'name': 'Hergla '},
{'code': 'Chott Mariem', 'name': 'Chott Mariem'},

],
'Gabes': [
{'code': 'Gabes', 'name': 'Gabes'},
{'code': 'El Hamma', 'name': 'El Hamma'},
{'code': 'Mareth', 'name': 'Mareth'},
{'code': 'Ghanouche', 'name': 'Ghanouche'},
{'code': 'Teboulba', 'name': 'Teboulba'},
{'code': 'Habib Thamer- Bou Attouch', 'name': 'Habib Thamer- Bou Attouch'},
{'code': 'Chenini_Nahal', 'name': 'Chenini_Nahal'},
{'code': 'Ouedhref', 'name': 'Ouedhref'},
{'code': 'Matmata Nouvelle', 'name': 'Matmata Nouvelle'},
{'code': 'Ketana', 'name': 'Ketana'},
{'code': 'El Metouia', 'name': 'El Metouia'},
{'code': 'Bouchemma', 'name': 'Bouchemma'},
{'code': 'Dekhilet-Toujane', 'name': 'Dekhilet-Toujane'},
{'code': 'Menzel El Hbib', 'name': 'Menzel El Hbib'},
{'code': 'Ezzarat', 'name': 'Ezzarat'},
{'code': 'Matmata', 'name': 'Matmata'}

         
],
'Kebili': [
{'code': 'Kebili', 'name': 'Kebili'},
{'code': 'Douz', 'name': 'Douz'},
{'code': 'Souk El Ahhad', 'name': 'Souk El Ahhad'},
{'code': 'Faouar', 'name': 'Faouar'},
{'code': 'Becheli-Jersine- El ', 'name': 'Becheli-Jersine- El '},
{'code': 'Bechri-Fatnassa', 'name': 'Bechri-Fatnassa'},
{'code': 'El Golaa', 'name': 'El Golaa'},
{'code': 'Jemna', 'name': 'Jemna'},
{'code': 'Rejim Maatoug', 'name': 'Rejim Maatoug'}

],
'Medinine': [
{'code': 'Tataouine', 'name': 'Tataouine'},
{'code': 'Ghomrassen', 'name': 'Ghomrassen'},
{'code': 'Smar', 'name': 'Smar'},
{'code': 'Remada', 'name': 'Remada'},
{'code': 'Bir Lahmer', 'name': 'Bir Lahmer'},
{'code': 'Tataouine Janoubia', 'name': 'Tataouine Janoubia'},
{'code': 'Dhehiba', 'name': 'Dhehiba'},
      ],
'Tozeur': [
{ 'code': 'Fer', 'name': 'Feriana' },
          { 'Tozeur': 'EN', 'name': 'Tozeur' },
          { 'Nefta': 'THH', 'name': 'Nefta' },
          { 'Degash': 'KS', 'name': 'Degash' },
          { 'El Hamma Jerida': 'FSS', 'name': 'El Hamma Jerida' },
          { 'Tameghza': 'EMC', 'name': 'Tameghza' },
          { 'Hazoua': 'MBA', 'name': 'Hazoua' },
]
     }
    }
  
  }),
  mounted() {
    
  },
  methods: {
 
    login() {
      axios
        .post("https://localhost:7283/api/User/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // Store the user data in localStorage
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          // Redirect to the dashboard page
          this.$router.push("/DashUtilisateur");
          this.$session.start();
        })
        .catch((error) => {
          if (error.response.status === 400) {
            // Display error message using sweetalert2
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email ou Mot de passe incorrecte!",
            });
          } else {
            console.log(error);
          }
        });
    },

    async signup() {
   
     
      try {
        this.loading = true;
        this.showSpinner = true;
      setTimeout(() => {
    this.loading = false;
  }, 3000);

   
        const response = await axios.post('https://localhost:7283/api/User/register', {
          nom: this.nom,
          prenom: this.prenom,
          email: this.email,
          password: this.password,
          cin: this.cin,
          telephone: this.telephone,
          adresse: this.adresse
        }, {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });

        console.log(response.data);

        // simuler un délai de 2 secondes
        setTimeout(() => {
          Swal.fire({
            icon: 'success',
            title: 'Succès',
            text: 'Votre compte a été créé avec succès!'
          });

          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('token', response.data.token);
          this.$router.push("/DashUtilisateur");
        }, 2000);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const errorMessage = error.response.data;
          console.log(errorMessage);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: errorMessage
          });
        } else {
          console.log('- Error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite. Veuillez réessayer plus tard.'
          });
        }
      } finally {
        this.loading = false;
        this.showSpinner = false;

        setTimeout(() => {
          this.loading = false;
          console.log('loading:', this.loading);
        }, 2000);
      }
    }
  },
    





   
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  
  computed: {
    isGouvernoratSelected() {
      return this.gouvernorat !== null;
    },
    formValid() {
      return this.$refs.form.valid
    },
  
    email: {
      get() {
        return this.$data.email;
      },
      set(value) {
        this.$data.email = value;
      },
    },
    password: {
      get() {
        return this.$data.password;
      },
      set(value) {
        this.$data.password = value;
      },
    },
    nom: {
      get() {
        return this.$data.nom;
      },
      set(value) {
        this.$data.nom = value;
      },
    },
    prenom: {
      get() {
        return this.$data.prenom;
      },
      set(value) {
        this.$data.prenom = value;
      },
    },
    adresse: {
      get() {
        return this.$data.adresse;
      },
      set(value) {
        this.$data.adresse= value;
      },
    },
    telephone: {
      get() {
        return this.$data.telephone;
      },
      set(value) {
        this.$data.telephone= value;
      },
    },
    passwordFieldType() {
      return this.showPassword ? "text" : "password";
    },
  },

  props: {
    source: String,
  },
};
</script>

<style scoped>

.signup-btn {
  position: relative;
}

.spinner {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 2s linear infinite;
  margin-left: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.custom-checkbox .checkbox-icon {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border: 1px solid #999999;
  border-radius: 4px;
}

.custom-checkbox input[type="checkbox"]:checked+.checkbox-icon:before {
  content: "\f14a";
  font-family: "Material Design Icons";
  font-size: 16px;
  position: absolute;
  top: 2px;
  left: 3px;
  color: #2196f3;
}

.custom-checkbox label {
  font-size: 14px;
  color: #333333;
  margin-left: 5px;
}
select {
    padding: 8px 10px;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    outline: none;
  }
  option {
    font-size: 16px;
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: bold;
  }
</style>
