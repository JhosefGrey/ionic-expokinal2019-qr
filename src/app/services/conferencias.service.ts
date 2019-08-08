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
    scanSpeak(id):Observable<any>{        
        let headers = new HttpHeaders().set('Content-type','application/json').set('Authorization', this._userService.getToken());

        return this._http.put(this.url + '/charla/check/'+id, null ,{headers: headers});
    }

}