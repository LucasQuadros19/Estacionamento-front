import axios, { AxiosInstance } from "axios";
import {MovimentacaoModel } from "@/model/MovimentacaoModel";

class MovimentacaoClient {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8081/api/movinentacao',
      headers: { 'Content-type': 'application/json' }
    });
  }

  public async findById(id: number): Promise<MovimentacaoModel> {
    try {
      return (await this.axiosClient.get<MovimentacaoModel>(`/lista/id/${id}`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async listaAll(): Promise<MovimentacaoModel[]> {
    try {
      return (await this.axiosClient.get<MovimentacaoModel[]>(`/lista`)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async cadastrar(cadastro: MovimentacaoModel): Promise<string> {
    try {
      return (await this.axiosClient.post<string>(`/cadastrar`, cadastro)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }

  public async editar(id: number, editar: MovimentacaoModel): Promise<string> {
    try {
      return (await this.axiosClient.put<string>(`/${id}`, editar)).data;
    } catch (error: any) {
      return Promise.reject(error.response);
    }
  }
  public async sair(id: number): Promise<any> {
    try {
      return (await this.axiosClient.put(`/sair/${id}`)).data;
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

export default new MovimentacaoClient();
