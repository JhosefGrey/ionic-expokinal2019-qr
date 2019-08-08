import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from "../../services/users.service";
import { User } from "../../models/user.model";
import { Router } from '@angular/router';
import { ToastController } from "@ionic/angular";


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  providers: [UsersService]
})
export class RegistroPage implements OnInit {
  @ViewChild('registroForm') formValuesLogin;
  public user: User;
  public status;
  public loading: boolean;
  public cont: number;
  constructor(private _userService: UsersService,private _router: Router,public toastController: ToastController) {
    this.user = new User('','', '', '', '', '', [{ productTableId: '', nombreProducto: '', cantidad: 0, precioIndividual: 0, totalProducto: 0 }], 0, '')
    this.loading = false
    this.cont = 0
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se ha registrado el usuario.',
      duration: 2000
    });
    toast.present();
  }
  async badToast() {
    const toast = await this.toastController.create({
      message: 'No se ha podido regostrar el usuario.',
      duration: 2000
    });
    toast.present();
  }
  
  ngOnInit() {
  }

  public cleanVarieables() {
    this.user = new User('','', '', '', '', '', [{ productTableId: '', nombreProducto: '', cantidad: 0, precioIndividual: 0, totalProducto: 0 }], 0, '')
  }

  public activarCarga() {
    this.loading = true;
  }

  public desactivarCarga() {
    this.loading = false;
  }

  public register() {
    setTimeout(() => {
      this._userService.register(this.user).subscribe(
        response => {
          if (response) {
            console.log(response)
            this.desactivarCarga()
            if (response.message == 'Usuario creado exitosamente') {
              this.presentToast();
              this.status = 'OK'
              this._router.navigate(['/login']);
              this.cleanVarieables()
            }else{
              this.badToast();
            }
          }
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
            this.loading = false;
            this.badToast();
            this.status = 'error'
            this.cleanVarieables()
          }
        }
      )
    }, 1500);
  }

}
