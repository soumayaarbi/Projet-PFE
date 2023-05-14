<template>
    <router-view>
    <nav class="navbar navbar-expand-lg" style="background-color:white; height: 100px;">
   
<div class="container-fluid">
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
    <v-img
    style="padding-top: 0px;"
  :width="100"
  :height="90"
  src="../assets/image.png"
  :aspect-ratio="1"
></v-img>
  <router-link to="/" class="navbar-brand">
    <a class="navbar-brand" href="#" style="color:black;"><div class="two"><h1 >Espace Citoyen<br><span>Commune De Tunis</span></h1></div></a><br><br>
  </router-link>
    <form method="get" action="/search" id="searchbox5">
      <input id="search51" name="q" type="text" size="40" placeholder="Chercher..." />
  </form>
    <ul style="size:30px; margin-left: 270px;" class="navbar-nav me-auto mb-2 mb-lg-0">
        <!--<li>
      <router-link to="/"  style="text-decoration: none;">
        <a class="links" aria-current="page" >Gouvernorat</a></router-link> </li>
        <li>
        <router-link to="/" class="links">
        <a class="links" aria-current="page" >Réalisation</a></router-link></li>
        <li> 
        <router-link to="/"  style="text-decoration: none;">
        <a class="links" aria-current="page" >Etablissement</a></router-link></li>
        <li> 
        <router-link to="/" style="text-decoration: none;">
        <a class="links" aria-current="page" >E-Services</a></router-link></li>-->
      <li style="margin-left:20px;"><svg xmlns="http://www.w3.org/2000/svg" width="17" height="29" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
</svg></li>
     <li>
        <router-link to="/login"  style="text-decoration: none;">
        <a class="links" aria-current="page" >Se connecter</a></router-link>
    </li>
    </ul>
  </div>
</div>
</nav>
<br>
<nav >

<ul class="menu">

  <li><a href="#" style="text-decoration: none;">Accueil</a></li>

  <li>
    <a href="#" style="text-decoration: none;">Gouvernorat</a>

    <ul class="sub-menu">
      <li><a href="#" style="font-size: 15px;text-decoration: none;">Présentation de la ville </a></li>
      <li><a href="#" style="font-size: 15px;text-decoration: none;">Histoire de la ville </a></li>
      
</ul>
       
  </li>
  <li>
    <a href="#" style="text-decoration: none;">Réalisation</a>

    <ul class="sub-menu">
      <li><a href="#">Level One</a></li>
      <li>
        <a href="#">Level One</a>

        <ul class="sub-menu">
          <li><a href="#">Level two</a></li>
          <li>
            <a href="#">Level two</a>

            <ul class="sub-menu" >
              <li><a href="#" style="text-decoration: none;">Level three</a></li>
              <li><a href="#">Level three</a></li>
              <li><a href="#">Level three</a></li>
              <li><a href="#">Level three</a></li>
            </ul>

          </li>
          <li><a href="#">Level two</a></li>
          <li><a href="#">Level two</a></li>
        </ul>

      </li>
      <li><a href="#">Level One</a></li>
      <li><a href="#">Level One</a></li>
    </ul>
  </li>
  <li>
    <a href="#" style="text-decoration: none;">Etablissement</a>

    <ul class="sub-menu">
      <li><a href="#">Level One</a></li>
      <li>
        <a href="#">Level One</a>

        <ul class="sub-menu">
          <li><a href="#">Level two</a></li>
          <li>
            <a href="#">Level two</a>

            <ul class="sub-menu" >
              <li><a href="#" style="text-decoration: none;">Level three</a></li>
              <li><a href="#">Level three</a></li>
              <li><a href="#">Level three</a></li>
              <li><a href="#">Level three</a></li>
            </ul>

          </li>
          <li><a href="#">Level two</a></li>
          <li><a href="#">Level two</a></li>
        </ul>

      </li>
      <li><a href="#">Level One</a></li>
      <li><a href="#">Level One</a></li>
    </ul>
  </li>
  <li>
    <a href="#" style="text-decoration: none;">E-services</a>

    <ul class="sub-menu">
      <li><a href="#" style="font-size: 15px;text-decoration: none;">Déposer une réclamation</a></li>
      <li><a href="#" style="font-size: 15px;text-decoration: none;">Déposer une proposition</a> </li>
      <li><a href="#" style="font-size: 15px;text-decoration: none;">Prendre un rendez-vous</a> </li>
    </ul>
  </li>
  
</ul>
</nav>
<br>

</router-view>
</template>
<style>
.site-nav {
    padding: 100px 200px;
    background-color: white;
}

.menu {
    list-style: none;
    padding-left: 1px;
 
  
}
.menu a {
    padding: 10px 10px;
    display: block;
    position: relative;
}
.menu li > a:not(:only-child) {
    padding-right: 20px;
}
.menu li > a:not(:only-child)::after {
    text-decoration: none;
  content: ' ⌵';
    transform: translateY(-50%);
    position: absolute;
    right: 5px;
    top: 54%;
}

.menu a:hover,
.menu li:hover > a {
    background-color: rgba(0,0,0,0.1);
}
.menu ul {
    padding-left: 0;
    list-style: none;
}
.menu li {
    position: relative;
}
.menu li:hover > .sub-menu {
    display: block;
}
.menu .sub-menu {
    background-color: #fff;
    display: none;
}


@media (min-width: 768px) {    
    .menu > li {
        display: inline-block;
    }
    .menu li:hover > .sub-menu {
        opacity: 1;
        visibility: visible;
        transform: scaleY(1);
    }
    .menu .sub-menu {
        min-width: 200px;
        display: block;
        opacity: 0;
        visibility: hidden;
        box-shadow: 0 0 10px rgba(0,0,0,0.15);
        transition: all 0.2s ease-in;
        transform: scaleY(.5);
        transform-origin: top;
        position: absolute;
        left: 0;
        top: 100%;
    }
   
    .menu li li .sub-menu {
        top: 0;
        left: 100%;
    }
    .menu li li .sub-menu {
        top: 0;
        left: 100%;
    }
            
}




* {
    margin: 0;
    box-sizing: border-box;
}

*::before,
*::after {
    box-sizing: border-box;
}

a {
    text-decoration: none;
}
.two h1 {
  margin-top: 70px;
  text-transform: capitalize;
  font-size: 30px;
}
.two h1:before {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 60px;
  height: 2px;
  content: "";

}

.two h1 span {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 4px;
  line-height: 3em;
  padding-left: 0.25em;
  color: rgba(0, 0, 0, 0.4);
  padding-bottom: 50px;
  margin-left: 20px;

}

#search51{
    background: url(data:image/png;base64,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) no-repeat 10px 6px #fcfcfc;
    border:1px solid #d1d1d1;
    font: bold 12px Arial, Helvetica, Sans-serif;
    color:#bebebe;
    width:250px;
    padding:6px 15px 6px 35px;
    border-radius:20px;
    text-shadow:0 2px 3px rgba(0,0,0,0.1);
    box-shadow:0 1px 3px rgba(0,0,0,0.15) inset;
    margin-left: 400px;
    height: 30px;
}

#search51:focus{
    width:200px;
    outline:0;
}

.byline p{
  text-align:center;
  color:#c6c6c6;
  font: bold 18px Arial, Helvetica, Sans-serif;
  text-shadow: 0 2px 3px rgba(0,0,0,0.1);
}

.byline p a{
  color:#000;
  text-decoration:none;}
  .links{
    text-decoration: none;
    letter-spacing: 0.5px;
    color:#000;
     padding: 0 10px;
     height: 0px;
  }
  .links:after{
    content:"";
    background-color: blue;
    height : 5px;
    width:0;
    left: 0;
    bottom : -10px;
    transition: 0.3s;
  }
  .links:hover{
    color:darkblue;
  }
  .links:hover:after{
    width:100%;
  }
  .site-nav {
    padding: 100px 200px;
    background-color: white;
}

.menu {
    list-style: none;
    padding-left: 1px;
   
  
}
.menu a {
    padding: 10px 10px;
    display: block;
    position: relative;
}
.menu li > a:not(:only-child) {
    padding-right: 20px;
}
.menu li > a:not(:only-child)::after {
    text-decoration: none;
  content: ' ⌵';
    transform: translateY(-50%);
    position: absolute;
    right: 5px;
    top: 54%;
}

.menu a:hover,
.menu li:hover > a {
    background-color: rgba(0,0,0,0.1);
}
.menu ul {
    padding-left: 0;
    list-style: none;
}
.menu li {
    position: relative;
}
.menu li:hover > .sub-menu {
    display: block;
}
.menu .sub-menu {
    background-color: #fff;
    display: none;
}


@media (min-width: 768px) {    
    .menu > li {
        display: inline-block;
    }
    .menu li:hover > .sub-menu {
        opacity: 1;
        visibility: visible;
        transform: scaleY(1);
    }
    .menu .sub-menu {
        min-width: 200px;
        display: block;
        opacity: 0;
        visibility: hidden;
        box-shadow: 0 0 10px rgba(0,0,0,0.15);
        transition: all 0.2s ease-in;
        transform: scaleY(.5);
        transform-origin: top;
        position: absolute;
        left: 0;
        top: 100%;
    }
    .menu li li .sub-menu {
        top: 0;
        left: 100%;
    }
    .menu li li .sub-menu {
        top: 0;
        left: 100%;
    }
            
}




* {
    margin: 0;
    box-sizing: border-box;
}

*::before,
*::after {
    box-sizing: border-box;
}

a {
    text-decoration: none;
}


</style>
<script >
    export default {
      data: () => ({
        links: [
          'Se connecter',],
          items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
        
      }),
    }
  </script>
