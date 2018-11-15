import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

//ENTITYS
import { PedidoListEntity } from '../../model/pedido-list-entity';

//SERVICES
import { PedidoService } from '../../providers/pedido-service';

//PAGES
import { DetalhePedidoPage } from '../detalhe-pedido/detalhe-pedido';

@IonicPage()
@Component({
  selector: 'page-pedidos-aceitos-list',
  templateUrl: 'pedidos-aceitos-list.html',
})
export class PedidosAceitosListPage {
  private loading = null;
  private pedidoListEntity: PedidoListEntity;
  private pedidosList: any;
  private refresh: boolean = false

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private pedidoService: PedidoService,
              public loadingCtrl: LoadingController) {
    this.pedidoListEntity = new PedidoListEntity();

  }

  ngOnInit() {
    this.findUltimosPedidosConcluidosFornecedor();
  }

  doRefreshPedidos(refresher) {
    this.findUltimosPedidosConcluidosFornecedor();

    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }

  findUltimosPedidosConcluidosFornecedor(){
    try {
      if(this.refresh == false) {
        this.loading = this.loadingCtrl.create({
          content: 'Aguarde...'
        });
        this.loading.present();
      }

      this.pedidoService.findUltimosPedidosConcluidosFornecedor()
      .then((pedidosListResult: PedidoListEntity) => {
        this.pedidosList = pedidosListResult;

        this.refresh = true;
        this.loading ? this.loading.dismiss() : '';
      }, (err) => {
        this.loading ? this.loading.dismiss() : '';
        // this.loading.dismiss();
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
