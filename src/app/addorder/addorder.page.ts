import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { LoaderService } from '../services/loader/loader.service';
import { ConfigService } from '../services/config/config.service';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.page.html',
  styleUrls: ['./addorder.page.scss'],
})
export class AddorderPage implements OnInit {

  public usersForm: FormGroup;
  public isBtnDisable: boolean = true;
  public productJson:any;
  constructor(
    private fb: FormBuilder,
    private loadingCtrl: LoaderService,
    private config: ConfigService,
    private alertCtrl: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.usersForm = this.fb.group({
      // date: this.fb.control(new Date()),
      users: this.fb.array([
        this.fb.group({
          product: ['', Validators.required],
          quantity: ['', Validators.required],
          discount: ['', Validators.required]
        }),
      ])
    });
    this.getProducts();
  }

  removeFormControl(i) {
    console.log(i);
    if (i != 0) {
      let usersArray = this.usersForm.controls.users as FormArray;
      usersArray.removeAt(i);
    }
    
  }

  addFormControl() {
    let usersArray = this.usersForm.controls.users as FormArray;
    let arraylen = usersArray.length;

    let newUsergroup: FormGroup = this.fb.group({
      product: ['', Validators.required],
      quantity: ['', Validators.required],
      discount: ['', Validators.required]
    })

    usersArray.insert(arraylen, newUsergroup);

    // console.log('74' ,this.usersForm.controls.users.value);

  }

  async  onSubmit() {

    // console.log(this.usersForm.controls.users.value);

    for(let z = 0;z <=this.usersForm.controls.users.value.length -1 ;z++ ) {
      // console.log(z);
      if(this.usersForm.controls.users.value[z].product != "" && this.usersForm.controls.users.value[z].quantity != "" && this.usersForm.controls.users.value[z].discount != "") {
        // console.log(this.usersForm.controls.users.value);
        await this.modalController.dismiss(this.usersForm.controls.users.value);
      }else {
        this.alertFn(`All fields are mandatory in  ${z+1} Forms`);
      }
    }


    
    
  }

  async alertFn(msg: string) {
   const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  validation_messages = {
    product: [
      { type: 'required', message: 'Product is required.' },
    ],
    quantity: [
      { type: 'required', message: 'Quantity is required.' },
      { type: 'pattern', message: 'Chapter are not allowed' }
    ],
    discount: [
      { type: 'required', message: 'Discount is required.' },
      { type: 'pattern', message: 'Chapter are not allowed' }
    ],
  };


  getProducts() { 
    try{
      this.loadingCtrl.present('Please Wait...', 'dots');
      const url = this.config.domainURL + `products.php?`;
      this.config.getData(url).subscribe((data) => {
        console.log(data);
        this.productJson = data;
        this.loadingCtrl.dismiss();
      },error => {
        console.log(error);
        this.loadingCtrl.dismiss();
      });
    } catch (e) {
      console.log(e);
      this.loadingCtrl.dismiss();
    }
  }


  async closeModal() {
    await this.modalController.dismiss();
  }
 

}
