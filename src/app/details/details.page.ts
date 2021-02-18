import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { BarDbService } from '../core/bardb.service';
import { IBar } from '../share/interfaces';
import { ToastController } from '@ionic/angular';
import { BarcrudService } from '../core/barcrud.service';
//import { runInThisContext } from 'vm';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: string;
  public bar: IBar;
  bars: any;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    //private bardbService: BarDbService,
    private barcrudService:BarcrudService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    /*
    this.bardbService.getItem(this.id).then(
      (data: IBar) => this.bar = data
    );*/
    
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
        }
      });
      console.log(this.bar);
    });
  }

  editRecord(bar) {
    this.router.navigate(['edit', bar.id])
  }

  async removeRecord(id){
    const toast = await this.toastController.create({
      header: 'Elimiar bar',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.barcrudService.delete_bar(id);
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

/*  
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
  }*/
}
