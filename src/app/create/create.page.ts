import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BarDbService } from '../core/bardb.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IBar } from '../share/interfaces';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  bar: IBar;
  barForm: FormGroup;
  constructor(
    private router: Router,
    private bardbService: BarDbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.barForm = new FormGroup({
      name: new FormControl(''),
      rating: new FormControl(''),
      shortDecription: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar Bar',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveBar();
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
  saveBar() {
    this.bar = this.barForm.value;
    let nextKey = this.bar.name.trim();
    this.bar.id = nextKey;
    this.bardbService.setItem(nextKey, this.bar);
    console.warn(this.barForm.value);
  }
}
