import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';
import { Constants } from '../../app/constants';

// PAGES
import { MinhaSenhaPage } from './../minha-senha/minha-senha';

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage implements OnInit {
  public versaoApp: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController) {

  }

  ngOnInit() {
    this.versaoApp = localStorage.getItem(Constants.VERSION_NUMBER);
  }

  ionViewDidLoad() {
  }

  openModalTermos(){
    window.open('http://www.petpratico.com.br/termos-de-uso.html', '_system', 'location=yes');
  }

  openModalPolitica(){
    window.open('http://www.petpratico.com.br/politica-de-privacidade.html', '_system', 'location=yes');
  }

  minhaSenha() {
    this.navCtrl.push(MinhaSenhaPage);
  }

}
