import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reset-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="page-container fade-in-up">
      <div class="content-grid">
        <!-- Left side - Image -->
        <div class="image-section">
          <div class="image-card">
            <img
              src="assets/images/img4.png"
              alt="Airport Terminal Modern"
              class="hero-image"
            />
            <div class="image-overlay">
              <div class="image-content">
                <h3>Nouveau Départ</h3>
                <p>Votre sécurité, notre priorité</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right side - Form -->
        <div class="form-section">
          <mat-card class="form-card glass-card">
            <div class="cameroon-flag-accent"></div>
            
            <div class="logo-section">
              <div class="logo">
                <mat-icon class="logo-icon">lock</mat-icon>
                <div class="airport-badge">
                  <mat-icon>flight</mat-icon>
                </div>
              </div>
              
              <h1 class="app-title gradient-text">Nouveau Mot de Passe</h1>
              <p class="app-subtitle">Finalisation de la récupération</p>
            </div>

            <div class="success-message">
              <mat-icon>check_circle</mat-icon>
              <span>Lien de récupération validé. Créez votre nouveau mot de passe sécurisé.</span>
            </div>

            <form [formGroup]="resetForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline">
                <mat-label>Nouveau mot de passe</mat-label>
                <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" 
                       placeholder="Créez un mot de passe robuste">
                <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                  <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Confirmer le mot de passe</mat-label>
                <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" formControlName="confirmPassword" 
                       placeholder="Confirmez votre nouveau mot de passe">
                <button mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" type="button">
                  <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
              </mat-form-field>

              <div class="tips-box">
                <h3>Conseils de sécurité</h3>
                <ul>
                  <li>• Utilisez un mot de passe unique pour votre compte ADCSA</li>
                  <li>• Évitez les informations personnelles facilement devinables</li>
                  <li>• Changez votre mot de passe régulièrement</li>
                  <li>• Ne partagez jamais vos identifiants</li>
                </ul>
              </div>

              <button mat-raised-button color="primary" type="submit" [disabled]="resetForm.invalid" class="submit-btn">
                Confirmer le nouveau mot de passe
              </button>
            </form>

            <div class="footer-note">
              <p>Après confirmation, vous serez redirigé vers la page de connexion</p>
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
      gap: 24px;
      align-items: stretch;
    }

    .image-section {
      display: flex;
      justify-content: center;
      height: 100%;
    }

    .image-card {
      position: relative;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 24px 48px rgba(0, 107, 63, 0.2);
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }

    .hero-image {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: blur(0px);
      transition: filter 2s easy;
    }

    .image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, 
        rgba(0, 107, 63, 0.8) 0%,
        rgba(0, 107, 63, 0.6) 20%,
        rgba(0, 107, 63, 0.4) 40%,
        rgba(0, 107, 63, 0.2) 60%,
        rgba(0, 107, 63, 0) 100%
      );
      display: flex;
      align-items: flex-end;
      //backdrop-filter: blur(2px);
    }

    .image-content {
      padding: 32px;
      color: white;
      width: 100%;
      background: linear-gradient(to top,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0.2) 50%,
        transparent 100%
      );
    }

    .image-content h3 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .image-content p {
      font-size: 16px;
      opacity: 0.9;
    }

    .form-section {
      display: flex;
      justify-content: center;
      height: 100%;
    }

    .form-card {
      padding: 48px !important;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .logo-section {
      text-align: center;
      margin-bottom: 40px;
    }

    .logo {
      position: relative;
      display: inline-block;
      width: 80px;
      height: 80px;
      background: linear-gradient(145deg, #006B3F, #00897B);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      box-shadow: 0 16px 32px rgba(0, 107, 63, 0.3);
    }

    .logo-icon {
      color: white;
      font-size: 40px;
      z-index: 1;
    }

    .app-title {
      font-size: 28px;
      font-weight: 800;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }

    .app-subtitle {
      color: #666;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .success-message {
      background: linear-gradient(135deg, #F0FDF4, #DCFCE7);
      border: 2px solid #2ECC71;
      color: #059669;
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
    }

    .tips-box {
      background: linear-gradient(135deg, rgba(0, 86, 179, 0.03), rgba(63, 81, 181, 0.03));
      padding: 20px;
      border-radius: 12px;
      margin: 20px 0;
      border: 1px solid rgba(0, 86, 179, 0.2);
    }

    .tips-box h3 {
      color: #0056B3;
      font-weight: 700;
      margin-bottom: 12px;
      font-size: 16px;
    }

    .tips-box ul {
      list-style: none;
      padding: 0;
      margin: 0;
      color: #0056B3;
      font-size: 14px;
    }

    .tips-box li {
      padding: 4px 0;
      font-weight: 500;
    }

    .submit-btn {
      width: 100%;
      padding: 16px !important;
      font-size: 16px !important;
      font-weight: 700 !important;
      margin-bottom: 24px !important;
    }

    .footer-note {
      text-align: center;
      font-size: 14px;
      color: #666;
    }

    @media (max-width: 968px) {
      .content-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .image-section {
        order: 2;
        height: 400px;
      }

      .form-section {
        order: 1;
      }

      .hero-image {
        height: 100%;
      }
    }

    @media (max-width: 768px) {
      .form-card {
        padding: 32px 24px !important;
        margin: 16px;
      }

      .image-section {
        margin: 16px;
        height: 300px;
      }
    }
  `]
})
export class ResetFormComponent {
  resetForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.router.navigate(['/login']);
    }
  }
}