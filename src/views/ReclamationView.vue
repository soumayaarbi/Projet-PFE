<template>

  <NavDrawer :visible="isDrawerOpen" @update="handleDrawerUpdate"></NavDrawer>
  <div class="app" style="background-color: #f2f2f2">
    <div v-if="loading" class="spinner">
      <!-- Afficher un indicateur de chargement ici -->
    </div>
    <div v-else>
      <br />
      <h4 class="text-center form-title" style="top: 3%">
        Espace Reclamations
      </h4>
      <br />
      <div class="top">
        <v-dialog v-model="adddialog" width="900" height="1500">
          <template v-slot:activator="{ props }">
            <v-btn class="btn" style="background-color: white" v-bind="props">
              <v-icon color="success"> mdi-plus-circle </v-icon>
              Ajouter
            </v-btn>
          </template>
          <v-card>
            <v-card-title> Ajouter Votre Reclamation </v-card-title>
            <v-divider :thickness="2"> </v-divider>

            <v-sheet width="600" style="margin-left: 100px">
              <v-form ref="form">
                <p class="p3">
                  <v-icon style="size: 50px">mdi-account</v-icon> Informations
                  Personnelles :
                </p>
                <br />
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="user.email"
                      label="Email"
                      required
                      readonly
                    ></v-text-field>
                  </v-col>

                  <v-col cols="4">
                    <v-text-field
                      v-model="user.nom"
                      label="Nom"
                      required
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="user.prenom"
                      label="Prenom"
                      required
                      readonly
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="user.telephone"
                      label="Telephone"
                      required
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>

                <p class="p3">
                  <v-icon style="size: 50px">mdi-pencil</v-icon> Informations
                  concernant la reclamation :
                </p>
                <br />
                <v-row>
                  <v-col cols="6">
    <label for="country">Gouvernorat:</label>
    
    <select v-model="gouvernorat" id="country"  :rules="[(v) => !!v || 'Champ obligatoire']">
    
      <option value="" disabled class="">Selectionner</option>
      <option v-for="(country, index) in countries" :key="index" :value="country.code"  :rules="[(v) => !!v || 'Champ obligatoire']" > {{ country.name }}</option>
    </select>
</v-col>
<v-col cols="6">
    <label for="state">Municipalité:</label>
    <select v-model="municipalite" id="state" :disabled="!gouvernorat"  :rules="[(v) => !!v || 'Champ obligatoire']">
      <option value="" disabled  :rules="[(v) => !!v || 'Champ obligatoire']" >Selectionner</option>
      <option v-for="(state, index) in states[gouvernorat]" :key="index" :value="state.code" >{{ state.name }}</option>
    </select>
  </v-col>
</v-row>
                <v-row>
                 
                  <v-col cols="12">
                    <v-text-field
                      v-model="objet"
                      :value="objet"
                      label="Objet*"
                      required
                      clearable
                      :rules="[(v) => !!v || 'Champ obligatoire']"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-textarea
                      v-model="description"
                      :value="description"
                      counter
                      label="Description de la réclamation*"
                      maxlength="1200"
                      required
                      clearable
                      :rules="[(v) => !!v || 'Champ obligatoire']"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="6">
                    <v-textarea
                      v-model="autres"
                      :value="autres"
                      counter
                      label="Autres informations "
                      maxlength="1200"
                      required
                      clearable
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                           
                              <label for="date-time-input">Date et Heure</label>
                             
                                <input
                                  name="date-time-input"
                                  type="datetime-local"
                                  v-model="heure"
                                />
                           
                          </v-col>
                  <v-col cols="6">
                    <label style="margin-left: 40px;" >Joindre un fichier</label>
                    <v-file-input
                      v-model="file"
                      :value="file"
                      accept="image/*"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-form>
            </v-sheet>
            <div style="width: 300px" class="mx-auto">
              <v-btn
                color="success"
                class="mt-4"
                block
                @click="creerNouvelItem()"
              >
                Valider
              </v-btn>
            </div>
            <v-card-actions>
              <v-btn @click="adddialog = false" color="primary">Fermer</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <p class="p1">
          Vous avez au total
          <b style="color: #2196f3">{{ nombreDeLignes }}</b> Reclamation(s)
        </p>
      </div>
      <div v-if="loading" class="spinner">
   
  </div>
    <div v-else>
      <div class="table-wrapper">
        <table
          class="custom-table"
          :style="{ paddingLeft: isDrawerOpen ? '200px' : '0' }"
        >
          <thead>
            <tr>
              <th>Objet</th>
              <th>Description</th>
              <th>Date et Heure</th>
              <th>Autres informations</th>
              <th>Document</th>
              <th style="">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.objet }}</td>
              <td>{{ item.description }}</td>
              <td>{{ formatDateTime(item.heure) }}</td>
              <td>{{ item.autres }}</td>
              <td></td>

              <td style="text-align: right">
                <v-dialog v-model="editDialog" width="1000" height="1500">
                  <template v-slot:activator="{ props }">
                    <v-icon
                      @click="editItem(item)"
                      v-bind="props"
                      color="success"
                      >mdi-pencil</v-icon
                    >
                    <v-icon @click="supprimerItem(item.id)" color="error"
                      >mdi-delete</v-icon
                    >
                  </template>
                  <v-card>
                    <v-card-title> Modifier Votre Reclamation </v-card-title>
                    <v-divider :thickness="2"></v-divider>

                    <v-sheet width="600" style="margin-left: 100px">
                      <v-form ref="form">
                        <v-row>
                       
                          <v-col cols="6">
                            <v-text-field
                              v-model="editedItem.objet"
                              label="Objet*"
                              required
                              clearable
                              :rules="[(v) => !!v || 'Champ requis']"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <v-textarea
                              v-model="editedItem.description"
                              counter
                              label="Description de la reclamation*"
                              maxlength="120"
                              required
                              clearable
                              :rules="[(v) => !!v || 'Champ requis']"
                            ></v-textarea>
                          </v-col>
                          <v-col cols="6">
                            <v-textarea
                              v-model="editedItem.autres"
                              counter
                              label="Autres Informations"
                              maxlength="120"
                              clearable
                              :rules="[(v) => !!v || 'Champ requis']"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <div class="date-time-input-container">
                              <label for="date-time-input">Date et Heure</label>
                              <div class="input-wrapper">
                                <input
                                  name="date-time-input"
                                  type="datetime-local"
                                  v-model="heure"
                                />
                              </div>
                            </div>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-sheet>
                    <div style="width: 300px" class="mx-auto">
                      <v-btn
                        color="success"
                        class="mt-4"
                        block
                        @click="updateItem()"
                      >
                        Valider
                      </v-btn>
                    </div>
                    <v-card-actions>
                      <v-btn @click="editDialog = false" color="primary"
                        >Fermer</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </div>

</template>

<style>
.app {
  height: 100%;
  width: 100%;
}
.time-input-container {
  position: relative;
  display: inline-block;
}

.time-input {
  width: 50px;
  border: none;
  text-align: center;
  font-size: 16px;
  font-family: sans-serif;
}

.time-input-container::before {
  content: "HH:MM";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 16px;
  font-family: sans-serif;
  line-height: 32px;
  pointer-events: none;
}
.p3 {
  font-size: 17px;
  color: black;
  font-family: "Roboto", sans-serif;
  transition: color 0.2s ease-in-out;
  font-weight: bold;
}

.top {
  margin-top: 50px;
}
.btn {
  background-color: #fff;
  text-transform: none;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  margin-right: 900px;
}
.p1 {
  margin-left: 850px;
  font-size: 20px;
}
.p2 {
  font-size: 20px;
  color: #2196f3;
  font-weight: bold;
}
.table-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 50px;
  transition: transform 0.3s ease;
}
.drawer-open .table-wrapper {
  transform: translateX(10px);
}

.custom-table {
  width: 70%;
  border-collapse: collapse;

  background-color: white;
}

.custom-table th,
.custom-table td {
  padding: 8px;
  text-align: left;
}
.custom-table th {
  font-style: bold;
}

.custom-table tr {
  border: 1px;
}
.custom-table tr:hover {
  background-color: white;
}
.form-title {
  font-size: 2rem;
  font-weight: bold;
  color: #2196f3;
  text-transform: uppercase;
  letter-spacing: 0.3rem;
  margin-bottom: 3rem;
  position: relative;
  display: inline-block;
}

.form-title::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 0.2rem;
  bottom: -1rem;
  left: 0;
  background-color: #2196f3;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.form-title:hover::before {
  transform: scaleX(1);
}

.edit-dialog {
  margin-left: 5%;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.edit-dialog .v-card-title {
  font-size: 24px;
  font-weight: bold;
}

.edit-dialog .v-divider {
  margin: 16px 0;
}

.edit-dialog .v-btn {
  margin-right: 16px;
}

.date-time-input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}

.date-time-input-container label {
  margin-bottom: 4px;
}

.date-time-input-container .input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
}

.date-time-input-container .input-wrapper input {
  flex: 1;
  border: none;
  outline: none;
}

.date-time-input-container .input-wrapper .icon {
  margin-left: 8px;
}
.spinner {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #7986cb;
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;
  position: absolute;
  top: 50%;
  left: 50%;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
select {
  padding: 8px 30px;
  margin-left: 20px;
  font-size: 50px;
  border: 1px solid #ccc;
  outline: none;
  width: 200px; /* adjust this value to change the width */
  margin-top: 10px; /* adjust this value to move the select element away from the label */
}

option {
  font-size: 16px;
}

label {
  margin-bottom: 5px;
  font-size: 15px;
}
</style>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import NavDrawer from "@/components/NavDrawer.vue";
export default {
  components: {
    NavDrawer,
  },
  watch: {
    '$route': function() {
      if (!localStorage.getItem("user")) {
        this.$router.replace("/login");
      }
    }
  },
  data() {
    return {
      panel: [],
      valid: true,
      codePostal: "",
      objet: "",
      description: "",
      date: '',
        heure: '',
        availableTimes: [],
      autres: "",
      file: "",
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
     },

      user: {},
      newItem: { name: "", description: "" },
      editedItem: { id: "", name: "", description: "" },
      createDialog: false,
      editDialog: false,
      adddialog: false,
      nombreDeLignes: null,
      loading: true,
    };
  },
  created() {
    this.getItems();
    this.getNombreDeLignes();
  },
  computed: {
  currentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
},
  methods: {
    async fetchAvailableTimes() {
        if (!this.date) return;
        const response = await axios.get(`/api/rendezvous/availableTimes/${this.date}`);
        this.availableTimes = response.data;
    },
    dateRule(v) {
      const selectedDate = new Date(v);
      const currentDate = new Date();
      if (selectedDate < currentDate) {
        return 'La date doit être ultérieure à la date actuelle';
      }
      return true;
    },
    formatDateTime(dateTimeString) {
      if (!dateTimeString) {
        return ""; // retourne une chaîne vide si dateTimeString est nul ou non défini
      }
      const dateTime = new Date(dateTimeString);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return dateTime.toLocaleString("fr-FR", options);
    },

    handleDrawerUpdate(isOpen) {
      this.isDrawerOpen = isOpen;
    },
    editItem(item) {
      this.editedItem = item;
      this.editDialog = true;
    },

    async getItems() {
      try {
        
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          "https://localhost:7283/api/Reclamation/ByEmail",
          {
            params: { email: user.email },
          }
        );
       
        // Update the items array to include the FilePath property
        this.items = response.data;
        // Stocker les éléments dans le stockage local
        localStorage.setItem("userItems", JSON.stringify(response.data));
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(dateString) {
      if (!dateString) {
        return ""; // retourne une chaîne vide si dateString est nul ou non défini
      }
      const date = new Date(dateString);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return date.toLocaleDateString("fr-FR", options);
    },
    async updateItem() {
      try {
        const response = await axios.put(
          `https://localhost:7283/api/Reclamation/Modification`,
          {
            // update the properties of the proposition
            id: this.editedItem.id,
            codePostal: this.editedItem.codePostal,
            objet: this.editedItem.objet,
            description: this.editedItem.description,
            heure: this.heure,
            autres: this.editedItem.autres,
          }
        );

        console.log(response.data); // log the response from the API

        // update the local array of items with the updated item

        this.$forceUpdate();
        this.editDialog = false; // close the dialog
        await Swal.fire(
          "Success",
          "La reclamation a été modifiée avec succès!",
          "success"
        );
        const index = this.items.findIndex(
          (item) => item.id === this.editedItem.id
        );
        if (index !== -1) {
          this.items[index] = response.data;
        }
      } catch (error) {
        console.error(error);
        this.dialog = false;
        await Swal.fire(
          "Error",
          "Une erreur est survenue lors de la modification de la reclamation",
          "error"
        );
      }
    },

    async getNombreDeLignes() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          "https://localhost:7283/api/Reclamation/nombre-de-lignes",
          {
            params: { email: user.email },
          }
        );
        this.nombreDeLignes = response.data;
        // Forcer la mise à jour du composant
      } catch (error) {
        console.error(error);
      } 
    },
    async supprimerItem(id) {
      try {
        // Show confirmation alert
        const result = await Swal.fire({
          icon: "warning",
          title: "Êtes-vous sûr de vouloir supprimer cette réclamation ?",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oui, supprimer",
          cancelButtonText: "Annuler",
        });

        // If user confirms deletion, delete the item
        if (result.isConfirmed) {
          // Send a DELETE request to the API with the ID of the item to delete
          await axios.delete(`https://localhost:7283/api/Reclamation/${id}`);
          // Remove the item from the items array
          this.items = this.items.filter((item) => item.id !== id);
          // Show success alert
          await Swal.fire({
            icon: "success",
            title: "Reclamation supprimée avec succès!",
            showConfirmButton: false,
            timer: 1500,
          });
          this.nombreDeLignes -= 1;
          // Mettre à jour la liste des éléments
          await this.getItems();
          // Forcer la mise à jour du composant
          this.$forceUpdate();
        }
      } catch (error) {
        console.error(error);
        // Handle error here if necessary
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Une erreur est survenue lors de la suppression de votre réclamation. Veuillez réessayer plus tard.",
          confirmButtonText: "OK",
        });
      }
    },

    async creerNouvelItem() {
      try {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          // Créer un nouvel objet avec les champs de l'interface utilisateur
          const nouvelItem = {
            nom: this.user.nom,
            prenom: this.user.prenom,
            email: this.user.email,
            telephone: this.user.telephone,
            objet: this.objet,
            description: this.description,
            date: this.date,
            heure: this.heure,
            autres: this.autres,
            file: this.file,
          };
          // Envoyer la demande POST à l'API
          const response = await axios.post(
            "https://localhost:7283/api/Reclamation/reclamations",
            nouvelItem
          );
          // La réponse renvoie l'objet nouvellement créé depuis le serveur
          const itemCree = response.data;
          // Ajouter le nouvel item à la liste existante
          this.items.push(itemCree);
          // Réinitialiser les valeurs des champs
          const user = JSON.parse(localStorage.getItem("user"));
          user.nom = this.user.nom;
          user.prenom = this.user.prenom;
          user.email = this.user.email;
          user.telephone = this.user.telephone;
          this.objet = "";
          this.description = "";
          this.date = "";
          this.heure = "";
          this.autres = "";
          this.file = "";

          this.adddialog = false;
          // Afficher une alerte de succès
          await Swal.fire({
            icon: "success",
            title: "Reclamation créée avec succès!",
            showConfirmButton: false,
            timer: 1500,
          });
          // Fermer la boîte de dialogue de création
          this.nombreDeLignes += 1;
          // Mettre à jour la liste des éléments
          await this.getItems();
          // Forcer la mise à jour du composant
          this.$forceUpdate();
        }
      } catch (error) {
        console.error(error);
        // Gérer l'erreur ici si nécessaire
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Une erreur est survenue lors de la création de la reclamation. Veuillez réessayer plus tard.",
          confirmButtonText: "OK",
        });
      }
    },
  },
  mounted() {
    // Get the user data from localStorage
    const userData = localStorage.getItem("user");
    this.user = JSON.parse(userData);
    if (!localStorage.getItem("user")) {
      window.location.href = "/login";
  }
    //this.getItems();
    this.getItems().then(() => {
  // Attendre 2 secondes avant de terminer le chargement
  setTimeout(() => {
    this.loading = false;
  }, 2000);
});
    this.getNombreDeLignes();

  },
  beforeMount() {
    const userData = localStorage.getItem("user");
    this.user = JSON.parse(userData);
    if (!localStorage.getItem("user")) {
      window.location.href = "/login";
  }
    this.getItems().then(() => {
  // Attendre 2 secondes avant de terminer le chargement
  setTimeout(() => {
    this.loading = false;
  }, 5000);
});
  },
};
</script>
