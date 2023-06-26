<template>
  <div class="container" style="background:;">
    <div class="row">
      <div class="col-md-10 text-start">
        <p class="fs-3">Cadastrar de Modelo</p>
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
    <select class="form-select" v-model="modelo.marca">
            <option v-for="item in List" :key="item.id" :value="item">{{item.nome}}</option>
        </select>     

    <div class="row">
      <div class="col-md-12 text-start">
        <label class="form-label">Nome do Modelo *</label>
        <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="modelo.nome">
        </div>
    </div>

    <div class="row">
      <div class="col-md-3 offset-md-6">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-info" to="/modelo/listar">Voltar</router-link>
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
import ModeloClient from '@/client/Modelo.client';
import MarcaClient from '@/client/Marca.client';
import { ModeloModel } from '@/model/ModeloModel';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModeloFormulario',
  data() {
    return {
      modelo: new ModeloModel(),
      List:[],
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
    this.Listar();
  },
  methods: {
    onClickCadastrar() {
      ModeloClient.cadastrar(this.modelo)
        .then(success => {
          this.modelo = new ModeloModel();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = success;
          this.mensagem.titulo = "Parabéns. ";
          this.mensagem.css = "alert alert-success alert-dismissible fade show";
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error.data;
          this.mensagem.titulo = "Erro. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
    findById(id: number) {
      ModeloClient.findById(id)
        .then(success => {
          this.modelo = success;
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = "Erro. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
    onClickEditar() {
      if (this.modelo.id) {
        ModeloClient.editar(this.modelo.id, this.modelo)
          .then(success => {
            this.modelo = new ModeloModel();
            this.mensagem.ativo = true;
            this.mensagem.mensagem = success;
            this.mensagem.titulo = "Parabéns. ";
            this.mensagem.css = "alert alert-success alert-dismissible fade show";
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error.data;
            this.mensagem.titulo = "Erro. ";
            this.mensagem.css = "alert alert-danger alert-dismissible fade show";
          });
      } else {
        console.error("ID do modelo indefinido. Não é possível editar.");
      }
    },
    onClickExcluir() {
      if (this.modelo.id) {
        ModeloClient.excluir(this.modelo.id)
          .then(success => {
            this.modelo = new ModeloModel();
            this.$router.push({ name: 'modelo-lista-view' });
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = "Erro. ";
            this.mensagem.css = "alert alert-danger alert-dismissible fade show";
          });
      } else {
        console.error("ID do modelo indefinido. Não é possível excluir.");
      }
    },
    Listar(){
      MarcaClient.listaAll()
      .then(success => {
        this.List=success
    })
    .catch(error =>{
      console.log(error);
    });
  },
  }
});
</script>
