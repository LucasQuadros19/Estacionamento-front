<template>
  <div class="container" style="background:;">
    <div class="row">
      <div class="col-md-10 text-start">
        <p class="fs-3">Cadastrar de Movimentação</p>
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
    <label class="form-label">Veiculo *</label>
        <select class="form-select" v-model="movimentacao.veiculo">
          <option v-for="item in List" :key="item.id" :value="item">{{"("+item.placa+")   "+item.modelo.nome+"-"+item.modelo.marca.nome}}</option>
          </select>
          
          <label class="form-label">Condutor *</label>
        <select class="form-select" v-model="movimentacao.condutor">
          <option v-for="cond in condutorList" :key="cond.id" :value="cond">{{cond.nome}}</option>
          </select>
    

    <div class="row">
      <div class="col-md-3 offset-md-6">
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-info" to="/movimentacao/listar">Voltar</router-link>
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
import VeiculosClient from '@/client/Veiculos.client';
import MovimentacaoClient from '@/client/Movimentacao.client';
import { MovimentacaoModel } from '@/model/MovimentacaoModel';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MovimentacaoFormulario',
  data() {
    return {
      movimentacao: new MovimentacaoModel(),
      List: [],
     condutorList: [],
      mensagem: {
        ativo: false,
        titulo: "",
        mensagem: "",
        css: ""
      }
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
    this.condutorListar();
  },
  methods: {
    onClickCadastrar() {
      MovimentacaoClient.cadastrar(this.movimentacao)
        .then(success => {
          this.movimentacao = new MovimentacaoModel();
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
      MovimentacaoClient.findById(id)
        .then(success => {
          this.movimentacao = success;
        })
        .catch(error => {
          this.mensagem.ativo = true;
          this.mensagem.mensagem = error;
          this.mensagem.titulo = "Erro. ";
          this.mensagem.css = "alert alert-danger alert-dismissible fade show";
        });
    },
    onClickEditar() {
      if (this.movimentacao.id) {
        MovimentacaoClient.editar(this.movimentacao.id, this.movimentacao)
          .then(success => {
            this.movimentacao = new MovimentacaoModel();
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
        console.error("ID da movimentação indefinido. Não é possível editar.");
      }
    },
    onClickExcluir() {
      if (this.movimentacao.id) {
        MovimentacaoClient.excluir(this.movimentacao.id)
          .then(success => {
            this.movimentacao = new MovimentacaoModel();
            this.$router.push({ name: 'movimentacao-lista-view' });
          })
          .catch(error => {
            this.mensagem.ativo = true;
            this.mensagem.mensagem = error;
            this.mensagem.titulo = "Erro. ";
            this.mensagem.css = "alert alert-danger alert-dismissible fade show";
          });
      } else {
        console.error("ID da movimentação indefinido. Não é possível excluir.");
      }
    },
    Listar() {
      VeiculosClient.listaAll()
        .then(success => {
          this.List = success;
        })
        .catch(error => {
          console.log(error);
        });
    },
    condutorListar() {
      CondutorClient.listaAll()
        .then(success => {
          this.condutorList = success;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});
</script>
