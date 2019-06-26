import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Productos } from 'src/app/models/productos.model';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  providers: [UsersService]
})
export class ProductosPage implements OnInit {
  public productos: Productos
  public status;
  public token;
  public identity;
  scannedData: any = {};
  constructor(public scanner: BarcodeScanner,private _userService: UsersService) {
    this.token = this._userService.getToken()
    this.identity = this._userService.getIdentity()
   }

  ngOnInit() {
    this.getProductos()
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

  encode(textoQR){
    this.scanner.encode(this.scanner.Encode.TEXT_TYPE, textoQR).then((data)=>{
      this.scannedData = data;
    }, (err)=>{
      console.log('Error :',err);
      
    })
  }

}
