import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule],
  template: `
    <mat-card class="navigation-card glass-card">
      <div class="nav-buttons">
        <button 
          mat-raised-button 
          [class.active]="isActive('/login')"
          (click)="navigate('/login')"
          class="nav-btn">
          Connexion
        </button>
        <button 
          mat-raised-button 
          [class.active]="isActive('/first-password')"
          (click)="navigate('/first-password')"
          class="nav-btn">
          Premier Changement
        </button>
        <button 
          mat-raised-button 
          [class.active]="isActive('/reset-request')"
          (click)="navigate('/reset-request')"
          class="nav-btn">
          Réinitialisation
        </button>
        <button 
          mat-raised-button 
          [class.active]="isActive('/reset-form')"
          (click)="navigate('/reset-form')"
          class="nav-btn">
          Nouveau Mot de Passe
        </button>
        <button 
          mat-raised-button 
          [class.active]="isActive('/session-expired')"
          (click)="navigate('/session-expired')"
          class="nav-btn">
          Session Expirée
        </button>
        <button 
          mat-raised-button 
          [class.active]="isActive('/dashboard')"
          (click)="navigate('/dashboard')"
          class="nav-btn">
          Tableau de Bord
        </button>
      </div>
    </mat-card>
  `,
  styles: [`
    .navigation-card {
      padding: 24px !important;
      margin-bottom: 0;
    }

    .nav-buttons {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .nav-btn {
      background: rgba(255, 255, 255, 0.2) !important;
      color: white !important;
      border: 1px solid rgba(255, 255, 255, 0.3) !important;
      padding: 12px 24px !important;
      border-radius: 30px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
      position: relative;
      overflow: hidden;
    }

    .nav-btn:hover {
      background: rgba(255, 255, 255, 0.3) !important;
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 12px 24px rgba(0, 107, 63, 0.2) !important;
    }

    .nav-btn.active {
      background: linear-gradient(145deg, #E4A924, #C31E39) !important;
      color: white !important;
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 12px 24px rgba(228, 169, 36, 0.4) !important;
    }

    .nav-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }

    .nav-btn:hover::before {
      left: 100%;
    }

    @media (max-width: 768px) {
      .nav-buttons {
        gap: 8px;
      }
      
      .nav-btn {
        padding: 10px 16px !important;
        font-size: 12px !important;
      }
    }
  `]
})
export class NavigationComponent {
  constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([path]);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }
}