import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})

export class ActiveUserService {

  private activeUserSubject = new BehaviorSubject<any>(null);
  activeUser$ = this.activeUserSubject.asObservable();

  constructor(private storageService: StorageService, private apiService: ApiServiceService) {
    if (this.storageService.isLoggedIn()) {
      this.apiService.getMe().subscribe(
        (response: any) => {
          this.activeUserSubject.next(response.user);
        },
        (error) => {
          console.error('Failed to fetch user on init:', error);
          this.storageService.clean();
        }
      );
    }
  }

  setActiveUser(user: any) {
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
