import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-reset-request',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="page-container fade-in-up">
      <div class="content-grid">
        <!-- Left side - Image -->
        <div class="image-section">
          <div class="image-card">
            <img
              src="assets/images/img6.png"
              alt="Airport Security"
              class="hero-image"
            />
            <div class="image-overlay">
              <div class="image-content">
                <h3>Récupération Sécurisée</h3>
                <p>Processus de récupération certifié ADCSA</p>
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
                <mat-icon class="logo-icon">vpn_key</mat-icon>
                <div class="airport-badge">
                  <mat-icon>flight</mat-icon>
                </div>
              </div>
              
              <h1 class="app-title gradient-text">Récupération de Compte</h1>
              <p class="app-subtitle">Réinitialisation sécurisée</p>
              
              <div class="info-box">
                <p>Saisissez votre adresse email professionnelle ADCSA pour recevoir les instructions de récupération.</p>
              </div>
            </div>

            <div *ngIf="!isSubmitted">
              <form [formGroup]="resetForm" (ngSubmit)="onSubmit()">
                <mat-form-field appearance="outline">
                  <mat-label>Adresse email professionnelle</mat-label>
                  <input matInput type="email" formControlName="email" placeholder="prenom.nom@adcsa.cm">
                  <mat-icon matSuffix>email</mat-icon>
                </mat-form-field>

                <div class="warning-box">
                  <mat-icon>warning</mat-icon>
                  <div>
                    <p><strong>Important</strong></p>
                    <p>Vérifiez votre boîte email (y compris les spams) après envoi.</p>
                  </div>
                </div>

                <button mat-raised-button color="primary" type="submit" [disabled]="resetForm.invalid" class="submit-btn">
                  Envoyer le lien de récupération
                </button>
              </form>

              <div class="back-link">
                <button mat-button (click)="navigateToLogin()" class="back-btn">
                  <mat-icon>arrow_back</mat-icon>
                  Retour à la connexion
                </button>
              </div>
            </div>

            <div *ngIf="isSubmitted" class="success-section">
              <div class="success-icon">
                <mat-spinner diameter="64" color="primary"></mat-spinner>
              </div>
              <h3>Email envoyé avec succès</h3>
              <p>Un lien de récupération a été envoyé à<br>
                <strong class="email-highlight">{{resetForm.get('email')?.value}}</strong>
              </p>
              <p class="redirect-text">Redirection automatique en cours...</p>
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
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .image-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, 
        transparent 0%,
        rgba(0, 107, 63, 0.2) 50%,
        rgba(0, 107, 63, 0.8) 100%
      );
      display: flex;
      align-items: flex-end;
    }

    .image-content {
      padding: 32px;
      color: white;
      width: 100%;
      background: linear-gradient(to top,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.3) 50%,
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
      background: linear-gradient(145deg, #E4A924, #FF8F00);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      box-shadow: 0 16px 32px rgba(228, 169, 36, 0.3);
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

    .info-box {
      background: linear-gradient(135deg, rgba(228, 169, 36, 0.05), rgba(255, 143, 0, 0.05));
      padding: 16px;
      border-radius: 12px;
      border: 1px solid rgba(228, 169, 36, 0.2);
      color: #E4A924;
      font-weight: 500;
      font-size: 14px;
      line-height: 1.5;
    }

    .warning-box {
      background: linear-gradient(135deg, #FFF8E1, #FFECB3);
      border: 2px solid #E4A924;
      color: #E65100;
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 24px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .warning-box mat-icon {
      color: #E4A924;
      margin-top: 2px;
    }

    .warning-box p {
      margin: 0;
      font-size: 14px;
    }

    .warning-box p:first-child {
      font-weight: 600;
      margin-bottom: 4px;
    }

    .submit-btn {
      width: 100%;
      padding: 16px !important;
      font-size: 16px !important;
      font-weight: 700 !important;
      margin-bottom: 24px !important;
    }

    .back-link {
      text-align: center;
    }

    .back-btn {
      color: #E4A924 !important;
      font-weight: 600 !important;
    }

    .success-section {
      text-align: center;
      padding: 40px 0;
    }

    .success-icon {
      margin-bottom: 24px;
    }

    .success-section h3 {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin-bottom: 16px;
    }

    .success-section p {
      color: #666;
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .email-highlight {
      color: #006B3F;
    }

    .redirect-text {
      font-size: 14px;
      color: #999;
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
export class ResetRequestComponent {
  resetForm: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.isSubmitted = true;
      setTimeout(() => {
        this.router.navigate(['/reset-form']);
      }, 3000);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}