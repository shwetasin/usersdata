import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from "@angular/forms";
import { LocalService } from '../localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceNameService } from '../service-name.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  formSubmitted: boolean = false;
  userLogin: FormGroup;
  userData: any[] = []
  users: any[] = []
  showPassword: any;
  saved_data:any;

  constructor(
    private router: Router,
    private service: ServiceNameService,
    private localStorage :LocalService
  ) {
    this.userLogin = new FormGroup({

      email: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl("", [Validators.required, Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]),

    });
  }

  Onsubmit(value: any) {
    console.log("Submit:", value);
    this.saved_data = JSON.parse(this.localStorage.getData('users') as string);
    console.log(this.saved_data)
    if (this.saved_data != null) {
      let index = this.saved_data.findIndex((element: any) => element.email == value.email && element.password == value.password); {
        console.log(index)
        if (index > -1) {
          console.log(index);
          this.router.navigate(['view/']);
          this.service.presentAlert("Login Sucessfully..")
          this.localStorage.saveData('Loginusers', JSON.stringify(value))
          this.userLogin.reset();
        } else {
          console.log("data not Found!");
          this.service.presentToast("middle")
        }
      }

    }

  }
}
