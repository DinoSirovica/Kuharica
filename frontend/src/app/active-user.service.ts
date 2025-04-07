import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ActiveUserService {

  private activeUserSubject = new BehaviorSubject<any>(null);
  activeUser$ = this.activeUserSubject.asObservable();

  constructor() {}

  setActiveUser(user: any) {
    this.activeUserSubject.next(user);
  }

  getActiveUser() {
    return this.activeUserSubject.value;
  }

  clearActiveUser() {
    this.activeUserSubject.next(null);
  }
}
