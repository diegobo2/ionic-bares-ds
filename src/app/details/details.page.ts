import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BarDbService } from '../core/bardb.service';
import { IBar } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: string;
  public bar: IBar;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private bardbService: BarDbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.bardbService.getItem(this.id).then(
      (data: IBar) => this.bar = data
    );
  }

  editRecord(bar) {
    this.router.navigate(['edit', bar.id])
  }
  
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar bar',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.bardbService.remove(id);
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
