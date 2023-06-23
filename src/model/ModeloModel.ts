import { AbstractEntity } from "./AbstractEntity"
import { MarcaModel } from "./MarcaModel"
export class ModeloModel extends AbstractEntity{
    nome!:String
    marca!:MarcaModel
}