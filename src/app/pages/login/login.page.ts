import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [UsersService]
})
export class LoginPage implements OnInit {
  @ViewChild('loginForm') formValuesLogin;
  public user: User;
  public identity;
  public token;
  public status;
  constructor(
    private _router: Router,
    private _userService: UsersService
  ) { 
    
    this.user = new User("", "", "", "", "", "", 
    [{
      productTableId: "",
      nombreProducto: "",
      cantidad: 0,
      precioIndividual: 0,
      totalProducto: 0
    }], 0, "");
  }
 
  
  ngOnInit() {
  }

    getToken(){
      this._userService.login(this.user, 'true').subscribe(
        response=>{
          
          this.token = response.token;
          if(this.token.length <= 0){
            this.status = 'error'
          }else{
            this.formValuesLogin.resetForm();
            sessionStorage.setItem('token', this.token)
            this.user = new User("", "", "", "", "", "", 
              [{
                productTableId: "",
                nombreProducto: "",
                cantidad: 0,
                precioIndividual: 0,
                totalProducto: 0
              }], 0, "");
            this._router.navigate(['/tabs'])
            
          }
        },
        error=>{
          var errorMessage = <any>error;
          console.log(errorMessage)
          if(errorMessage !=null){
            this.status = 'error'
          }
        }
        
      )
    }

    login(){
      this._userService.login(this.user).subscribe(
        response=>{
          this.identity = response.user;
          if(!this.identity){
            this.status = 'error'
          }else{
            sessionStorage.setItem('identity', JSON.stringify(this.identity));
            this.getToken();
            this.status = 'ok';
            
          }
          
        },
        error=>{
          var errorMessage = <any>error;
          console.log(errorMessage)
          if(errorMessage !=null){
            this.status = 'error'
          }
        }
      )
    }


}
