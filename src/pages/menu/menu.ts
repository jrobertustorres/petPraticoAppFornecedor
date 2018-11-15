import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, AlertController, Nav, MenuController, NavParams, LoadingController } from 'ionic-angular';
import { Constants } from '../../app/constants';
import { Platform } from 'ionic-angular';

//ENTITY
import { UsuarioEntity } from '../../model/usuario-entity';

//PAGES
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';
import { PedidosAceitosListPage } from '../pedidos-aceitos-list/pedidos-aceitos-list';

//SERVICES
import { LoginService } from '../../providers/login-service';
import { UsuarioService } from '../../providers/usuario-service';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit{
  @ViewChild('content') nav: Nav;
  rootPage:any;
  public nomePessoa: string;
  public nomeFornecedor: string;
  public emailPessoa: string;
  pages: Array<{title: string, component: any, isVisible: boolean, icon: string}>;

  private usuarioEntity: UsuarioEntity;
  private loading = null;

  constructor(public navParams: NavParams,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private menuCtrl: MenuController,
              public loginService: LoginService,
              public usuarioService: UsuarioService,
              public platform: Platform) {

      this.usuarioEntity = new UsuarioEntity();

      try {

          if(!localStorage.getItem(Constants.ID_USUARIO)){
            this.rootPage = LoginPage;
          }
          else if(localStorage.getItem(Constants.ID_USUARIO)) {
            this.callLoginByIdService(localStorage.getItem(Constants.ID_USUARIO));
          }
      } catch (err){
      }
  }

  ngOnInit() {
    this.constroiMenu();
  }

  ionViewDidLoad() {
  }

  constroiMenu() {
    
    this.pages = [
      { title: 'Pedidos abertos', component: HomePage, isVisible: true, icon: 'ios-copy' },
      { title: 'Pedidos aceitos', component: PedidosAceitosListPage, isVisible: true, icon: 'ios-clipboard' },
      { title: 'Configurações', component: ConfiguracoesPage, isVisible: true, icon: 'ios-settings' },
    ];

    this.loginService.userChangeEvent.subscribe(nomePessoa => {
      this.nomePessoa = nomePessoa.split(/(\s).+\s/).join("");
    });
    this.loginService.nomefornecedorChangeEvent.subscribe(nomeFornecedor => {
      this.nomeFornecedor = nomeFornecedor;
    });

  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  callLoginByIdService(idUsuario) {
  
    try {
      this.loading = this.loadingCtrl.create({
        content: 'Autenticando...'
      });
      this.loading.present();

      this.usuarioEntity.idUsuario = idUsuario;
      this.loginService.loginByIdFornecedor(this.usuarioEntity)
        .then((usuarioEntityResult: UsuarioEntity) => {
          this.rootPage = HomePage;
          this.loading.dismiss();

      }, (err) => {
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

  logout() {
    let alert = this.alertCtrl.create({
      subTitle: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Ficar',
          role: 'cancel'
        },
        {
          text: 'Sair',
          handler: () => {
            localStorage.removeItem(Constants.ID_USUARIO);
            localStorage.removeItem(Constants.TOKEN_USUARIO);
            localStorage.removeItem(Constants.TOKEN_PUSH);
            localStorage.removeItem(Constants.NOME_PESSOA);
            // localStorage.removeItem(Constants.EMAIL_PESSOA);
            this.nav.setRoot(LoginPage);
            this.menuCtrl.close();
          }
        }
      ]
    });
    alert.present();
  }

}
