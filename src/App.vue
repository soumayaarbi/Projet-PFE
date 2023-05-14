<template>
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-YF/GGyG2GkvY6oZgNjpXnJmCTJPO/Y4JowvSKH6VnG9bg/qIq5c0uJ9mIKXQ/c7g0pP4QWnxtpSXPhK4u3D8pQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <v-app>
    <v-main>
      <!-- <Navbar /> -->
      <router-view />
    </v-main>
  </v-app>
</template>
<script>

export default {
  name: 'App',
  components :{
    
   
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}



nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
