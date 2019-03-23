import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Constants } from '../app/constants';
import { Network } from '@ionic-native/network';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { Push, PushObject, PushOptions} from '@ionic-native/push';
import { NativeAudio } from '@ionic-native/native-audio';

//PAGES
import { MenuPage } from '../pages/menu/menu';
import { HomePage } from '../pages/home/home';

@Component({
  template: '<ion-nav #baseNav></ion-nav>'
})
export class MyApp {
  @ViewChild('baseNav') nav: Nav;
  rootPage:any;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              private appVersion: AppVersion,
              private device: Device,
              private network: Network,
              public push: Push,
              public alertCtrl: AlertController,
              private nativeAudio: NativeAudio,
              public splashScreen: SplashScreen) {
    this.initializeApp();

  }

  ngOnInit() {
    this.nav.push(MenuPage, { animate: false });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.nativeAudio.preloadSimple('audio1', 'assets/audio/beep.mp3').then((onSuccess) => {
      }, (onError) => {
      });

      this.checkNetwork();
      if (this.platform.is('cordova')) {
        localStorage.setItem(Constants.UUID, this.device.uuid);
        this.appVersion.getVersionNumber().then((version) => {
          localStorage.setItem(Constants.VERSION_NUMBER, version);
        })
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.pushSetup();

      // abaixo verificamos se a intenet cair depois que o cliente já entrou no app
      this.network.onDisconnect().subscribe(() => {
        let alertDisconect = this.alertCtrl.create({
          title: "Conexão de internet!",
          subTitle: "Você está offline. Verifique sua conexão com a internet!",
          buttons: [{
             text: 'Ok',
             handler: () => {
                 this.platform.exitApp();
                }
             }]
           });
           alertDisconect.present();
      });

    });
  }

  pushSetup() {
    const options: PushOptions = {
      android: {
          senderID: '1035662030940',
          sound: 'true',
          vibrate: true
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'true'
      },
      windows: {}
    };

  const pushObject: PushObject = this.push.init(options);

  pushObject.on('registration').subscribe((registration: any) => {
    localStorage.setItem(Constants.TOKEN_PUSH, registration.registrationId);
  });

  pushObject.on('notification').subscribe((data: any) => {
    if (data.additionalData.foreground) {
      let confirmAlert = this.alertCtrl.create({
        title: 'Nova notificação PetPrático',
        message: data.message,
        buttons: ['OK']
        // buttons: [{
        //   text: 'IGNORAR',
        //   role: 'cancel'
        // }, {
        //   text: 'OK ',
        //   handler: () => {
        //   }
        // }]
      });
      confirmAlert.present();
    } else {
    }
  });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }

  checkNetwork() {
    if(this.network.type === 'none') {
      let alert = this.alertCtrl.create({
      title: "Conexão de internet!",
      subTitle: "Você está offline. Verifique sua conexão com a internet!",
      buttons: [{
         text: 'Ok',
         handler: () => {
             this.platform.exitApp();
            }
         }]
       });
     alert.present();
    }
  }

}
