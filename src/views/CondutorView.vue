<template>
  <div>
    <h2>Lista de Condutores</h2>
    <ul>
      <li v-for="condutor in condutores" :key="condutor.id">
        <h1 class="core"> ID: {{ condutor.id }}</h1><br>
        Cadastro: {{ condutor.cadastro }}<br>
        Edição: {{ condutor.edicao }}<br>
        Ativo: {{ condutor.ativo }}<br>
        Nome: {{ condutor.nome }}<br>
        CPF: {{ condutor.cpf }}<br>
        Telefone: {{ condutor.telefone }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { CondutorClient } from '../client/Condutor.client';

export default defineComponent({
  data() {
    return {
      condutores: [],
    };
  },
  mounted() {
    this.carregarCondutores();
  },
  methods: {
    async carregarCondutores() {
      try {
        const client = new CondutorClient();
        this.condutores = await client.findByAll();
      } catch (error) {
        console.error('Erro ao carregar os condutores:', error);
      }
    },
  },
});
</script>
<style scoped lang="scss">
.core{
  color: red;
}

</style>

