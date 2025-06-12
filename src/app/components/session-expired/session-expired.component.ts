import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-session-expired',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="page-container fade-in-up">
      <div class="content-grid">
        <!-- Left side - Icon -->
        <div class="icon-section">
          <div class="icon-card glass-card">
            <div class="icon-container">
              <mat-icon class="main-icon">schedule</mat-icon>
              <div class="icon-content">
                <h3>Sécurité Active</h3>
                <p>Protection continue 24h/24</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side - Content -->
        <div class="form-section">
          <mat-card class="form-card glass-card">
            <div class="cameroon-flag-accent"></div>
            
            <div class="expired-content">
              <div class="expired-icon pulse">
                <mat-icon>schedule</mat-icon>
              </div>
              
              <h1 class="expired-title">Session Expirée</h1>
              <p class="expired-message">
                Votre session ADCSA a expiré pour des raisons de sécurité.<br>
                Veuillez vous reconnecter pour continuer.
              </p>

              <div class="security-info">
                <h3>Pourquoi cette sécurité ?</h3>
                <ul>
                  <li>
                    <mat-icon>security</mat-icon>
                    Protection contre les accès non autorisés
                  </li>
                  <li>
                    <mat-icon>verified_user</mat-icon>
                    Conformité aux standards de sécurité aéroportuaire
                  </li>
                  <li>
                    <mat-icon>save</mat-icon>
                    Sauvegarde automatique de vos données
                  </li>
                  <li>
                    <mat-icon>shield</mat-icon>
                    Prévention des fuites d'informations sensibles
                  </li>
                </ul>
              </div>

              <button mat-raised-button color="primary" (click)="navigateToLogin()" class="reconnect-btn">
                <mat-icon>login</mat-icon>
                Se reconnecter maintenant
              </button>

              <div class="session-info">
                <p>Temps de session par défaut: 30 minutes d'inactivité</p>
                <p>Pour toute assistance: support&#64;adcsa.cm</p>
              </div>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .content-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      align-items: center;
    }

    .icon-section {
      display: flex;
      justify-content: center;
    }

    .icon-card {
      width: 100%;
      max-width: 500px;
      padding: 48px !important;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(255, 152, 0, 0.1)) !important;
    }

    .icon-container {
      text-align: center;
    }

    .main-icon {
      font-size: 120px;
      width: 120px;
      height: 120px;
      color: #F44336;
      margin-bottom: 32px;
    }

    .icon-content {
      color: #F44336;
    }

    .icon-content h3 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .icon-content p {
      font-size: 16px;
      opacity: 0.9;
    }

    .form-section {
      display: flex;
      justify-content: center;
    }

    .form-card {
      padding: 48px !important;
      max-width: 500px;
      width: 100%;
    }

    .expired-content {
      text-align: center;
    }

    .expired-icon {
      width: 96px;
      height: 96px;
      background: linear-gradient(145deg, #F44336, #FF5722);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 32px;
      box-shadow: 0 16px 32px rgba(244, 67, 54, 0.3);
    }

    .expired-icon mat-icon {
      color: white;
      font-size: 48px;
      width: 48px;
      height: 48px;
    }

    .expired-title {
      font-size: 28px;
      font-weight: 800;
      color: #333;
      margin-bottom: 24px;
    }

    .expired-message {
      color: #666;
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 32px;
    }

    .security-info {
      background: linear-gradient(135deg, rgba(255, 152, 0, 0.05), rgba(244, 67, 54, 0.05));
      padding: 24px;
      border-radius: 12px;
      margin-bottom: 32px;
      border: 1px solid rgba(255, 152, 0, 0.2);
      text-align: left;
    }

    .security-info h3 {
      color: #FF9800;
      font-weight: 700;
      margin-bottom: 16px;
      font-size: 16px;
      text-align: center;
    }

    .security-info ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .security-info li {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
      color: #666;
      font-size: 14px;
      font-weight: 500;
    }

    .security-info mat-icon {
      color: #FF9800;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .reconnect-btn {
      width: 100%;
      padding: 16px !important;
      font-size: 18px !important;
      font-weight: 700 !important;
      margin-bottom: 32px !important;
    }

    .reconnect-btn mat-icon {
      margin-right: 8px;
    }

    .session-info {
      font-size: 14px;
      color: #999;
    }

    .session-info p {
      margin-bottom: 8px;
    }

    @media (max-width: 968px) {
      .content-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }

      .icon-section {
        order: 2;
      }

      .form-section {
        order: 1;
      }

      .icon-card {
        padding: 32px !important;
      }

      .main-icon {
        font-size: 80px;
        width: 80px;
        height: 80px;
      }
    }

    @media (max-width: 768px) {
      .form-card {
        padding: 32px 24px !important;
        margin: 16px;
      }

      .icon-card {
        margin: 16px;
        padding: 24px !important;
      }

      .main-icon {
        font-size: 60px;
        width: 60px;
        height: 60px;
      }
    }
  `]
})
export class SessionExpiredComponent {
  constructor(private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}