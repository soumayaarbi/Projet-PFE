<template>

<NavDrawer></NavDrawer>
<div class="app" style="background-color: #f2f2f2" >
    <div v-if="loading" class="spinner">
      <!-- Afficher un indicateur de chargement ici -->
    </div>
    <div v-else>
      <br>
  <h4 class="text-center form-title" style="top: 3%;"> Profil Utilisateur </h4>   
  <v-img class="profile-image rounded-frame container text-center"
      :src="user.profileImage || require('@/assets/unknown.png')"
      alt="Profile image"
      width="120"
      height="120"
      contain></v-img>
     
    
    <v-container class="form-container d-flex flex-column align-center">
      <v-list dense class="custom-list">
  <v-list-item class="custom-list-item">
    <v-list-item-icon class="custom-list-icon" >
      <v-icon style=" margin-left: 140px;">mdi-account </v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title class="custom-list-title" style=" margin-left: 130px;">Nom: {{ user.nom }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
  <v-list-item class="custom-list-item">
    <v-list-item-icon class="custom-list-icon">
      <v-icon style=" margin-left: 140px;">mdi-account</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title class="custom-list-title" style=" margin-left: 140px;">Prénom: {{ user.prenom }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
  <v-list-item class="custom-list-item">
    <v-list-item-icon class="custom-list-icon">
      <v-icon style=" margin-left: 120px;">mdi-phone</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title class="custom-list-title" style=" margin-left: 100px;">Téléphone: {{ user.telephone }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
  <v-list-item class="custom-list-item">
    <v-list-item-icon class="custom-list-icon">
      <v-icon style=" margin-left: 80px;">mdi-email</v-icon>
    </v-list-item-icon>
    <v-list-item-content>
      <v-list-item-title class="custom-list-title" style=" margin-left: 80px;">Email: {{ user.email }}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</v-list>

  <v-dialog v-model="dialog"  persistent width="950" height="1500" style=" margin-left : 5%;" >
        <template v-slot:activator="{ props }" >
        
          <div style="width:500px; justify-content: center;">
          <v-btn color="blue" dark block tile v-bind="props" 
            >Modifier Votre Profil</v-btn
          
          >
          
        </div>
          
        </template>

        <v-card>
          <br>
          <br>
          <span class="text-h5" style="margin-left: 20px;">Modifier Vos Informations </span>
          <br>
          <v-avatar class="mx-auto mb-2" size="65" centred>
            <v-img :src="profileImage" :alt="`${firstName} ${lastName}`" contain v-if="profileImage" centred style="margin-top: auto; margin-bottom: auto;"></v-img>
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar> <br>
 
    <v-container>
      <v-row>
        <v-col cols="1" sm="6" md="15">
          <v-text-field label="Nom*" required v-model="user.nom"></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="15" sm="6" md="15">
          <v-text-field label="Prénom*" required v-model="user.prenom"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="15">
          <v-text-field label="Email*" readonly v-model="user.email"></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12">
          <v-text-field label="Telephone*" v-model="user.telephone" required></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-file-input v-model="selectedFile" :rules="fileRules" accept="image/*" label="Upload Image" prepend-icon="mdi-camera" @change="onFileSelected" outlined hide-details></v-file-input>
        </v-col>
     
    <small style="color:red;margin-left: 10px;">Remarque : Vous ne puvez pas changez votre Email </small>
      </v-row>

    </v-container>
   
  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="blue-darken-1" variant="text" @click="dialog = false">Fermer</v-btn>
    <v-btn color="blue-darken-1" variant="text" @click="Modification()">Enregistrer</v-btn>
  </v-card-actions>
</v-card>

      </v-dialog>
     
    </v-container>
    </div>
    </div>
      
   
</template>
<script>
import NavDrawer from "@/components/NavDrawer.vue";
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name: "DashUtilisateur",
  components: {
    NavDrawer,
  },
  watch: {
    '$route': function() {
      if (!localStorage.getItem("user")) {
        this.$router.push("/login");
      }
    }
  },

  data() {
    return {
      user: {},
      unknownUserImage: require("@/assets/logo.png"),
      dialog: false,
      selectedFile: null,
      profileImage: null,
      firstName: 'John',
      lastName: 'Doe',
      fileRules: [
        value => !!value || 'File is required',
        value =>value || !value.length || value[0].size < 2000000 || 'Avatar size should be less than 2 MB!',
        value => ['image/jpeg', 'image/png'].includes(value.type) || 'Only JPG and PNG files are allowed',
      ],
      loading: false,
    };
  },
  mounted() {
    // Get the user data from localStorage
    const userData = localStorage.getItem("user");

    // Parse the JSON string to an object
    this.user = JSON.parse(userData);
    if (!localStorage.getItem("user")) {
    this.$router.push("/login");
  }
 
  },
  computed: {
  currentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
},

  methods:{
    onFileSelected() {
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile[0]);
        reader.onload = () => {
          this.profileImage = reader.result;
        };
      }
    },
   
    async Modification() {
  try {
    const response = await axios.put(`https://localhost:7283/api/User`, {
      nom: this.user.nom,
      prenom: this.user.prenom,
      email: this.user.email,
      telephone: this.user.telephone
    });

    console.log(response.data); // log the response from the API

    // update the user data in local storage
    const user = JSON.parse(localStorage.getItem('user'));
    user.nom = this.user.nom;
    user.prenom = this.user.prenom;
    user.email = this.user.email;
    user.telephone = this.user.telephone;
    localStorage.setItem('user', JSON.stringify(user));

    this.$emit('updateUser', this.user); // emit an event to update the user data
    this.dialog = false; // close the dialog
    await Swal.fire('Success', 'Les informations de l\'utilisateur ont été mises à jour avec succès!', 'success');
  } catch (error) {

    console.error(error);
    this.dialog = false;
    await Swal.fire('Error', 'Une erreur est survenue lors de la mise à jour des informations de l\'utilisateur', 'error');
  }
},


  }
  
};
</script>
<style scoped>
.custom-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
  justify-content: center;
  background-color: transparent !important;
}

.custom-list-title {
  font-size: 16px;
  margin-top: 8px;
  color: #444444;
 
}

.custom-list-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 10px;
  transition:  0.2s ;
  width: 100%;
  max-width: 400px;
  margin-bottom: 16px;
  background-color: transparent !important;
}

.custom-list-item:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.custom-list-icon {
  font-size: 24px;
  margin-right: 16px;
  color: #2196f3;
}

@media only screen and (min-width: 700px) {
  .custom-list {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    background-color:transparent;
  }
  
  .custom-list-item {
    margin-right: 16px;
    margin-bottom: 16px;
  }
 
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
}

.container1 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}
.list-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}


.custom-list {
  margin-top: 12px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.custom-list-title {
  font-weight: bold;
  display: flex;
}

.dialog-form {
  width: 100%;
  max-width: 800px;
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
.profile-image {
  border-radius: 50%;
}
.rounded-frame {
  border-radius: 50%;
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

</style>
