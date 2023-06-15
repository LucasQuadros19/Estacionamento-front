<template>  
  
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
     <router-link to="/condutor/listar">Condutor</router-link> 
  </nav>
  <router-view/>

</template>


<style lang="scss">
// Variable overrides first
$primary: #900;
$enable-shadows: true;
$prefix: "mo-";

// Then import Bootstrap
@import "../node_modules/bootstrap/scss/bootstrap";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #151618;
   text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
    }
   
  }
}
</style>
