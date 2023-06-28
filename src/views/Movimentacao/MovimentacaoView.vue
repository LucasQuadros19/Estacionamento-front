<template>
  <div class="container" style="margin-top: 10px;">
    <div class="row">
      <div class="col-md-8 text-start">
        <p class="fs-3">Lista de Movimentacoes</p>
      </div>
      <div class="col-md-2">
        <div class="d-grid gap-2">
          <router-link
            type="button"
            class="btn btn-success"
            to="/movimentacao/formulario"
          >
            Cadastrar
          </router-link>
        </div>
      </div>
      <div class="col-md-2">
        <div class="d-grid gap-2">
          <router-link
            type="button"
            class="btn btn-secondary"
            to="/movimentacao/ativos"
          >
            ativos
          </router-link>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped">
          <thead class="table-secondary">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Ativo</th>
              <th scope="col" class="text-start">modelo</th>
              <th scope="col" class="text-start">marca</th>
              <th scope="col" class="text-start">placa</th>
              <th scope="col" class="text-start">Condutor</th>
              <th scope="col" class="text-end">cpf</th>
              <th scope="col">Opção</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
            <tr v-for="item in List" :key="item.id">
              <th class="col-md-1">{{ item.id }}</th>
              <th class="col-md-2">
                <span v-if="item.ativo" class="badge text-bg-success"
                  >Ativo</span
                >
                <span v-if="!item.ativo" class="badge text-bg-danger"
                  >Inativo</span
                >
              </th>
              <th class="text-start">{{ item.veiculo.modelo.nome }}</th>
              <th class="text-start">{{ item.veiculo.modelo.marca.nome }}</th>
              <th class="text-start">{{ item.veiculo.placa }}</th>
              <th class="text-start">{{ item.condutor.nome }}</th>
              <th class="text-end">{{ item.condutor.cpf }}</th>
              <th class="col-md-2">
                <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                  <router-link
                    type="button"
                    class="btn btn-sm btn-warning"
                    :to="{ name: 'movimentacao-formulario-editar-view', query: { id: item.id, form: 'editar' } }"
                  >
                    Editar
                  </router-link>
                  <router-link
                    type="button"
                    class="btn btn-sm btn-danger"
                    :to="{ name: 'movimentacao-formulario-excluir-view', query: { id: item.id, form: 'excluir' } }"
                  >
                    Excluir
                  </router-link>
                  <router-link
                    type="button"
                    class="btn btn-sm btn-info"
                    :to="{ name: 'movimentacao-finalizar-view', query: { id: item.id, form: 'finalizar' } }"
                        >
                    finalizar
                  </router-link>
                  <router-link
                    type="button"
                    class="btn btn-sm btn-info"
                    :to="{ name: 'movimentacao-final-view', query: { id: item.id, form: 'relatorio' } }"
                        >
                        relatorio
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
import MovimentacaoClient from '@/client/Movimentacao.client';
import { MovimentacaoModel } from '@/model/MovimentacaoModel';

export default defineComponent({
  name: 'MarcaLista',
  data() {
    return {
      List: new Array<MovimentacaoModel>()
    };
  },
  mounted() {
    this.findAll();
  },
  methods: {
    findAll() {
      MovimentacaoClient.listaAll()
        .then(success => {
          this.List = success;
        })
        .catch(error => {
          console.log(error);
        });
    },
    finalizar(id) {
      MovimentacaoClient.sair(id)
        .then(response => {
          console.log(response);
          // Redirecione para a página desejada após finalizar
          // router.push('/outra-pagina');
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
});
</script>
