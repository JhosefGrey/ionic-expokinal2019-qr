import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { GLOBAL } from './global.service';
import { Productos } from '../models/productos.model';



@Injectable ()
export class UsersService{
    
    public url:string;
    public identity;
    public token;
    public stats;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }

    getProductos(token) :Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);

        return this._http.get(this.url+'productos', {headers: headers});
    }

    productoVendido(token, producto:Productos ,idProducto) :Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        let params = JSON.stringify(producto);
        console.log(headers)
        return this._http.put(this.url+'productoVendido/'+idProducto,params,{headers: headers} );
    }

    register(user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        
        return this._http.post(this.url+'registrar', params, {headers: headers});
    }

    login(user, gettoken = null): Observable<any>{

        if(gettoken != null){
            user.gettoken = gettoken;
        }

        let params = JSON.stringify(user);
        console.log(params)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url+'login', params, {headers: headers});
    }

    getIdentity(){
        var identity = JSON.parse(sessionStorage.getItem('identity'));
        
        if(identity != "undefined"){
            this.identity = identity;
        }else{
            this.identity = null;
        }

        return this.identity;
    }

    getToken(){
        let token = sessionStorage.getItem('token');

        if(token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }



    updateUser(user: User):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());

        return this._http.put(this.url+'update-user/'+user._id, params, {headers: headers});
    }

    getUsers(page = null):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());

        return this._http.get(this.url+'users/'+page, {headers: headers});
    }


    getUser(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json').set('Authorization', this.getToken());

        return this._http.get(this.url+'user/'+id, {headers: headers});
    }


}