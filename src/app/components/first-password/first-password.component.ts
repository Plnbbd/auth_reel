import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-first-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  template: `
    <div class="page-container fade-in-up">
      <div class="content-grid">
        <!-- Left side - Image -->
        <div class="image-section">
          <div class="image-card">
            <img
              src="assets/images/img5.png"
              alt="Secure Aviation Technology"
              class="hero-image"
            />
            <div class="image-overlay">
              <div class="image-content">
                <h3>Sécurité Renforcée</h3>
                <p>Protection avancée des données ADCSA</p>
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
                <mat-icon class="logo-icon">shield</mat-icon>
                <div class="airport-badge">
                  <mat-icon>flight</mat-icon>
                </div>
              </div>
              
              <h1 class="app-title gradient-text">Configuration Initiale</h1>
              <p class="app-subtitle">Première connexion sécurisée</p>
              
              <div class="info-box">
                <p>Pour garantir la sécurité de votre compte ADCSA, vous devez définir un nouveau mot de passe lors de votre première connexion.</p>
              </div>
            </div>

            <form [formGroup]="passwordForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline">
                <mat-label>Nouveau mot de passe</mat-label>
                <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password" 
                       placeholder="Créez un mot de passe sécurisé" (input)="onPasswordChange()">
                <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                  <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
              </mat-form-field>

              <div *ngIf="passwordStrength.score > 0" class="password-strength">
                <mat-progress-bar 
                  mode="determinate" 
                  [value]="passwordStrength.percentage"
                  [color]="passwordStrength.color">
                </mat-progress-bar>
                <p class="strength-text">Force: {{passwordStrength.label}}</p>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Confirmer le mot de passe</mat-label>
                <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" formControlName="confirmPassword" 
                       placeholder="Confirmez votre mot de passe">
                <button mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" type="button">
                  <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
              </mat-form-field>

              <div class="policy-box">
                <div class="policy-header">
                  <mat-icon>security</mat-icon>
                  <h3>Politique de sécurité ADCSA</h3>
                </div>
                <ul class="policy-list">
                  <li><mat-icon>check</mat-icon>Minimum 8 caractères</li>
                  <li><mat-icon>check</mat-icon>Une majuscule et une minuscule</li>
                  <li><mat-icon>check</mat-icon>Au moins un chiffre</li>
                  <li><mat-icon>check</mat-icon>Un caractère spécial (&#64;, #, $, etc.)</li>
                  <li><mat-icon>check</mat-icon>Différent des 3 derniers mots de passe</li>
                </ul>
              </div>

              <button mat-raised-button color="primary" type="submit" [disabled]="passwordForm.invalid" class="submit-btn">
                Valider et Continuer
              </button>
            </form>
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
      background: linear-gradient(145deg, #0056B3, #6A1B9A);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
      box-shadow: 0 16px 32px rgba(0, 86, 179, 0.3);
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
      background: linear-gradient(135deg, rgba(0, 86, 179, 0.05), rgba(106, 27, 154, 0.05));
      padding: 16px;
      border-radius: 12px;
      border: 1px solid rgba(0, 86, 179, 0.2);
      color: #0056B3;
      font-weight: 500;
      font-size: 14px;
      line-height: 1.5;
    }

    .password-strength {
      margin-top: 12px;
      margin-bottom: 16px;
    }

    .strength-text {
      margin-top: 8px;
      font-size: 13px;
      color: #666;
      font-weight: 600;
    }

    .policy-box {
      background: linear-gradient(135deg, rgba(0, 107, 63, 0.03), rgba(0, 86, 179, 0.03));
      padding: 20px;
      border-radius: 12px;
      margin: 20px 0;
      border: 1px solid rgba(0, 107, 63, 0.1);
    }

    .policy-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      color: #006B3F;
    }

    .policy-header h3 {
      font-weight: 700;
      margin: 0;
      font-size: 16px;
    }

    .policy-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .policy-list li {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 0;
      font-weight: 500;
      color: #666;
      font-size: 14px;
    }

    .policy-list mat-icon {
      color: #2ECC71;
      font-size: 16px;
      width: 16px;
      height: 16px;
    }

    .submit-btn {
      width: 100%;
      padding: 16px !important;
      font-size: 16px !important;
      font-weight: 700 !important;
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
export class FirstPasswordComponent {
  passwordForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  passwordStrength = { score: 0, label: '', color: 'warn', percentage: 0 };

  constructor(private fb: FormBuilder, private router: Router) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onPasswordChange() {
    const password = this.passwordForm.get('password')?.value || '';
    this.passwordStrength = this.calculatePasswordStrength(password);
  }

  calculatePasswordStrength(password: string) {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 3) return { score, label: 'Faible', color: 'warn', percentage: 25 };
    if (score < 5) return { score, label: 'Moyen', color: 'accent', percentage: 60 };
    return { score, label: 'Fort', color: 'primary', percentage: 100 };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      this.router.navigate(['/dashboard']);
    }
  }
}