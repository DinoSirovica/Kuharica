import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private readonly USER_KEY = 'auth-user';
    private readonly TWO_HOURS_MS = 2 * 60 * 60 * 1000;

    constructor() { }

    clean(): void {
        window.sessionStorage.clear();
    }

    public saveUser(user: any): void {
        window.sessionStorage.removeItem(this.USER_KEY);
        const data = {
            user: user,
            timestamp: Date.now()
        };
        window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(data));
    }

    public getUser(): any {
        const storedData = window.sessionStorage.getItem(this.USER_KEY);
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            const timestamp = parsedData.timestamp;

            if (Date.now() - timestamp < this.TWO_HOURS_MS) {
                return parsedData.user;
            } else {
                this.clean();
                return null;
            }
        }
        return null;
    }

    public isLoggedIn(): boolean {
        const user = window.sessionStorage.getItem(this.USER_KEY);
        return !!user;
    }
}
