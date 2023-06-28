<template>
  <div>
    <div class="row">
      <div class="col-md-3 offset-md-6"></div>
      <div class="row">
        <div class="col-md-9 text-start">
          <p class="fs-3">Lista de Configuracoes</p>
        </div>
        <div class="col-md-2">
          <div class="d-grid gap-2">
            <router-link
              v-if="configuracaoList.length === 0"
              type="button"
              class="btn btn-success"
              to="/configuracao/formulario"
            >
              Cadastrar
            </router-link>
            <router-link
  v-for="configuracao in configuracaoList"
  :key="configuracao.id"
  type="button"
  class="btn btn-sm btn-warning"
  :to="{
    name: 'configuracao-formulario-view',
    query: { id: configuracao.id, form: 'editar' }
  }"
>
  Editar
</router-link>

          </div>
        </div>
      </div>
    </div>
    <div v-for="configuracao in configuracaoList" :key="configuracao.id">
      <p>Valor da Hora: {{ configuracao.valorHora }}</p>
      <p>Início do Expediente: {{ configuracao.inicioExpediente }}</p>
      <p>Fim do Expediente: {{ configuracao.fimExpediente }}</p>
      <p>Tempo para Desconto: {{ configuracao.tempoParaDesconto }}</p>
      <p>Tempo do Desconto: {{ configuracao.tempoDeDesconto }}</p>
      <p>Gerar Desconto: {{ configuracao.gerarDesconto }}</p>
      <p>Vagas para Moto: {{ configuracao.vagasMoto }}</p>
      <p>Vagas para Carro: {{ configuracao.vagasCarro }}</p>
      <p>Vagas para Van: {{ configuracao.vagasVam }}</p>
      <hr>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ConfiguracaoModel } from '@/model/ConfiguracaoModel';
import ConfiguracaoClient from '@/client/Configuracao.client';

export default defineComponent({
  name: 'ConfiguracaoLista',
  data() {
    return {
      configuracaoList: [] as ConfiguracaoModel[],
    };
  },
  mounted() {
    this.findAll();
  },
  methods: {
    findAll() {
      ConfiguracaoClient.listaAll()
        .then(success => {
          this.configuracaoList = success;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
});
</script>
