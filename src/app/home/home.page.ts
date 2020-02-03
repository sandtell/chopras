import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { LoaderService } from '../services/loader/loader.service';
import { ConfigService } from '../services/config/config.service';
import { Platform, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public ticketJSON;
  backButtonSubscription;
  constructor(
    private loadingCtrl: LoaderService,
    private config: ConfigService,
    private platform: Platform,
    public alertCtrl: AlertController,
    private router : Router
  ) { }

  ngOnInit() {
    this.getTickets();
  }

  ngAfterViewInit() {
    // this.backButtonSubscription = this.platform.backButton.subscribe(() => {
    //   this.exitFunction('Are you sure you want to Exit App ?');
    // });

    // alert(this.router.url);

    // if (this.router.isActive('/home', true) && this.router.url === '/home') {
    //   this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(999999, () => {
    //     this.exitFunction('Are you sure you want to Exit App ?');
    //   });
    // }    
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  getTickets() {

    try {
      let tokenID = localStorage.getItem('lsToken');
      let number = localStorage.getItem('lsNumber');
      this.loadingCtrl.present('Please Wait...', 'dots');
      const url = this.config.domainURL + `tickets.php?number=${tokenID}&token=${number}`;
      this.config.getData(url).subscribe((data) => {
        console.log(data);
        this.ticketJSON = data;
        this.loadingCtrl.dismiss();
      }, error => {
        console.log(error);
        this.loadingCtrl.dismiss();
      });
    } catch (e) {
      console.log(e);
      this.loadingCtrl.dismiss();
    }
  }


  async exitFunction(msg: string) {
    const alert = await this.alertCtrl.create({
      header: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Okay',
          handler: () => {
            navigator['app'].exitApp();
            // console.log('Confirm Okay');
          }
        }
      ]

    });

    await alert.present();
  }

}
