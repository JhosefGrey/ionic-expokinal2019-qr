import { Component, OnInit } from '@angular/core';
import { HomePage } from '../home/home.page';
import { ProductosPage } from '../productos/productos.page';
import { ConferenciasPage } from "../conferencias/conferencias.page";



@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  tab1:any =HomePage
  tab2:any =ProductosPage
  tab3:any =ConferenciasPage

  constructor() { }

  ngOnInit() {
  }

}
