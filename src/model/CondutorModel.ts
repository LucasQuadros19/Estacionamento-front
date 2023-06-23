import { AbstractEntity } from "./AbstractEntity"
export class Condutor extends AbstractEntity {
    nome!:String
    cpf!:String
    telefone!:String
    tempoPago!:Number
    tempoDesconto!:Number
}