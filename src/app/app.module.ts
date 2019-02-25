import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import 'rxjs/add/operator/map';
import { NativeAudio } from '@ionic-native/native-audio';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//SERVICES
import { UsuarioService } from '../providers/usuario-service';
import { LoginService } from '../providers/login-service';
import { PedidoService } from '../providers/pedido-service';

//ENTITIES
import { UsuarioEntity } from '../model/usuario-entity';
import { PedidoListEntity } from '../model/pedido-list-entity';
import { PedidoEntity } from '../model/pedido-entity';
import { PedidoDetalheEntity } from '../model/pedido-detalhe-entity';
import { ItemPedidoEntity } from '../model/item-pedido-entity';
import { ItemPedidoFornecedorEntity } from '../model/item-pedido-fornecedor-entity';

//PAGES
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { ModalTermosPage } from '../pages/modal-termos/modal-termos';
import { ModalPoliticaPrivacidadePage } from '../pages/modal-politica-privacidade/modal-politica-privacidade'
import { MinhaSenhaPage } from '../pages/minha-senha/minha-senha';
import { LoginPage } from '../pages/login/login';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';
import { MenuPage } from '../pages/menu/menu';
import { DetalhePedidoPage } from '../pages/detalhe-pedido/detalhe-pedido';
import { RejeitarPedidoPopoverPage } from '../pages/rejeitar-pedido-popover/rejeitar-pedido-popover';
import { PedidosAceitosListPage } from '../pages/pedidos-aceitos-list/pedidos-aceitos-list';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfiguracoesPage,
    ModalTermosPage,
    ModalPoliticaPrivacidadePage,
    MinhaSenhaPage,
    RecuperarSenhaPage,
    LoginPage,
    MenuPage,
    DetalhePedidoPage,
    RejeitarPedidoPopoverPage,
    PedidosAceitosListPage,
    ListPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConfiguracoesPage,
    ModalTermosPage,
    ModalPoliticaPrivacidadePage,
    MinhaSenhaPage,
    RecuperarSenhaPage,
    LoginPage,
    MenuPage,
    DetalhePedidoPage,
    RejeitarPedidoPopoverPage,
    PedidosAceitosListPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    Device,
    Network,
    Push,
    NativeAudio,
    UsuarioService,
    LoginService,
    PedidoService,
    UsuarioEntity,
    PedidoListEntity,
    PedidoEntity,
    PedidoDetalheEntity,
    ItemPedidoEntity,
    ItemPedidoFornecedorEntity,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
