import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoaderService } from '../services/loader/loader.service';
import { ConfigService } from '../services/config/config.service';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.page.html',
  styleUrls: ['./addorder.page.scss'],
})
export class AddorderPage implements OnInit {

  validations_form: FormGroup;
  public productJson:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoaderService,
    private config: ConfigService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      product: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      quantity: new FormControl('', Validators.compose([
        Validators.required,
      ])),
      discount: new FormControl('', Validators.compose([
        Validators.required,
      ])),
    });

    this.getProducts();
  }

  validation_messages = {
    product: [
      { type: 'required', message: 'Product is required.' },
    ],
    quantity: [
      { type: 'required', message: 'Quantity is required.' },
    ],
    discount: [
      { type: 'required', message: 'Quantity is required.' },
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


  onSubmit(values) {

  }

}
