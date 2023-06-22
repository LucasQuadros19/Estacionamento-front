<template>
  <div class="d-flex justify-content-center align-items-center">
    <div class="rectangle">
      <h2>Lista de Movimentações</h2>

      <button type="button" class="btn btn-secondary">cadastrar</button>

      <table class="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Ativo</th>
            <th>Data de Cadastro</th>
            <th>Data de Edição</th>
            <th>Entrada</th>
            <th>Horas</th>
            <th>Minutos</th>
            <th>Saída</th>
            <th>Tempo Desconto</th>
            <th>Tempo Multa</th>
            <th>Valor Desconto</th>
            <th>Valor Hora</th>
            <th>Valor Hora Multa</th>
            <th>Valor Multa</th>
            <th>Valor Total</th>
            <th>Movimentação do Condutor</th>
            <th>Movimentação do Veículo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movimentacao in movimentacoes" :key="movimentacao.id">
            <td>{{ movimentacao.id }}</td>
            <td>{{ movimentacao.ativo }}</td>
            <td>{{ movimentacao.dt_cadastro }}</td>
            <td>{{ movimentacao.dt_edicao }}</td>
            <td>{{ movimentacao.entrada }}</td>
            <td>{{ movimentacao.horas }}</td>
            <td>{{ movimentacao.minutos }}</td>
            <td>{{ movimentacao.saida }}</td>
            <td>{{ movimentacao.tempo_desconto }}</td>
            <td>{{ movimentacao.tempo_multa }}</td>
            <td>{{ movimentacao.valor_desconto }}</td>
            <td>{{ movimentacao.valor_hora }}</td>
            <td>{{ movimentacao.valor_hora_multa }}</td>
            <td>{{ movimentacao.valor_multa }}</td>
            <td>{{ movimentacao.valor_total }}</td>
            <td>{{ movimentacao.movimentacao_condutor }}</td>
            <td>{{ movimentacao.movimentacao_veiculo }}</td>
            <td>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3 text-danger" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import { defineComponent } from 'vue';
import { MovimentacaoClient } from '../client/Movimentacao.client';

export default defineComponent({
  data() {
    return {
      movimentacoes: [],
    };
  },
  mounted() {
    this.carregarMovimentacoes();
  },
  methods: {
    async carregarMovimentacoes() {
      try {
        const client = new MovimentacaoClient();
        this.movimentacoes = await client.findAll();
      } catch (error) {
        console.error('Erro ao carregar as movimentações:', error);
      }
    },
  },
});
</script>

<style scoped>
</style>
