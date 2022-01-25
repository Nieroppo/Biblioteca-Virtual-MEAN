import { Injectable } from "@angular/core";
import { HttpEvent, HttpRequest , HttpHandler , HttpInterceptor} from "@angular/common/http";
import { AuthUserService } from "./authUser.service";
import { Observable } from "rxjs";
@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
    
    constructor( private authUserService: AuthUserService){}
    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>{
        
        const token = this.authUserService.getToken();
        
        const tokenizeReq = req.clone({
            setHeaders:{
                Authorization: `Bearer ${token}` 
            }
        })
        return next.handle(tokenizeReq);
    }
}
