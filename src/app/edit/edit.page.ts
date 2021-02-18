import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BarcrudService } from '../core/barcrud.service';
import { BarDbService } from '../core/bardb.service';
import { IBar } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  bars: any;
  public bar: IBar;
  barForm:FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private barcrudService: BarcrudService,
    public toastController: ToastController
  ) { }

  ngOnInit() {

    this.barForm = new FormGroup({
      name: new FormControl(''),
      rating: new FormControl(''),
      shortDescription: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(),
    });

    this.id = this.activatedrouter.snapshot.params.id;
    
    this.barcrudService.read_bar().subscribe(data => {
      
      this.bars = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          rating: e.payload.doc.data()['rating'],
          shortDescription: e.payload.doc.data()['shortDescription'],
          description: e.payload.doc.data()['description'],
          image: e.payload.doc.data()['image']
        };
      })
      this.bars.forEach(element => {
        if(this.id == element.id){
          this.bar = element;
          this.barForm.get('name').setValue(this.bar.name),
          this.barForm.get('rating').setValue(this.bar.rating),
          this.barForm.get('shortDescription').setValue(this.bar.shortDescription),
          this.barForm.get('image').setValue(this.bar.image),
          this.barForm.get('description').setValue(this.bar.description)
        }
      });
      console.log(this.bar);

    });
          
    /*
        this.barForm.get('name').setValue(this.bar.name),
        this.barForm.get('rating').setValue(this.bar.rating),
        this.barForm.get('shortDescription').setValue(this.bar.shortDescription),
        this.barForm.get('image').setValue(this.bar.image),
        this.barForm.get('description').setValue(this.bar.description)
    */
    
    /*Creo formulario vacío*/
    /*
    this.barForm = new FormGroup({
      name: new FormControl(''),
      rating: new FormControl(''),
      shortDescription: new FormControl(''),
      image: new FormControl(''),
      description: new FormControl(),
    });*/

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
    //this.bar = this.barForm.value;
    this.bar.name = this.barForm.get('name').value;
    this.bar.rating = this.barForm.get('rating').value;
    this.bar.description = this.barForm.get('description').value;
    this.bar.shortDescription = this.barForm.get('shortDescription').value;
    this.bar.image = this.barForm.get('image').value;
    //Borro el bar de la base de datos
    //this.bardbService.remove(this.id)
    // Creo el bar con los nuevos valores
    //this.bardbService.setItem(this.id, this.bar);
    this.barcrudService.update_bar(this.id, this.bar);

    //console.warn(this.barForm.value);
  }

}
