import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class ActiveUserService {

  private activeUserSubject = new BehaviorSubject<any>(null);
  activeUser$ = this.activeUserSubject.asObservable();

  constructor(private storageService: StorageService) {
    const user = this.storageService.getUser();
    if (user) {
      this.activeUserSubject.next(user);
    }
  }

  setActiveUser(user: any) {
    this.storageService.saveUser(user);
    this.activeUserSubject.next(user);
  }

  getActiveUser() {
    return this.activeUserSubject.value;
  }

  clearActiveUser() {
    this.storageService.clean();
    this.activeUserSubject.next(null);
  }
}
