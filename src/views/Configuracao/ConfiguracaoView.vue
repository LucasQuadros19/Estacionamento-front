<template>

  <div class="container" style="margin-top: 10px;">

    <div class="row">
      <div class="col-md-10 text-start"> <p class="fs-3"> Lista de configuracao
         </p> </div>
      <div class="col-md-2"> 
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-success" 
            to="/marca/formulario">Cadastrar
          </router-link>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">  
        <table class="table">
          <thead class="table-secondary" >
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Ativo</th>
              <th scope="col" class="text-end">valorHora</th>
              <th scope="col" class="text-end">valorMinutoMulta</th>
              <th scope="col" class="text-end">inicioExpediente</th>
              <th scope="col" class="text-end">fimExpediente</th>
              <th scope="col" class="text-end">tempoParaDesconto</th>
              <th scope="col" class="text-end">tempoDesconto</th>
              <th scope="col" class="text-end">gerarDesconto</th>
              <th scope="col" class="text-end">vagaMoto</th>
              <th scope="col" class="text-end">vagaCarro</th>
              <th scope="col" class="text-end">vagaVan</th>

              <th scope="col">Opção</th>
            </tr>
          </thead>  
          <tbody class="table-group-divider">
            
            <tr v-for="item in List" :key="item.id">
              <th class="col-md-1">{{ item.id }}</th>
              <th class="col-md-2"> 
                <span v-if="item.ativo" class="badge text-bg-success"> Ativo </span>
                <span v-if="!item.ativo" class="badge text-bg-danger"> Inativo </span>
              </th>
              <th class="text-start">{{ item.valorHora }}</th>
              <th class="text-start">{{ item.valorMinutoMulta }}</th>
              <th class="text-start">{{ item.inicioExpediente }}</th>
              <th class="text-start">{{ item.fimExpediente }}</th>
              <th class="text-start">{{ item.tempoParaDesconto }}</th>
              <th class="text-start">{{ item.tempoDesconto }}</th>
              <th class="text-start">{{ item.gerarDesconto }}</th>
              <th class="text-start">{{ item.vagaMoto }}</th>
              <th class="text-start">{{ item.vagaCarro }}</th>
              <th class="text-start">{{ item.vagaVan }}</th>
              <th class="col-md-2">
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                  <router-link type="button" class="btn btn-sm btn-warning" 
                      :to="{ name: 'marca-formulario-editar-view', query: { id: item.id, form: 'editar' } } "> 
                    Editar
                  </router-link>
                  <router-link type="button" class="btn btn-sm btn-danger" 
                      :to="{ name: 'marca-formulario-excluir-view', query: { id: item.id, form: 'excluir' } } ">
                    Excluir
                  </router-link>
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script lang="ts">

import { defineComponent } from 'vue';

import ConfiguracaoClient from '@/client/Configuracao.client';
import { ConfiguracaoModel} from '@/model/ConfiguracaoModel';

export default defineComponent({
  name: 'MarcaLista',
  data() {
    return {
        List: new Array<ConfiguracaoModel>()
    }
  },
  mounted() {
    this.findAll();
  },
  methods: {

    findAll() {
      ConfiguracaoClient.listaAll()
        .then(sucess => {
          this.List = sucess
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
});

</script>