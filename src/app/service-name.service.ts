import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceNameService {

  constructor(
    private toastController: ToastController,
    private  alertController : AlertController
  ) { }
  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Data Not Match !',
      duration: 500,
      position: position,
     
    });

    await toast.present();
  }
  async presentAlert(msg:any) {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: msg,
      buttons: [
        {
          text: 'Ok',
        },
        ],
      
    });
}

}
