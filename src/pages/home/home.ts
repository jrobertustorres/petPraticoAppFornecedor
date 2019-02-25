import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Platform } from 'ionic-angular';

//ENTITYS
import { PedidoListEntity } from '../../model/pedido-list-entity';

//SERVICES
import { PedidoService } from '../../providers/pedido-service';

//PAGES
import { DetalhePedidoPage } from '../detalhe-pedido/detalhe-pedido';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private loading = null;
  private pedidoListEntity: PedidoListEntity;
  private pedidosList: any;
  private refresh: boolean = false;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private pedidoService: PedidoService,
              public platform: Platform,
              public loadingCtrl: LoadingController) {
    this.pedidoListEntity = new PedidoListEntity();
    this.platform.registerBackButtonAction(()=>this.myHandlerFunction());

  }

  ngOnInit() {
    this.findUltimosPedidosFornecedor();
  }

  // se o loading estiver ativo, permite fechar o loading e voltar à tela anterior
  myHandlerFunction(){
    if(this.loading) {
      this.loading.dismiss();
      this.navCtrl.pop();
    }
  }

  doRefreshPedidos(refresher: any) {
    this.findUltimosPedidosFornecedor();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  findUltimosPedidosFornecedor(){
    try {
      if(this.refresh == false) {
        this.loading = this.loadingCtrl.create({
          content: 'Aguarde...'
        });
        this.loading.present();
      }

      this.pedidoService.findUltimosPedidosFornecedor()
      .then((pedidosListResult: PedidoListEntity) => {
        this.pedidosList = pedidosListResult;

        this.refresh = true;
        this.loading ? this.loading.dismiss() : '';
      }, (err) => {
        this.loading ? this.loading.dismiss() : '';
        this.alertCtrl.create({
          subTitle: err.message,
          buttons: ['OK']
        }).present();
      });

    }catch (err){
      if(err instanceof RangeError){
      }
      console.log(err);
    }
  }

  openDetalhePedido(idPedido) {
    this.navCtrl.push(DetalhePedidoPage, {
      idPedido: idPedido
    })
  }

}
