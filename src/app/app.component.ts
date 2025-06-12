/**
 * Composant principal de l'application
 * 
 * Ce composant est le point d'entrée de l'application. Il :
 * - Gère la structure globale de l'application
 * - Affiche la barre de navigation uniquement sur le dashboard
 * - Gère l'affichage conditionnel des éléments
 * - S'occupe de la déconnexion
 * 
 * La barre de navigation est affichée uniquement :
 * - Sur la page dashboard
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  template: `
    <nav *ngIf="shouldShowNavbar()">
      <div class="nav-content">
        <!-- Logo et titre -->
        <div class="nav-brand">
          <img src="assets/logo.png" alt="Logo" class="nav-logo">
          <span class="nav-title">GED</span>
        </div>

        <!-- Liens de navigation -->
        <div class="nav-links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
            Accueil
          </a>
          <a routerLink="/dashboard" routerLinkActive="active">
            Tableau de bord
          </a>
          <a routerLink="/profile" routerLinkActive="active">
            Profil
          </a>
          <a routerLink="/settings" routerLinkActive="active">
            Paramètres
          </a>
        </div>

        <!-- Bouton de déconnexion -->
        <button class="logout-btn" (click)="logout()">
          Se déconnecter
        </button>
      </div>
    </nav>

    <main [class.with-navbar]="shouldShowNavbar()">
      <router-outlet></router-outlet>
    </main>

    <app-footer></app-footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    nav {
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 1rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .nav-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-brand {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .nav-logo {
      height: 40px;
    }

    .nav-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #333;
    }

    .nav-links {
      display: flex;
      gap: 2rem;
    }

    .nav-links a {
      color: #666;
      text-decoration: none;
      padding: 0.5rem;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .nav-links a:hover {
      color: #333;
      background-color: #f5f5f5;
    }

    .nav-links a.active {
      color: #1976d2;
      font-weight: 500;
    }

    .logout-btn {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .logout-btn:hover {
      background-color: #d32f2f;
    }

    main {
      flex: 1;
      padding: 20px;
    }

    main.with-navbar {
      padding-top: 80px;
    }
  `]
})
export class AppComponent {
  currentUrl = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Surveiller les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.url;
    });
  }

  /**
   * Détermine si la navbar doit être affichée
   * La navbar n'est affichée que sur la page dashboard
   */
  shouldShowNavbar(): boolean {
    return this.currentUrl === '/dashboard';
  }

  /**
   * Déconnecte l'utilisateur
   * Cette méthode est appelée quand l'utilisateur clique sur le bouton de déconnexion
   */
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}