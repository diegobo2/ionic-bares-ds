import { Component, OnInit } from '@angular/core';
import { IBar } from '../share/interfaces';
import { BarDbService } from '../core/bardb.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public bars: IBar[];
  barinit: IBar[] = [
    {
      id: "1",
      name: "Krawill",
      rating: "4.3",
      shortDescription: "2x1 de 20:00 a 21:00",
      description: "Ambiente rock/metal asegurado, 2x1 en cervezas de 20:00 a 21:00",
      image: "/assets/images/img1.jpg"
    },
    {
      id: "2",
      name: "BarKatu",
      rating: "3.5",
      shortDescription: "Música y ambiente asegurados",
      description: "Todos los viernes y sábados tenémos música folclorica.",
      image: "/assets/images/img2.jpg"
    },
    {
      id: "3",
      name: "Viana",
      rating: "4.2",
      shortDescription: "Fiesta 'lowCost'",
      description: "Abierto solo fines de semana con chupitos a 1€",
      image: "/assets/images/img3.jpg"
    },
    {
      id: "4",
      name: "Olympus Beer",
      rating: "3.9",
      shortDescription: "Birras y más birras",
      description: "Música Jazz y Blues los fines de semana y 3x1 en cervezas",
      image: "/assets/images/img4.jpg"
    },
    {
      id: "5",
      name: "Herriko Taberna",
      rating: "2",
      shortDescription: "Comidas/cenas locales",
      description: "Para que toda la fimilia difrute de la gastronomía local",
      image: "/assets/images/img5.jpg"
    },
    {
      id: "6",
      name: "Bar Txutibel",
      rating: "4.6",
      shortDescription: "Música electrónica y mucha fiesta",
      description: "Nuevos Djs todos los Viernes y Sábados de 19:00 a 22:00",
      image: "/assets/images/img6.jpg"
    }
  ]

  constructor(private bardbService: BarDbService, private route:
    Router) { }
  ngOnInit(): void {
    // If the database is empty set initial values
    this.inicialization();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    if (this.bars !== undefined) {
      this.bars.splice(0);
    }
    this.retrieveValues();
  }
  inicialization() {
    if (this.bardbService.empty()) {
      this.barinit.forEach(bar => {
        this.bardbService.setItem(bar.id, bar);
      });
    }
  }
  retrieveValues() {
    // Retrieve values
    this.bardbService.getAll().then(
      (data) => this.bars = data
    );
  }
  barTapped(bar) {
    this.route.navigate(['details', bar.id]);
  }
}
