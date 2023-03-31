import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from "@angular/forms";
import { LocalService } from '../localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage {

  formSubmitted: boolean = false;
  userFrom: FormGroup;
  userData: any[] = []

  constructor(
    private localStorage :LocalService,
    private router: Router,
  ) {

    this.userFrom = new FormGroup({
      name: new FormControl(""),
      phone: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl("", [Validators.required, Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]),

    });

  }

  Onsubmit(value: any) {

    console.log("Submit:", value);
    var saved_data = JSON.parse(this.localStorage.getData('users') as string);
    console.log(saved_data)
    if (saved_data != null) {
      let index = saved_data.findIndex((element: any) => element.email == value.email);
      console.log(index)
      if (index > -1) {
      } else {
        console.log("saved_data:", saved_data);
        saved_data = [...saved_data, ...[value]]
        this.localStorage.saveData('users', JSON.stringify(saved_data));
        this.userFrom.reset();
        this. router. navigate(['/home'])
      }
    } else {
      this.userData.push(value)
      this.localStorage.saveData('users', JSON.stringify(this.userData))
      this. router. navigate(['/home'])
      this.userFrom.reset();

    }

  }


}



