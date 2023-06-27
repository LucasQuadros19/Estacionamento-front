<template>
  <div class="container" style="background:;">
    <div class="row">
      <div class="col-md-10 text-start">
        <p class="fs-3">Veículo</p>
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
          <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="veiculo.ativo">
        </div>
        <label class="form-label">Nome do Veículo *</label>
        <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="veiculo.nome">
        <label class="form-label">Placa *</label>
        <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="veiculo.placa">
        
        <label class="form-label">Modelo *</label>
        <select class="form-select" v-model="veiculo.modelo">
          <option v-for="item in List" :key="item.id" :value="item">{{item.nome+"-"+item.marca.nome}}</option>
          </select>
        <label class="form-label">Cor *</label> 
        <select class="form-select" v-model="veiculo.cor">
          <option v-for="cor in cores" :key="cor" :value="cor">{{ cor }}</option>
        </select>
        <label class="form-label">Tipo *</label>
        <select class="form-select" v-model="veiculo.tipo">
          <option v-for="tipo in tipos" :key="tipo" :value="tipo">{{ tipo }}</option>
        </select>
        <label class="form-label">Ano*</label>
        <input type="text" :disabled="form === 'excluir' ? disabled : false" class="form-control" v-model="veiculo.ano">
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 offset-md-6">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-info" to="/veiculo/listar">Voltar</router-link>
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
import VeiculosClient from '@/client/Veiculos.client';
import ModeloClient from '@/client/Modelo.client';
import { VeiculosModel } from '@/model/VeiculoModel';
import { Cor } from '@/model/Cor';
import { Tipo } from '@/model/Tipo';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VeiculoFormulario',
  data() {
    return {
      veiculo: new VeiculosModel(),
      List: [],
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
    },
    cores() {
      return Object.values(Cor);
    },
    tipos() {
      return Object.values(Tipo);
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
      VeiculosClient.cadastrar(this.veiculo)
        .then(success => {
          this.veiculo = new VeiculosModel();
          this.mensagem.ativo = true;
          this.mensagem.mensagem = success;
          this.mensagem.titulo = "Parabéns. ";
          this.mensagem.css = "alert alert-success alert-dismissible fade show";
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
    findById(id: number) {
      VeiculosClient.findById(id)
        .then(success => {
          this.veiculo = success;
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = "Erro. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
    onClickEditar() {
      if (this.veiculo.id) {
        VeiculosClient.editar(this.veiculo.id, this.veiculo)
          .then(success => {
            this.veiculo = new VeiculosModel();
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
        console.error("ID do veículo indefinido. Não é possível editar.");
      }
    },
    onClickExcluir() {
      if (this.veiculo.id) {
        VeiculosClient.excluir(this.veiculo.id)
          .then(success => {
            this.veiculo = new VeiculosModel();
            this.$router.push({ name: 'veiculo-lista-view' });
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = "Erro. ";
            this.mensagem.css = "alert alert-danger alert-dismissible fade show";
          });
      } else {
        console.error("ID do veículo indefinido. Não é possível excluir.");
      }
    },
    Listar() {
      ModeloClient.listaAll()
        .then(success => {
          this.List = success;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});
</script>
