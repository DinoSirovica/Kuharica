import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    clean(): void {
        window.sessionStorage.clear();
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem('auth-token');
        window.sessionStorage.setItem('auth-token', token);
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem('auth-token');
    }

    public isLoggedIn(): boolean {
        const token = window.sessionStorage.getItem('auth-token');
        return !!token;
    }
}
