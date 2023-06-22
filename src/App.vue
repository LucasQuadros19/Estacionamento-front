<template>  
  
<Headers/>
  <router-view/>
</template>
<script>
import { defineComponent } from 'vue';
import Headers from '../src/components/Header.vue';

export default defineComponent({
  components: {
    Headers,
  },
  setup() {
    
  }
});
</script>




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
  color: #000000;
}



</style>
