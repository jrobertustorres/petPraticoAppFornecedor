import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosAceitosListPage } from './pedidos-aceitos-list';

@NgModule({
  declarations: [
    PedidosAceitosListPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosAceitosListPage),
  ],
})
export class PedidosAceitosListPageModule {}
