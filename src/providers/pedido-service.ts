import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Constants } from '../app/constants';

@Injectable()
export class PedidoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
  public qtdItensCarrinhoChangeEvent = new EventEmitter();

  constructor(public _http: Http) {
  }

  public findUltimosPedidosFornecedor() {
    try {

      return new Promise((resolve, reject) => {
          this._http.post(Constants.API_URL + 'findUltimosPedidosFornecedor/'
          + localStorage.getItem(Constants.TOKEN_USUARIO), this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);
          }, (err) => {
            console.log(err);
            // reject(err.json());
          });
      });

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

  public findDetalhePedidoFornecedor(pedidoEntity) {
    try {

      return new Promise((resolve, reject) => {
          this._http.post(Constants.API_URL + 'findDetalhePedidoFornecedor/'
          + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(pedidoEntity), this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);
          }, (err) => {
            console.log(err);
            // reject(err.json());
          });
      });

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

  public findUltimosItemPedidos(pedidoEntity) {
    try {

      return new Promise((resolve, reject) => {
          this._http.post(Constants.API_URL + 'findUltimosItemPedidos/'
          + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(pedidoEntity), this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);
          }, (err) => {
            console.log(err);
            // reject(err.json());
          });
      });

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

  public findUltimosPedidosConcluidosFornecedor() {
    try {

      return new Promise((resolve, reject) => {
          this._http.post(Constants.API_URL + 'findUltimosPedidosConcluidosFornecedor/'
          + localStorage.getItem(Constants.TOKEN_USUARIO), this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);
          }, (err) => {
            console.log(err);
            // reject(err.json());
          });
      });

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

  public confirmarPedido(pedidoEntity) {
    try {

      return new Promise((resolve, reject) => {
          this._http.post(Constants.API_URL + 'confirmarPedido/'
          + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(pedidoEntity), this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);
          }, (err) => {
            // reject(err.json());
          });
      });

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

}