import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Constants } from '../app/constants';

//ENTITYS
import { UsuarioEntity } from '../model/usuario-entity';

@Injectable()
export class LoginService {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });
  public userChangeEvent = new EventEmitter();
  public nomefornecedorChangeEvent = new EventEmitter();
  private usuarioEntity: UsuarioEntity;

  constructor(public http: Http) {
    this.usuarioEntity = new UsuarioEntity();
  }

  public loginFornecedor(usuarioEntity) {
    try {
      
      this.usuarioEntity = usuarioEntity;
      this.usuarioEntity.tokenPush = localStorage.getItem(Constants.TOKEN_PUSH);
      this.usuarioEntity.versaoApp = localStorage.getItem(Constants.VERSION_NUMBER);
      return new Promise((resolve, reject) => {
        this.http.post(Constants.API_URL + 'loginFornecedor/', JSON.stringify(this.usuarioEntity), this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);

            localStorage.setItem(Constants.TOKEN_USUARIO, data.token);
            localStorage.setItem(Constants.NOME_PESSOA, data.nomePessoa);
            localStorage.setItem(Constants.NOME_FORNECEDOR, data.nomeFornecedor);
            localStorage.setItem(Constants.ID_USUARIO, data.idUsuario);

            this.userChangeEvent.emit(data.nomePessoa);
            this.nomefornecedorChangeEvent.emit(data.nomeFornecedor);

          }, (err) => {
            reject(err.json());
          });
      });

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

  public loginByIdFornecedor(usuarioEntity) {
    try {
      this.usuarioEntity = usuarioEntity;
      this.usuarioEntity.tokenPush = localStorage.getItem(Constants.TOKEN_PUSH);
      this.usuarioEntity.versaoApp = localStorage.getItem(Constants.VERSION_NUMBER);
      return new Promise((resolve, reject) => {
        this.http.post(Constants.API_URL + 'loginByIdFornecedor/', JSON.stringify(usuarioEntity), this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);

            localStorage.setItem(Constants.TOKEN_USUARIO, data.token);
            localStorage.setItem(Constants.NOME_PESSOA, data.nomePessoa);
            localStorage.setItem(Constants.NOME_FORNECEDOR, data.nomeFornecedor);
            localStorage.setItem(Constants.ID_USUARIO, data.idUsuario);

            this.userChangeEvent.emit(data.nomePessoa);
            this.nomefornecedorChangeEvent.emit(data.nomeFornecedor);

          }, (err) => {
            reject(err.json());
          });
      });

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }


}

