import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Conferencias } from "../../models/conferencia.model";
import { ConferenciaService } from "../../services/conferencias.service";

@Component({
  selector: 'app-conferencias',
  templateUrl: './conferencias.page.html',
  styleUrls: ['./conferencias.page.scss'],
  providers: [UsersService, ConferenciaService]
})
export class ConferenciasPage implements OnInit {
  public status;
  public token;
  public identity;
  public conferencias: Conferencias;
  public conferenciaRegistrada: Conferencias;
  options: BarcodeScannerOptions;
  encodText: string = '';
  encodedData: any ={};
  scannedData: any = {};

  constructor(public scanner: BarcodeScanner,private _conferenciasService: ConferenciaService, private _userService: UsersService, private _router: Router,) {
    this.token = this._userService.getToken()
    this.identity = this._userService.getIdentity()
    this.conferenciaRegistrada = new Conferencias('','','','','',0, null ,'',0,null,0,[''],['']);
   }
  
  ngOnInit() {
    this.getConferences()
  }

//La funcion esta es la que esta en el servico llamda scanSpeak
  scan(){
    this.options = {
      prompt: 'Scan your barcode'
    };
    this.scanner.scan(this.options).then((data)=>{
      this.scannedData = data;
      this._conferenciasService.scanSpeak(this.token ,this.conferenciaRegistrada, this.scannedData.text).subscribe(
        response=>{
          this.status = 'ok'
          this.identity = response.message;
          sessionStorage.setItem('identity', JSON.stringify(response.message));
          console.log(response.message)
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

  public getConferences() {
    this._conferenciasService.getConferences().subscribe(
      response => {
        if (response.charlas) {
          console.log(response.charlas);
          this.conferencias = response.charlas;                    
          this.status = 'OK'
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {          
          this.status = 'error'
        }
      }
    )
  }

}
