import { AbstractEntity } from "./AbstractEntity"
import { Marca } from "./Marca"
export class Modelo extends AbstractEntity{
    nome!:String
    marca!:Marca
}