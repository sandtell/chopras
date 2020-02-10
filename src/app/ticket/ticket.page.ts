import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddorderPage } from '../addorder/addorder.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoaderService } from '../services/loader/loader.service';
import { ConfigService } from '../services/config/config.service';
import { ModalController } from '@ionic/angular';
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {

  public tID;
  public ticketDetailsJson;
  validations_form: FormGroup;
  public baseImg;
  public hideImg :boolean = false;
  public orderJSON = [];
  private options: GeolocationOptions;

  // public orderJSON;
  public isHideOrder: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoaderService,
    private config: ConfigService,
    private formBuilder: FormBuilder,
    private camera: Camera,
    public modalController: ModalController,
    private geolocation: Geolocation,
    private http: HttpClient,
    public domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {


    this.options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
      console.log(pos);


      localStorage.setItem('latitude', pos.coords.latitude.toString());
      localStorage.setItem('longitude', pos.coords.longitude.toString());

      // this.currentPos = pos;
      // this.userLat = pos.coords.latitude;
      // this.userLong = pos.coords.longitude;
    }, (err: PositionError) => {
      console.log('error: ' + err.message);
    });

    var acc = document.getElementsByClassName('accordion');
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active');
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }

    this.validations_form = this.formBuilder.group({
      customerName: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      status: new FormControl('', Validators.compose([
        Validators.required
      ])),
      address: new FormControl('', Validators.compose([
        Validators.required
      ])),
      contactNo: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])),

      // product: new FormControl('',
      //   Validators.compose([
      //     Validators.required,
      // ])
      // ),
      // quantity: new FormControl('',
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern('^[0-9]*$')
      //   ])        
      // ),
      // discount: new FormControl('',
      //   Validators.compose([
      //   Validators.required,
      //   Validators.pattern('^[0-9]*$')
      // ])
      // ),
      ticketID: new FormControl(''),
      latitude: new FormControl(''),
      longitude: new FormControl(''),
      images: new FormControl(''),

      orderData: new FormControl(''),

      paymentMode: new FormControl('', Validators.compose([
        Validators.required
      ])),
      paymentTerm: new FormControl('', Validators.compose([
        Validators.required
      ])),
      accompaniedBy: new FormControl('', Validators.compose([
        Validators.required
      ])),
      replacement: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });



    this.tID = this.activatedRoute.snapshot.paramMap.get('ticketID');
    this.getTicketDataByID(this.tID);
  }

  getTicketDataByID(tID) {
    try {
      this.loadingCtrl.present('Please Wait...', 'dots');
      const url = this.config.domainURL + `ticketdetails.php?id=${tID}`;
      this.config.getData(url).subscribe((data) => {
        console.log(data);
        this.ticketDetailsJson = data;

        this.validations_form.controls['customerName'].setValue(data[0].customerName);
        this.validations_form.controls['status'].setValue(data[0].status);
        this.validations_form.controls['address'].setValue(data[0].address);
        this.validations_form.controls['contactNo'].setValue(data[0].contact);

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

  validation_messages = {
    customerName: [
      { type: 'required', message: 'Customer Name is required.' },
    ],
    status: [
      { type: 'required', message: 'Status is required.' },
    ],
    address: [
      { type: 'required', message: 'Address is required.' },
    ],
    contactNo: [
      { type: 'required', message: 'Contact No number is required.' },
      { type: 'minlength', message: 'Mobile No must be at least 10' },
      { type: 'maxlength', message: 'Mobile No cannot be more than 10' },
      { type: 'pattern', message: 'Chapter are not allowed' }
    ],
    paymentMode: [
      { type: 'required', message: 'Payment Mode is required.' },
    ],
    paymentTerm: [
      { type: 'required', message: 'Payment Term is required.' },
    ],
    accompaniedBy: [
      { type: 'required', message: 'Accompanied By is required.' },
    ],
    quantity: [
      { type: 'required', message: 'Quantity is required.' },
      { type: 'pattern', message: 'Chapter are not allowed' }
    ],
    discount: [
      { type: 'required', message: 'Discount is required.' },
      { type: 'pattern', message: 'Chapter are not allowed' }
    ],
    replacement : [
      { type: 'required', message: 'Replacement is required.' },
    ]
  };


  async onSubmit(values) {
    console.log(values);

    console.log(JSON.stringify(values));
    
      // alert(JSON.stringify(values));
    // this.loadingCtrl.present('Uploading Data...', 'dots');
    // let data: any;
    // const url = this.config.domainURL + `ticketupdate.php`;
    // data = this.http.post(url, values);
    // data.subscribe(result => {
    //   console.log(result);
    //   this.loadingCtrl.dismiss();
    //   setTimeout(() => {
    //     this.loadingCtrl.dismiss();
    //   }, 5000);
    // }, error => {
    //   // alert(JSON.stringify(error));
    //   console.log(error);
    //   this.loadingCtrl.dismiss();
    // });


  }


  async openModal() {
    const modal = await this.modalController.create({
      component: AddorderPage
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.isHideOrder = true;

        // console.log(dataReturned.data);

        this.validations_form.controls['orderData'].setValue(dataReturned.data);

        // this.validations_form.controls['product'].setValue(dataReturned.data.product);
        // this.validations_form.controls['quantity'].setValue(dataReturned.data.quantity);
        // this.validations_form.controls['discount'].setValue(dataReturned.data.discount);

        this.validations_form.controls['ticketID'].setValue(this.tID);
        this.validations_form.controls['latitude'].setValue(localStorage.getItem('latitude'));
        this.validations_form.controls['longitude'].setValue(localStorage.getItem('longitude'));

        this.orderJSON = dataReturned.data;
        console.log(dataReturned.data);
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  openCameraFn() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;

      this.hideImg = true;

      this.baseImg =  this.domSanitizer.bypassSecurityTrustUrl(base64Image);
      this.validations_form.controls['images'].setValue(base64Image);
      // alert(base64Image);
    }, (err) => {
      alert(JSON.stringify(err));
      // Handle error
    });
  }

}
