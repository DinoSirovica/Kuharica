import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ActiveUserService } from './active-user.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private activeUserService: ActiveUserService, private router: Router) { }

    canActivate(): Observable<boolean | UrlTree> {
        return this.activeUserService.activeUser$.pipe(
            map(user => {
                if (user && user.role === 'admin') {
                    return true;
                }
                return this.router.createUrlTree(['/']);
            })
        );
    }
}
