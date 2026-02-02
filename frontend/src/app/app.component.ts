import { Component, OnInit } from '@angular/core';
import { ActiveUserService } from './active-user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'frontend';
  activeUser: any;

  constructor(
    private ActiveUserService: ActiveUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ActiveUserService.activeUser$.subscribe(user => {
      this.activeUser = user;
    });
  }
  
  logoutUser() {
    this.ActiveUserService.clearActiveUser();
    console.log("Log out");
    this.router.navigate(['/']);
  }

toggleMenu() {
  const hamburger = document.querySelector('.hamburger') as HTMLElement;
  const nav = document.querySelector('.navigation') as HTMLElement;
  const home = document.querySelector('.home') as HTMLElement;
  const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;

  if (!hamburger || !nav || !home || !mobileMenu) return;

  const isActive = hamburger.classList.contains('active');
  
  if (!isActive) {
    // OPENING - Lock scroll MULTIPLE ways
    home.style.opacity = '0';
    home.style.transform = 'translateX(-100%)';
    mobileMenu.style.display = 'flex';
    
    // TRIPLE scroll lock
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;
  } else {
    // CLOSING - Unlock scroll
    home.style.opacity = '1';
    home.style.transform = 'translateX(0)';
    mobileMenu.style.display = 'none';
    
    // Restore ALL scroll properties
    const scrollY = document.body.style.top;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  // Toggle classes
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
}

closeMenu() {
  const hamburger = document.querySelector('.hamburger') as HTMLElement;
  const nav = document.querySelector('.navigation') as HTMLElement;
  const home = document.querySelector('.home') as HTMLElement;
  const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;

  if (hamburger && nav && home && mobileMenu) {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    home.style.opacity = '1';
    home.style.transform = 'translateX(0)';
    mobileMenu.style.display = 'none';
    
    // Unlock scroll
    const scrollY = document.body.style.top;
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
}


}