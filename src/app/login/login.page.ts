import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5/dist/md5';
import { LoaderService } from '../services/loader/loader.service';
import { ToastsService } from '../services/toast/toasts.service';
import { ConfigService } from '../services/config/config.service';
import { AuthenticationService } from '../services/auth/authentication.service';
import { ErrormsgService } from '../services/errormsg/errormsg.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validations_form: FormGroup;
  public showPassword: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoaderService,
    private toastCtrl: ToastsService,
    private http: HttpClient,
    private router: Router,
    private config: ConfigService,
    private authService: AuthenticationService,
    public errorMSG: ErrormsgService
  ) {
    // console.log(Md5.hashStr('welcome'));
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      mobileNo: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }


  onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }



  async onSubmit(values) {

    this.loadingCtrl.present('Verifying User...', 'dots');

    let data: any;
    const url = this.config.domainURL + `login.php?username=${values.mobileNo}&key=${Md5.hashStr(values.password)}`;

    data = this.http.get(url);
    data.subscribe(result => {
      // console.log(result[0].status);
      // console.log(result[0].token);
      if (result[0].status === "success") {
        this.loadingCtrl.dismiss();
        localStorage.setItem('lsNumber', values.mobileNo);
        localStorage.setItem('lsToken', result[0].token);
        this.authService.login();
        this.router.navigateByUrl('home');
        this.toastCtrl.presentToast('Login Successfullly...');
      }
    }, error => {
      alert(JSON.stringify(error));
      console.log(error);
      this.loadingCtrl.dismiss();
    });

  }

}