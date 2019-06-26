import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { UsersService } from 'src/app/services/users.service';
import { Productos } from '../../models/productos.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [UsersService]
})
export class HomePage implements OnInit {

  public responseProductoVendido
  public productos: Productos
  public productoVendido: Productos
  public status;
  public token;
  public identity;
  options: BarcodeScannerOptions;
  encodText: string = '';
  encodedData: any ={};
  scannedData: any = {};
  public hola;
  constructor(public scanner: BarcodeScanner, private _userService: UsersService, private _router: Router,) {
    this.token = this._userService.getToken()
    this.identity = this._userService.getIdentity()
    this.productoVendido = new Productos("","",0)
  }

  ngOnInit() {
  }

  recargarAnimales(refresher) {
    console.log('Begin async operation');
    
    setTimeout(() => {
      console.log('Async operation has ended');
      this.identity = this._userService.getIdentity()
      refresher.target.complete();
    }, 1000);
  }

  logout(){
    sessionStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
    
  }

  getProductos(){
    this._userService.getProductos(this.token).subscribe(
      response=>{
        this.productos = response.productos;
        console.log(this.productos);
      },
      error=>{
        var erroMessage = <any>error;
        console.log(erroMessage);
        if(erroMessage !=null){
          this.status = 'error';
        }
      }
    )
  }
  scan(){
    this.options = {
      prompt: 'Scan your barcode'
    };
    this.scanner.scan(this.options).then((data)=>{
      this.scannedData = data;
      this._userService.productoVendido(this.token, this.productoVendido ,this.scannedData.text).subscribe(
        response=>{
          this.status = 'ok'
          this.identity = response.usuario;
          sessionStorage.setItem('identity', JSON.stringify(response.usuario));
          console.log(response.usuario)
        },
        error=>{
          var erroMessage = <any>error;
          console.log(erroMessage);
          if(erroMessage !=null){
            this.status = 'error';
          }
        }
      )
    }, (err)=>{
      console.log('Error :', err);
     
    })
  }

  encode(textoQR){
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE, textoQR).then((data)=>{
      this.scannedData = data;
    }, (err)=>{
      console.log('Error :',err);
      
    })
  }

}
