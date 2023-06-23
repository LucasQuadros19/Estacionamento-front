import { AbstractEntity } from "./AbstractEntity"

export class MovimentacaoModel extends AbstractEntity{
   entrada!:Number
   saida!:Number
   tempoMinutos!:Number
   tempoHora!:Number
   tempoMulta!:Number
   tempoDesconto!:Number
   valorTotal!:Number
   valorDesconto!:Number
   valorMulta!:Number
   valorHora!:Number
   valorvalorMinutoMulta!:Number
}