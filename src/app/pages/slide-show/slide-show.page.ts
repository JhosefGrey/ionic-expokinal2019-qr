import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.page.html',
  styleUrls: ['./slide-show.page.scss'],
})
export class SlideShowPage implements OnInit {

  slides = [
    {
      img: 'assets/img/slide-1.png',
      titulo: 'Bienvenido a la app de<br>EXPO KINAL esta app<br>Te servira para lo <br>Siguiente'
    },
    {
      img: 'assets/img/slide-2.png',
      titulo: 'Escanear codigos QR<br>-Para las conferencias<br>-Para las comidas'
    },
    {
      img: 'assets/img/slide-3.png',
      titulo: 'Escanea la entrada de las<br>Personas que se inscribieron<br>A la conferencia'
    },
    {
      img: 'assets/img/slide-4.png',
      titulo: 'Escanea el codigo QR de la<br>Comida y asi llevas un control<br>Sobre lo que has vendido'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
