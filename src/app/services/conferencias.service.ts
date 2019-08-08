import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Conferencias } from "../models/conferencia.model";
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable()
export class ConferenciaService {
    public url: string;
    public identity;
    public token;

    constructor(public _http: HttpClient, public _userService: UsersService) {
        this.url = GLOBAL.url;
    }
    scanSpeak(token, conferencia:Conferencias ,id) :Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        let params = JSON.stringify(conferencia);
        console.log(headers)
        return this._http.put(this.url+'check/'+id,params,{headers: headers} );
    }
    getConferences(): Observable<any> {
        let headers = new HttpHeaders().set('Content-type', 'application/json');

        return this._http.get(this.url+'charlas', { headers: headers })
    }
}