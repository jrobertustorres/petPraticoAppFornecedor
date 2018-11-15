import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, PopoverController } from 'ionic-angular';

//ENTITYS
import { PedidoEntity } from '../../model/pedido-entity';
import { PedidoDetalheEntity } from '../../model/pedido-detalhe-entity';

//SERVICES
import { PedidoService } from '../../providers/pedido-service';

//PAGES
import { RejeitarPedidoPopoverPage } from '../../pages/rejeitar-pedido-popover/rejeitar-pedido-popover';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-detalhe-pedido',
  templateUrl: 'detalhe-pedido.html',
})
export class DetalhePedidoPage {
  private loading = null;
  public idPedido: number;
  private pedidoEntity: PedidoEntity;
  private pedidoDetalheEntity: PedidoDetalheEntity;
  private listPedidoResposta: any[];

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private pedidoService: PedidoService,
              private toastCtrl: ToastController,
              public popoverCtrl: PopoverController,
              public navParams: NavParams) {
    this.pedidoEntity = new PedidoEntity();
    this.pedidoDetalheEntity = new PedidoDetalheEntity();
    this.idPedido = navParams.get("idPedido");
  }

  ngOnInit() {
    this.findPedidoDetalhe();
  }

  ionViewDidLoad() {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(RejeitarPedidoPopoverPage, { idPedido: this.pedidoDetalheEntity.idPedido });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss((data) => {
      if (data) {
        setTimeout(() => {
          this.navCtrl.setRoot(HomePage);
        }, 2000);
      }
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'O pedido foi colocado em separação!',
      duration: 3000,
      position: 'bottom',
      cssClass: "toast-success"
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }

  findPedidoDetalhe() {
    try {
      
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    this.loading.present();

    this.pedidoEntity.idPedido = this.idPedido;
    this.pedidoService.findDetalhePedidoFornecedor(this.pedidoEntity)
      .then((pedidoDetalheEntityResult: PedidoDetalheEntity) => {
        this.pedidoDetalheEntity = pedidoDetalheEntityResult;
        console.log(this.pedidoDetalheEntity);

        this.listPedidoResposta = this.pedidoDetalheEntity.listItemPedidoFornecedorEntity;

        this.loading.dismiss();
      }, (err) => { 
        this.loading.dismiss();
        this.alertCtrl.create({
          subTitle: err.message,
          buttons: ['OK']
        }).present();
      });
  }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
  }

  confirmarPedidoConfirm(idPedido) {
    let confirm = this.alertCtrl.create({
      title: 'Iniciar separação de itens',
      message: 'Deseja realmente iniciar a separação dos itens?',
      buttons: [
        {
          text: 'NÃO',
          handler: () => {
          }
        },
        {
          text: 'INICIAR',
          handler: () => {
            this.confirmarPedido(idPedido);
          }
        }
      ]
    });
    confirm.present();
  }

  confirmarPedido(idPedido) {
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Aguarde...',
      });
      this.loading.present();

      this.pedidoEntity.idPedido = idPedido;
      this.pedidoService.confirmarPedido(this.pedidoEntity)
      .then((pedidoEntityResult: PedidoEntity) => {
        this.loading.dismiss();
        this.findPedidoDetalhe();
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
