<template >
  <router-view>
    <div >
    <v-navigation-drawer v-model="drawer" location="left"  temporary color="#212121" app style="margin-top: 60px;" class="drawer" id="nav">
          <v-list>
            <v-list-item
            
            >
            <h6 class="titre2"> Espace Citoyen</h6>
</v-list-item>

          </v-list>
          
          <v-divider style="color:antiquewhite;"></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item link to="/DashUtilisateur" style="color:antiquewhite;">
      <v-list-item-action>
        <v-icon style="color:antiquewhite;">mdi-view-dashboard</v-icon>
        
        <v-list-item-title   style="margin-left: 50px;font-size:15px;"> Mon Espace </v-list-item-title>
      </v-list-item-action>
    </v-list-item>
    <v-list-item link to="/proposition" style="color:antiquewhite;">
      <v-list-item-action>
        <v-icon style="color:antiquewhite;">mdi-pencil</v-icon>
        
        <v-list-item-title   style="margin-left: 50px;font-size:15px;">Mes Proposition</v-list-item-title>
      </v-list-item-action>
    </v-list-item>
    <v-list-item link to="/reclamation" style="color:antiquewhite;">
      <v-list-item-action>
        <v-icon style="color:antiquewhite;">mdi-exclamation</v-icon>
        
        <v-list-item-title   style="margin-left: 50px;font-size:15px;">Mes Réclamation </v-list-item-title>
      </v-list-item-action>
    </v-list-item>
    <v-list-item link to="/rendezvous" style="color:antiquewhite;">
      <v-list-item-action>
        <v-icon style="color:antiquewhite;">mdi-update</v-icon>
        
        <v-list-item-title   style="margin-left: 50px;font-size:15px;"> Mes Rendez-Vous </v-list-item-title>
      </v-list-item-action>
    </v-list-item>
    
    <v-list-item link to="/ProfilUtilisateur" style="color:antiquewhite;">
      <v-list-item-action>
        <v-icon style="color:antiquewhite;">mdi-account-outline</v-icon>
        
        <v-list-item-title   style="margin-left: 50px;font-size:15px;"> Mon Profil</v-list-item-title>
      </v-list-item-action>
    </v-list-item>
    <v-list-item style="color:antiquewhite;" @click="logout" >
      <v-list-item-action >
        <v-icon style="color:antiquewhite;">mdi-logout-variant</v-icon>
        
        <v-list-item-title   style="margin-left: 50px;font-size:15px;"  > Se Déconnecter</v-list-item-title>
      </v-list-item-action>
    </v-list-item>
    </v-list>
        </v-navigation-drawer>  
      </div>
    <v-card>
      <v-layout>
        <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
  
        <v-app-bar color="blue" flat app  class="px-7" height="60" >
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
          <div class="title-container">
            <h6 class="titre"> Espace Citoyen</h6>
          </div>
          <div   style="margin-left: 850px;">
          <v-img

  class="profile-image rounded-frame"
  :src="user.profileImage || require('@/assets/unknown.png')"
  alt="Profile image"
  width="50"
  height="50"
  contain

></v-img>
</div>
         <router-link to="/ProfilUtilisateur"  style="text-decoration: none;color:white;">
              <h6 style="margin-top: 6px; margin-left: 20px; text-transform: uppercase;" link to="/ProfilUtilisateur">{{ user.prenom }} {{ user.nom }}</h6>
            </router-link>
              <v-icon @click="logout" style="margin-left: 20px;">mdi-logout</v-icon>
           
          
        </v-app-bar>
     
     
        
 <v-main>
        </v-main>
      </v-layout>
    </v-card>
  </router-view>
  </template>
  
  <script>
  export default {
    data: () => ({
        hideOptionsTimeout: null,
        showOptions: false,
        user: {},
      drawer: false,
      group: null,
      
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
    mounted() {
      const drawerContent = document.querySelector(
      ".v-navigation-drawer__content"
    );
    const windowHeight = window.innerHeight;
    drawerContent.style.maxHeight = `${windowHeight}px`;
    // Get the user data from localStorage
    const userData = localStorage.getItem("user");

    // Parse the JSON string to an object
    this.user = JSON.parse(userData);
  },
  methods:{
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    hideOptions() {
      this.hideOptionsTimeout = setTimeout(() => {
        this.showOptions = false;
      }, 200);
    },
    cancelHideOptions() {
      clearTimeout(this.hideOptionsTimeout);
    },
    logout() {
  // Remove the user data and JWT token from localStorage
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  // Redirect to the login page
  this.$router.push("/login");
}
  }
  }
</script>
<style>
.profile-options {
  position: relative;
}

.options-list {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1;
  display: none;
  background-color: #f9f9f9;
  padding: 0;
  margin: 0;
  list-style: none;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.options-list li {
  padding: 12px 16px;
  text-align: left;
}

.options-list li a {
  display: block;
  color: #333;
  text-decoration: none;
}

.options-list li:hover {
  background-color: #f1f1f1;
}




.profile-image {
  border-radius: 50%;
  align-content: center;
  margin-left: 80px;
}
.rounded-frame {
  border-radius: 50%;

}
.titre{
    margin-top:6px;margin-left: 30px;
    font-family: 'Montserrat', sans-serif;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 4px;
  letter-spacing: 1px;
}
.titre2{
    margin-top:6px;margin-left: 5px;
    font-family: 'Montserrat', sans-serif;
  font-size: 15px;
  font-weight: bold;
  color:#f1f1f1;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 4px;
  letter-spacing: 2px;
}
.drawer{
  transition: transform 0.3s ease-in-out;
  transform: translateX(-250px);
}
.drawer.open{
  transform: translateX(0);
}
.drawer.open + .table {
  left: 250px;
}

</style>