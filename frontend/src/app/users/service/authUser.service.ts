import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Global } from '../../global';
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthUserService {
    public url: string;

    constructor(
        private _http: HttpClient,
        private router: Router
    ){
        this.url = Global.url;
    }

    login(user: User): Observable<any>{
        return this._http.post(this.url+'user/login',user); 
    }
    isLogged(){
        return !! localStorage.getItem('token');
    }
    getToken(){        
        return localStorage.getItem('token');
    }
    logout() : void{
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}
