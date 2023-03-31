import { Component, OnInit } from '@angular/core';
import { ServiceNameService } from '../service-name.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../localstorage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {


  userlist: any = [];
  constructor(
    private router: Router,
    private service: ServiceNameService,
    private localStorage :LocalService,
    private alertCtrl: AlertController,
  ) { }


  Logout(){
   

    this.localStorage.removeData("Loginusers");
    console.log("Loginusers");
    this.service.presentAlert ("Logout Suceessfully.");
    this. router. navigate(['/home'])

  }

  ionViewWillEnter() {
    this.Viewall();
  }

  ngOnInit() {

    this.Viewall();

    
  }
  Viewall(){
    this.userlist = JSON.parse(this.localStorage.getData('users') as any);
    console.log("data", this.userlist)

  }

  async clearData(index: any) {
    const alert = await this.alertCtrl.create({
      header: 'Alert!',
      message: "Are you sure want to delete this user?",
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.alertCtrl.dismiss();
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.userlist.splice(index, 1);
            console.log(this.userlist);
            this.localStorage.saveData("users", this.userlist)
          },
        },
      ],
    });
    await alert.present();
  }

  

}
