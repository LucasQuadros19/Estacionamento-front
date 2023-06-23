import { AbstractEntity } from "./AbstractEntity"
export class CondutorModel extends AbstractEntity {
    nome!:String
    cpf!:String
    telefone!:String
    tempoPago!:Number
    tempoDesconto!:Number
}