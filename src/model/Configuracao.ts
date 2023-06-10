import { AbstractEntity } from "./AbstractEntity"

export class Configuracao extends AbstractEntity{
    valorHora!:Number
    valorMinutoMulta!:Number
    inicioExpediente!:Number
    fimExpediente!:Number
    tempoParaDesconto!:Number
    tempoDesconto!:Number
    gerarDesconto!:Boolean
    vagaMoto!:Number
    vagaCarro!:Number
    vagaVan!:Number
}