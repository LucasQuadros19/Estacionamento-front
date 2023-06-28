<template>
  <div v-if="selectedItem">
    <div class="container" style="margin-top: 10px;">
      <div class="row">
        <div class="col-md-12 text-start">
          <p class="fs-3">Detalhes da Movimentação Finalizada</p>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">ID</th>
                <td>{{ selectedItem.id }}</td>
              </tr>
              <tr>
                <th scope="row">Ativo</th>
                <td>{{ selectedItem.ativo ? 'Ativo' : 'Inativo' }}</td>
              </tr>
              <tr>
                <th scope="row">Modelo</th>
                <td>{{ selectedItem.veiculo.modelo.nome }}</td>
              </tr>
              <tr>
                <th scope="row">Marca</th>
                <td>{{ selectedItem.veiculo.modelo.marca.nome }}</td>
              </tr>
              <tr>
                <th scope="row">Placa</th>
                <td>{{ selectedItem.veiculo.placa }}</td>
              </tr>
              <tr>
                <th scope="row">Condutor</th>
                <td>{{ selectedItem.condutor.nome }}</td>
              </tr>
              <tr>
                <th scope="row">CPF</th>
                <td>{{ selectedItem.condutor.cpf }}</td>
              </tr>
              <tr>
                <th scope="row">Entrada</th>
                <td>{{ selectedItem.entrada }}</td>
              </tr>
              <tr>
                <th scope="row">Saída</th>
                <td>{{ selectedItem.saida }}</td>
              </tr>
              <tr>
                <th scope="row">Tempo (Minutos)</th>
                <td>{{ selectedItem.tempoMinutos }}</td>
              </tr>
              <tr>
                <th scope="row">Tempo (Hora)</th>
                <td>{{ selectedItem.tempoHora }}</td>
              </tr>
              <tr>
                <th scope="row">Tempo (Multa)</th>
                <td>{{ selectedItem.tempoMulta }}</td>
              </tr>
              <tr>
                <th scope="row">Tempo (Desconto)</th>
                <td>{{ selectedItem.tempoDesconto }}</td>
              </tr>
              <tr>
                <th scope="row">Valor Total</th>
                <td>{{ "R$"+selectedItem.valorTotal }}</td>
              </tr>
              <tr>
                <th scope="row">Valor Desconto</th>
                <td>{{ "R$"+selectedItem.valorDesconto }}</td>
              </tr>
              <tr>
                <th scope="row">Valor Multa</th>
                <td>{{ "R$"+selectedItem.valorMulta }}</td>
              </tr>
              <tr>
                <th scope="row">Valor Hora</th>
                <td>{{ "R$"+selectedItem.valorHora }}</td>
              </tr>
              <tr>
                <th scope="row">Valor Minuto Multa</th>
                <td>{{ "R$"+selectedItem.valorvalorMinutoMulta }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Nenhum item selecionado</p>
  </div>
</template>

  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import MovimentacaoClient from '@/client/Movimentacao.client';
  import { MovimentacaoModel } from '@/model/MovimentacaoModel';
  
  export default defineComponent({
    name: 'MovimentacaoFinalizarView',
    data() {
      return {
        selectedItem: null as MovimentacaoModel | null
      };
    },
    mounted() {
      this.findSelectedItem();
    },
    methods: {
      findSelectedItem() {
        const route = useRouter();
        const id = route.currentRoute.value.query.id;
  
        MovimentacaoClient.findById(id)
          .then((success) => {
            this.selectedItem = success;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  });
  </script>
  