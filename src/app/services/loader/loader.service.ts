import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = false;
  constructor(
    private loadingController: LoadingController
  ) { }

  async present(msg, spin) {
    this.isLoading = true;
    return await this.loadingController.create({
      message: msg,     //  message : `<img src="assets/loading.gif" class="img-align" /> <br/> <div class='ion-text-center'>${msg}</div> `,
      spinner: spin,  // "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small" | null | undefined
      // cssClass: 'custom-loader-class',   // Write CSS in global.css
      // mode : 'ios',
      // duration: 10000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }
}
