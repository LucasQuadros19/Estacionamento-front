<template>
  <div class="container" style="background:;">
    <div class="row">
      <div class="col-md-10 text-start">
        <p class="fs-3">Cadastrar de Marca</p>
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
  <div v-if="form === 'editar'">
    <label class="form-label">Ativo *</label>
    <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="marca.ativo">
  </div>

  <label class="form-label">Nome da Marca *</label>
  <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="marca.nome">
</div>




      
    </div>

    <div class="row">
      <div class="col-md-3 offset-md-6">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-info" to="/marca/lista">Voltar</router-link>
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
import MarcaClient from '@/client/Marca.client';
import { MarcaModel } from '@/model/MarcaModel';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MarcaFormulario',
  data() {
    return {
      marca: new MarcaModel(),
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
      MarcaClient.cadastrar(this.marca)
        .then(success => {
          this.marca = new MarcaModel();
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
      MarcaClient.findById(id)
        .then(success => {
          this.marca = success;
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = "Erro. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
    onClickEditar() {
  if (this.marca.id) {
    MarcaClient.editar(this.marca.id, this.marca)
      .then(success => {
        this.marca = new MarcaModel();
        this.mensagem.ativo = true;
        this.mensagem.mensagem = success;
        this.mensagem.titulo = "Parabéns. ";
        this.mensagem.css = "alert alert-success alert-dismissible fade show";
      })
      .catch(error => {
        this.mensagem.ativo = true;
        this.mensagem.mensagem = error;
        this.mensagem.titulo = "Erro. ";
        this.mensagem.css = "alert alert-danger alert-dismissible fade show";
      });
  } else {
    console.error("ID da marca indefinido. Não é possível editar.");
  }
},
    onClickExcluir() {
  if (this.marca.id) {
    MarcaClient.excluir(this.marca.id)
      .then(success => {
        this.marca = new MarcaModel();
        this.$router.push({ name: 'marca-lista-view' });
      })
      .catch(error => {
        this.mensagem.ativo = true;
        this.mensagem.mensagem = error;
        this.mensagem.titulo = "Erro. ";
        this.mensagem.css = "alert alert-danger alert-dismissible fade show";
      });
  } else {
    console.error("ID da marca indefinido. Não é possível excluir.");
  }
    }
  }
});
</script>
