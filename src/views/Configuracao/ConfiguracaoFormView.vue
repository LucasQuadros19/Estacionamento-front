<template>
    <div class="container" style="background:;">
      <div class="row">
        <div class="col-md-10 text-start">
          <p class="fs-3">Cadastrar de configuracao</p>
        </div>
        <div class="col-md-2"></div>
      </div>
  
      <hr />
  
      <div v-if="mensagem.ativo" class="row">
        <div class="col-md-12 text-start">
          <div :class="mensagem.css" role="alert">
            <strong>{{ mensagem.titulo }}</strong> {{ mensagem.mensagem }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
      </div>
  
      <div class="row">
        <div class="col-md-12 text-start">
          <label class="form-label">Valor Hora *</label>
          <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="configuracao.valorHora">
          <label class="form-label">inicio *</label>
          <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="configuracao.inicioExpediente">
          <label class="form-label">Fim *</label>
          <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="configuracao.fimExpediente">
          <label class="form-label">Tempo para desconto *</label>
          <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="configuracao.tempoParaDesconto">
          <label class="form-label">Tempo de desconto *</label>
          <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="configuracao.tempoDeDesconto">
          <label class="form-label">Vaga Moto *</label>
          <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="configuracao.vagasMoto">
          <label class="form-label">Vaga Carro *</label>
          <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="configuracao.vagasCarro">
          <label class="form-label">Vaga Vam *</label>
          <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="configuracao.vagasVam">
       
        </div>
      </div>
  
      <div class="row">
        <div class="col-md-3 offset-md-6">
          <div class="d-grid gap-2">
            <router-link type="button" class="btn btn-info" to="/configuracao/lista">Voltar</router-link>
          </div>
        </div>
        <div class="col-md-3">
          <div class="d-grid gap-2">
            <button v-if="form === undefined" type="button" class="btn btn-success" @click="onClickCadastrar()">Cadastrar</button>
            <button v-if="form === 'editar'" type="button" class="btn btn-warning" @click="onClickEditar()">Editar</button>
            <button v-if="form === 'excluir'" type="button" class="btn btn-danger" @click="onClickExcluir()">Excluir</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import ConfiguracaoClient from '@/client/Configuracao.client';
  import { ConfiguracaoModel } from '@/model/ConfiguracaoModel';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Formulario',
    data() {
      return {
        configuracao: new ConfiguracaoModel(),
        mensagem: {
          ativo: false,
          titulo: "",
          mensagem: "",
          css: ""
        },
        disabled: false
      };
    },
    computed: {
      id() {
        return this.$route.query.id;
      },
      form() {
        return this.$route.query.form;
      }
    },
    mounted() {
      if (this.id !== undefined) {
        this.findById(Number(this.id));
      }
    },
    methods: {
      onClickCadastrar() {
        ConfiguracaoClient.cadastrar(this.configuracao)
          .then(success => {
            this.configuracao = new ConfiguracaoModel();
            this.mensagem.ativo = true;
            this.mensagem.mensagem = success;
            this.mensagem.titulo = "Parabéns. ";
            this.mensagem.css = "alert alert-success alert-dismissible fade show";
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.titulo = "Erro. ";
            this.mensagem.css = "alert alert-danger alert-dismissible fade show";
          });
      },



      
      findById(id: number) {
        ConfiguracaoClient.findById(id)
          .then(success => {
            this.configuracao = success;
          })
          .catch(error => {
            this.mensagem.titulo = "Erro. ";
            this.mensagem.css = "alert alert-danger alert-dismissible fade show";
          });
          
      },
      onClickEditar() {
    if (this.configuracao.id) {
      ConfiguracaoClient.editar(this.configuracao.id, this.configuracao)
        .then(success => {
          this.configuracao = new ConfiguracaoModel();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = success;
          this.mensagem.titulo = "Parabéns. ";
          this.mensagem.css = "alert alert-success alert-dismissible fade show";
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.titulo = "Erro. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    } else {
      console.error("ID da configuracao indefinido. Não é possível editar.");
    }
  },
      onClickExcluir() {
    if (this.configuracao.id) {
      ConfiguracaoClient.excluir(this.configuracao.id)
        .then(success => {
          this.configuracao = new ConfiguracaoModel();
          this.$router.push({ name: 'configuracao-lista-view' });
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.titulo = "Erro. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    } else {
      console.error("ID da configuracao indefinido. Não é possível excluir.");
    }
      }
    }
  });
  </script>
  