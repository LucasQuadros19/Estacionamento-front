<template>
  <div class="container" style="background:;">
    <div class="row">
      <div class="col-md-10 text-start">
        <p class="fs-3">Condutor</p>
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
    <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="condutor.ativo">
  </div>
        <label class="form-label">Nome do Condutor *</label>
        <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="condutor.nome">
        <label class="form-label">Cpf*</label>
        <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="condutor.cpf">
        <label class="form-label">Telefone*</label>
        <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="condutor.telefone">
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 offset-md-6">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-info" to="/condutor/listar">Voltar</router-link>
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
import CondutorClient from '@/client/Condutor.client';
import { CondutorModel } from '@/model/CondutorModel';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CondutorFormulario',
  data() {
    return {
      condutor: new CondutorModel(),
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
      CondutorClient.cadastrar(this.condutor)
        .then(success => {
          this.condutor = new CondutorModel();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = success;
          this.mensagem.titulo = "Parabéns. ";
          this.mensagem.css = "alert alert-success alert-dismissible fade show";
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error.data;
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
    findById(id: number) {
      CondutorClient.findById(id)
        .then(success => {
          this.condutor = success;
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = "Erro. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
    onClickEditar() {
      if (this.condutor.id) {
        CondutorClient.editar(this.condutor.id, this.condutor)
          .then(success => {
            this.condutor = new CondutorModel();
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
        console.error("ID do condutor indefinido. Não é possível editar.");
      }
    },
    onClickExcluir() {
      if (this.condutor.id) {
        CondutorClient.excluir(this.condutor.id)
          .then(success => {
            this.condutor = new CondutorModel();
            this.$router.push({ name: 'condutor-lista-view' });
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = "Erro. ";
            this.mensagem.css = "alert alert-danger alert-dismissible fade show";
          });
      } else {
        console.error("ID do condutor indefinido. Não é possível excluir.");
      }
    }
  }
});
</script>
