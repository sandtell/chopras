import { Component } from '@angular/core';
import { Platform, NavController, AlertController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './services/auth/authentication.service';
import { ConfigService } from './services/config/config.service';
import { ToastsService } from './services/toast/toasts.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private navController: NavController,
    public alertCtrl: AlertController,
    private toastCtrl: ToastsService,
    private network: Network,
    public config: ConfigService,
    public http: HttpClient,
    private menuCtrl: MenuController,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
  ) {
    this.initializeApp();
  }

  // ionViewWillEnter() {
  //   // alert('ask')
  //   this.menuCtrl.enable(false);
  // }

  initializeApp() {
    this.platform.ready().then(() => {
      this.menuCtrl.enable(false);          //disable sidemenu
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.checkGPSPermission();
      // this.platform.backButton.subscribeWithPriority(0, () => {
      //   this.exitFunction('Are you sure you want to Exit App ?');
      // });
      // watch network for a disconnection
      this.network.onDisconnect().subscribe(() => {
        console.log('network was disconnected ☹️');
        this.toastCtrl.presentToast('Internet not available  ☹️');
        // this.exitFunction('Exit and try again');
      });

      // watch network for a connection
      this.network.onConnect().subscribe(() => {
        this.toastCtrl.presentToast('Network connected! ☺️ ');
        setTimeout(() => {
          if (this.network.type === 'wifi') {
            this.toastCtrl.presentToast('we got a wifi connection, woohoo!');
          }
        }, 3000);
      });

      this.authenticationService.authState.subscribe(state => {
        console.log(state);
        // alert(state);
        if (state) {
           this.navController.navigateRoot(['home']);
        } else {
          this.navController.navigateRoot(['login']);
        }
      });

    });
  }

  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          // If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
          // If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log('4');
      } else {
        // Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              // Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error);
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
      },
      error => {
        this.checkGPSPermission();
        // alert('Error requesting location permissions ' + JSON.stringify(error));
      }
    );
  }



  // async exitFunction(msg: string) {
  //   const alert = await this.alertCtrl.create({
  //     header: msg,
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {

  //         }
  //       },
  //       {
  //         text: 'Okay',
  //         handler: () => {
  //           navigator['app'].exitApp();
  //           // console.log('Confirm Okay');
  //         }
  //       }
  //     ]

  //   });

  //   await alert.present();
  // }

}
