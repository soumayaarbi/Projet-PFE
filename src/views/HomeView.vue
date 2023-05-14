<template>
    <HeaderApp></HeaderApp>
 
 <router-view/>
    <v-carousel show-arrows="hover" style="height: 350px;">
  <v-carousel-item
    src="../assets/mt-1-hd_0.jpg"
    cover
  >
</v-carousel-item>

  <v-carousel-item
    src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
    cover
  ></v-carousel-item>

  <v-carousel-item
    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
    cover
  ></v-carousel-item>
</v-carousel>
    <body>
<div class="app-panel">

    <div class="left-panel text">
        <v-expansion-panels variant="popout" class="my-4">
                <v-expansion-panel>
                <v-expansion-panel-title>Commune</v-expansion-panel-title>
                <v-expansion-panel-text>
                     Some content
                </v-expansion-panel-text>
                </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>Les Finances</v-expansion-panel-title>
        <v-expansion-panel-text>
          Some content
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>Marché Public</v-expansion-panel-title>
        <v-expansion-panel-text>
          Some content
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title>Papiers Administratifs</v-expansion-panel-title>
        <v-expansion-panel-text>
          Some content
        </v-expansion-panel-text>
      </v-expansion-panel>
             </v-expansion-panels>
             <br>
             <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Chifres</div>
    </v-card-text>
  </v-card>
    </div>
    
    <div class="center-panel text">
        
    </div>
    
    <div class="right-panel text">
        <br>
        <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
       
      <div>Evénements</div>
    </v-card-text>
  </v-card>
  </div>
  </div>
</body>

</template>
<style>
body {
  margin: 0;
  box-sizing: border-box;
}

.app-panel {

  display: grid;
  grid-template-columns: 20vw 60vw 20vw;
  grid-template-rows: 8vh 84vh 8vh;
  grid-template-areas:
    
    "left-panel     center-panel   right-panel"
    "bottom-panel   bottom-panel   bottom-panel";
}


.left-panel {
  grid-area: left-panel;
  background-color:white;

}

.center-panel {
  grid-area: center-panel;
  background-color:white;

}

.right-panel {
  grid-area: right-panel;
  background-color:white;

}



.text {
  font-family: sans-serif;
  font-weight: 300;
  font-size: 1em;
  line-height: 1.5em;
  color: #aaa;
  padding: 1em;
}


</style>
<script>
import HeaderApp from '@/components/HeaderApp.vue';
export default {

  components :{
    HeaderApp,
   
  }}
</script>