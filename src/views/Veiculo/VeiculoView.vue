<template>

  <div class="container" style="margin-top: 10px;">

    <div class="row">
      <div class="col-md-10 text-start"> <p class="fs-3"> Lista de Veiculos </p> </div>
      <div class="col-md-2"> 
        <div class="d-grid gap-2">
          <router-link type="button" class="btn btn-success" 
            to="/veiculo/formulario">Cadastrar
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
              <th scope="col" class="text-end">placa</th>
              <th scope="col" class="text-start">cor</th>
              <th scope="col" class="text-start">modelo</th>
              <th scope="col" class="text-start">tipo</th>
              <th scope="col" class="text-end">ano</th>
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
              <th class="text-end">{{ item.placa }}</th>
              <th class="text-start">{{ item.cor }}</th>
              <th class="text-start">{{ item.modelo.nome }}</th>
              <th class="text-start">{{ item.tipo }}</th>
              <th class="text-end">{{ item.ano }}</th>
              <th class="col-md-2">
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                  <router-link type="button" class="btn btn-sm btn-warning" 
                      :to="{ name: 'veiculo-formulario-editar-view', query: { id: item.id, form: 'editar' } } "> 
                    Editar
                  </router-link>
                  <router-link type="button" class="btn btn-sm btn-danger" 
                      :to="{ name: 'veiculo-formulario-excluir-view', query: { id: item.id, form: 'excluir' } } ">
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

import VeiculosClient from '@/client/Veiculos.client';
import { VeiculosModel} from '@/model/VeiculoModel';

export default defineComponent({
  name: 'MarcaLista',
  data() {
    return {
        List: new Array<VeiculosModel>()
    }
  },
  mounted() {
    this.findAll();
  },
  methods: {

    findAll() {
      VeiculosClient.listaAll()
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