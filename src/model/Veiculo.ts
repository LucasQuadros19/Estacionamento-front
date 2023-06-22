
import { AbstractEntity } from "./AbstractEntity"
import { Cor } from "./Cor"
import { Modelo } from "./Modelo"
import { Tipo } from "./Tipo"
export class Veiculos extends AbstractEntity{
    placa!:String
    cor!:Cor
    modelo!:Modelo
    tipo!:Tipo
    ano!:number
}