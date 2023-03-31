import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator } from "@angular/forms";
import { LocalService } from '../localstorage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectValueAccessor } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  formSubmitted: boolean = false;
  editFrom: FormGroup;
  userData: any[] = []
  id:any;
  userlist: any = [];
  holder:any;



  constructor(
    private localStorage :LocalService,
    private router: Router,
    private actRoute: ActivatedRoute,
  ) { 


    this.editFrom = new FormGroup({
      name: new FormControl(""),
      phone: new FormControl("", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl("", [Validators.required, Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]),
      datetime:new FormControl("",)
    });
    console.log(typeof (this.userData));

    this.id = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit() {

    this.userlist = JSON.parse(this.localStorage.getData('users') as any);
    console.log("data", this.userlist)
    this.holder = this.userlist[this.id];


    this.editFrom.controls['name'].setValue(this.holder.name);
    this.editFrom.controls['phone'].setValue(this.holder.phone);
    this.editFrom.controls['email'].setValue(this.holder.email);
    this.editFrom.controls['password'].setValue(this.holder.password);
    

  }

Onedit(value:any){

  if (value != null || value != undefined) {
    if ((this.userlist != null || this.userlist != undefined || this.userlist != '')) {
      this.userlist[this.id] = value;
      localStorage.setItem('users', JSON.stringify(this.userlist));
      console.log("string", this.userlist)
      this.router.navigate(['view/'])
    }
  }

}
}
