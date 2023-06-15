<template>
  <div>
    <Anuncio />
    <Componente2 />
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";
import Anuncio from "../components/Anuncio.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    Anuncio,
  },
});
</script>

<style lang="scss"></style>
