import axios, { AxiosInstance } from "axios";
import { MarcaModel } from "@/model/MarcaModel";

class MarcaClient {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8081/api/marca',
      headers: { 'Content-type': 'application/json' }
    });
  }

  public async findById(id: number): Promise<MarcaModel> {
    try {
      return (await this.axiosClient.get<MarcaModel>(`/lista/id/${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async listaAll(): Promise<any> {
    try {
      return (await this.axiosClient.get<MarcaModel[]>(`/lista`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async cadastrar(marca: MarcaModel): Promise<string> {
    try {
      return (await this.axiosClient.post<string>(`/cadastrar`, marca)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async editar(id: number, marca: MarcaModel): Promise<string> {
    try {
      return (await this.axiosClient.put<string>(`/${id}`, marca)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async excluir(id: number): Promise<string> {
    try {
      return (await this.axiosClient.delete<string>(`/delete/${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
}

export default new MarcaClient();
