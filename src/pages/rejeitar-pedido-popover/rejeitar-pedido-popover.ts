import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, LoadingController, ToastController } from 'ionic-angular';

//ENTITYS
import { PedidoEntity } from '../../model/pedido-entity';

//SERVICES
import { PedidoService } from '../../providers/pedido-service';

@IonicPage()
@Component({
  selector: 'page-rejeitar-pedido-popover',
  templateUrl: 'rejeitar-pedido-popover.html',
})
export class RejeitarPedidoPopoverPage {
  private loading = null;
  private pedidoEntity: PedidoEntity;
  private idPedido: number;

  constructor(public navCtrl: NavController,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private pedidoService: PedidoService,
              private toastCtrl: ToastController,
              public navParams: NavParams) {
    this.pedidoEntity = new PedidoEntity();
    this.idPedido = navParams.get("idPedido");
  }

  // close() {
  //   this.viewCtrl.dismiss();
  // }

  dismiss(item) {
    this.viewCtrl.dismiss(item);
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'O pedido foi rejeitado!',
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  rejeitarPedidoConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Rejeitar pedido',
      message: 'Deseja realmente este pedido?',
      buttons: [
        {
          text: 'NÃO',
          handler: () => {
          }
        },
        {
          text: 'REJEITAR',
          handler: () => {
            this.rejeitaPedido();
          }
        }
      ]
    });
    confirm.present();
  }

  rejeitaPedido() {
    try {

      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...',
      });
      this.loading.present();

      this.pedidoEntity.idPedido = this.idPedido;
      this.pedidoService.confirmarPedido(this.pedidoEntity)
      .then((pedidoEntityResult: PedidoEntity) => {
        this.dismiss('HomePage');
        this.loading.dismiss();
        this.presentToast();
      
      }, (err) => {
        this.loading.dismiss();
        this.alertCtrl.create({
          subTitle: err.message,
          buttons: ['OK']
        }).present();
      });
    } catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
  }

}
