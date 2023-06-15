<template>
<Headers/>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Anuncio from '../components/Anuncio.vue';
import Headers from '../components/Header.vue'


@Options({
  components: {
    HelloWorld,
     components:{
       Anuncio,
       Headers,
       

     }
  },
})
export default class HomeView extends Vue {
  isDarkTheme = false;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }
}
</script>

<style lang="scss">
</style>
