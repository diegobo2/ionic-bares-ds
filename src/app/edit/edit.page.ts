import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BarDbService } from '../core/bardb.service';
import { IBar } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  public bar: IBar;
  barForm:FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private bardbService: BarDbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.bardbService.getItem(this.id).then(
      (data: IBar) => {
        
        this.bar = data;
        
        this.barForm.get('name').setValue(this.bar.name),
        this.barForm.get('rating').setValue(this.bar.rating),
        this.barForm.get('shortDescription').setValue(this.bar.shortDescription),
        this.barForm.get('image').setValue(this.bar.image),
        this.barForm.get('description').setValue(this.bar.description)
      
      })
    /*Creo formulario vacío*/
    this.barForm = new FormGroup({
      name: new FormControl(''),
      rating: new FormControl(''),
      shortDescription: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(),
    });

  }

  async onSubmit(){
    const toast = await this.toastController.create({
      header: 'Actualizar Bar',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.updateBar();
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

  updateBar() {
    this.bar = this.barForm.value;
    //let nextKey = this.bar.name.trim();
    //this.bar.id = nextKey;
    //Borro el bar de la base de datos
    this.bardbService.remove(this.id)
    // Creo el bar con los nuevos valores
    this.bardbService.setItem(this.id, this.bar);
    console.warn(this.barForm.value);
  }

}
