import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from './localstorage.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private localStorage :LocalService
  ) {
    let data = JSON.parse(this.localStorage.getData('Loginusers') as string);
      if (data != null || data != undefined) {
        this.router.navigate(['/view']) 
      } else {
        this.router.navigate(['/home'])
      }
    }
    

}
