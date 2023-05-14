<template>
 
 
    <NavDrawer></NavDrawer>
    <!--<h2>Welcome, {{ user.nom }}!</h2>
    <p>Email: {{ user.email }}</p>
    <p>First Name: {{ user.prenom }}</p>-->
  

<div id="content">
  <v-img src="../assets/citoyen.png" ></v-img>
<div class="top-panel">
  <h6 class="text-center" style="font-weight: bold;letter-spacing: 0.1rem;">Bienvenue dans votre espace chér(e) Citoyen <span class="prenom-nom">{{ user.prenom }} {{ user.nom }} </span> </h6>
  <p> Vous pouvez déposer une réclamation, une proposition ou bien prendre un rendez-vous en un simple clic </p>
</div>

<div class="container">
  <div class="panel post">
    
    <h4> <span> {{ nombreDeLignes}} </span>Proposition(s)</h4>
  </div>
  <div class="panel page">
    <h4><span> {{ nombreDeLigness}} </span>Réclamation(s)</h4>
  </div>
  <div class="panel user">
   
    <h4 style="display: flex; justify-content: space-between;"> <span>{{ nombreDeLignesss}} </span>Rendez-Vous</h4>
    
  </div>
</div>
</div>
</template>

<script>
import NavDrawer from '@/components/NavDrawer.vue'
import axios from 'axios';

export default {
  name: "DashUtilisateur",
  components:{
NavDrawer
  },
  
  data() {
    return {
      user: {},
      nombreDeLignes: null,
      nombreDeLigness: null,
      nombreDeLignesss: null,
    };
  },
  methods:{
    async getNombreDeLignes() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          "https://localhost:7283/api/Proposition/nombre-de-lignes",
          {
            params: { email: user.email },
          }
        );
        this.nombreDeLignes = response.data;
    // Forcer la mise à jour du composant
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async getNombreDeLignes2() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          "https://localhost:7283/api/Reclamation/nombre-de-lignes",
          {
            params: { email: user.email },
          }
        );
        this.nombreDeLigness = response.data;
        // Forcer la mise à jour du composant
      } catch (error) {
        console.error(error);
      } 
    },
    async getNombreDeLignes3() {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          "https://localhost:7283/api/RendezVous/nombre-de-lignes",
          {
            params: { email: user.email },
          }
        );
        this.nombreDeLignesss = response.data;
        // Forcer la mise à jour du composant
      } catch (error) {
        console.error(error);
      } 
    },
  },
  created() {
    this.getNombreDeLignes();
    this.getNombreDeLignes2();
    this.getNombreDeLignes3();
  },
  mounted() {
    this.getNombreDeLignes();
    this.getNombreDeLignes2();
    this.getNombreDeLignes3();
    // Get the user data from localStorage
    const userData = localStorage.getItem("user");

    // Parse the JSON string to an object
    this.user = JSON.parse(userData);
    if (!localStorage.getItem("user")) {
      window.location.href = "/login";
    }
  },
};
</script>
<style scoped>



/*
.card {
  margin: 30px auto;
  width: 300px;
  height: 300px;
  border-radius: 40px;
  background-image: url('https://i.redd.it/b3esnz5ra34y.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-repeat: no-repeat;
box-shadow: 5px 5px 30px 7px rgba(0,0,0,0.25), -5px -5px 30px 7px rgba(0,0,0,0.22);
  transition: 0.4s;
}
*/
.top-panel {
  padding: 20px;
  margin: 0 auto;
  text-align: center;
  width: 95%;
}
 .prenom-nom {
    color: #000000;
    font-size: 1.2rem;
    text-transform: capitalize;
  }
.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
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

body {
  padding: 20px;
  font: 16px/22px "Open Sans", sans-serif;
}
.container {
  margin: 20 auto;
  max-width: 980px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
 

}

.panel {
  margin-left: 50px;
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  width: 160px;
  height: 160px;
  margin-top: 20px !important;
  font-weight: 200;
  color: #fff;
  overflow: hidden;
  border-radius: 8px;
  
}

.panel h4 {
  display: flex;
  flex-direction: column;
  
  align-items: center;
  position: relative;
  padding: 12px 25px 25px 25px;
  margin-left: 2px;
  color: #fff;
  text-decoration: none;
  font-size: 17.5px;
  z-index: 2;
  
  justify-content: flex-end;
  align-items: center;
}
.panel h4 v-icon {
  margin-right: 10px;
}
.panel h4 span {
  display: block;
  font-size: 70px;
  font-weight: 700;
  line-height: 96px;
}

.panel:after {
  position: absolute;
  font-family: FontAwesome;
  color: #000000;
  z-index: 1;
  transition: all 0.5s;
  line-height: normal;
}

.panel.post {
  background-color: #b8aa0e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 10.5px;
}

.panel.post:after {
  content: "";
  background-size: cover;
  background-position: center;
  font-size: 80px;
  color: #a5980d;
  top: 45px;
  left: 80px;
  transform: rotate(45deg);
}

.panel.post:hover:after {
  top: 8px;
}

.panel.page {
  background-color: #279824;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 17.5px;
}

.panel.page:after {
  content: "";
  font-size: 80px;
  color: #238820;
  right: 39px;
}

.panel.page:hover:after {
  top: 24px;
}

.panel.user {
  background-color: #fc1c3e;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 17.5px;
}

.panel.user:after {
  content: "";
  font-size: 80px;
  color: #ec0326;
  top: 45px;
  right: 35px;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.panel.user:hover:after {
  top: 7px;
  transform: rotate(90deg);
  opacity: 0.3;
}

.panel:hover:after {
  transition: all 0.5s;
  transform: scale(1.1);
  opacity: 0;
}

.panel:hover a {
  color: #000;
}

.panel:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

</style>