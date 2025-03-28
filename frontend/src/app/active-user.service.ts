import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveUserService {
  activeUser: any;

  constructor() { }

  setActiveUser(user: any) {
    this.activeUser = user;
  }

  getActiveUser() {
    return this.activeUser;
  }

  clearActiveUser() {
    this.activeUser = null;
  }
}
