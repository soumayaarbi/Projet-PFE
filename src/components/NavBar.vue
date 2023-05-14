<template>
    
   
        <v-navigation-drawer
        permanent
          color="blue"
        >
          <v-list>
            <v-list-item
            
            ><v-img
  class="profile-image rounded-frame"
  :src="user.profileImage || require('@/assets/unknown.png')"
  alt="Profile image"
  width="50"
  height="50"
  contain
  
></v-img>
</v-list-item>

          </v-list>
          <br><p> {{user.prenom}} {{ user.nom }} <br>{{ user.email }}</p>
          <v-divider></v-divider>
  
          <v-list density="compact" nav>
            <v-list-item link to="/DashUtilisateur">
      <v-list-item-action>
        <v-icon>mdi-view-dashboard</v-icon>
        
        <v-list-item-title   style="margin-left: 70px;font-size:15px;"> Dashboard </v-list-item-title>
      </v-list-item-action>
    </v-list-item>
    <v-list-item link to="/ProfilUtilisateur">
      <v-list-item-action>
        <v-icon>mdi-account</v-icon>
        
        <v-list-item-title   style="margin-left: 70px;font-size:15px;">Profil</v-list-item-title>
      </v-list-item-action>
    </v-list-item>
    <v-list-item  @click="logout" >
      <v-list-item-action >
        <v-icon>mdi-logout-variant</v-icon>
        
        <v-list-item-title   style="margin-left: 70px;font-size:15px;"  >Logout</v-list-item-title>
      </v-list-item-action>
    </v-list-item>
    </v-list>
        </v-navigation-drawer>
  
        <v-main style="height:200px"></v-main>
      
    
  </template>
  <script>
  //import axios from 'axios'
  export default {
    data() {
    return {
      user: {},
    };
  },
  mounted() {
    // Get the user data from localStorage
    const userData = localStorage.getItem("user");

    // Parse the JSON string to an object
    this.user = JSON.parse(userData);
  },
  methods:{
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
.profile-image {
  border-radius: 50%;
  align-content: center;
  margin-left: 80px;
}
.rounded-frame {
  border-radius: 50%;

}
</style>