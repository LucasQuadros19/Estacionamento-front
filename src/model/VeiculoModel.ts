import { AbstractEntity } from "./AbstractEntity";
import { Cor } from "./Cor";
import { ModeloModel } from "./ModeloModel";
import { Tipo } from "./Tipo";
export class VeiculosModel extends AbstractEntity {
  placa!: String;
  cor!: Cor;
  modelo!: ModeloModel;
  tipo!: Tipo;
  ano!: number;
}
