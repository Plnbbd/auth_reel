/**
 * Composant de connexion
 * 
 * C'est la porte d'entrée de notre application. Ce composant :
 * - Affiche le formulaire de connexion
 * - Gère la saisie des identifiants
 * - Vérifie que tout est bien rempli
 * - Envoie les identifiants au serveur
 * - Gère les erreurs de connexion
 * - Redirige vers la bonne page une fois connecté
 * 
 * Le formulaire contient :
 * - Un champ pour le nom d'utilisateur
 * - Un champ pour le mot de passe
 * - Un bouton de connexion
 * - Des messages d'erreur si quelque chose ne va pas
 */

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService, AuthResponse, LoginCredentials } from '../../services/auth.service';

@Component({
  selector: 'app-login',
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
      <div class="persobodo"></div>
      <div class="content-grid">
        <!-- Left side - Icon -->
        <div class="icon-section">
          <div class="icon-card glass-card">
            <div class="icon-container">
            <img
              src="assets/images/img.png"
              alt="Airport Control Tower"
              class="hero-image"
            />
              <div class="icon-content">
               
                <p>Gestion personalisée, moderne et sécurisée des documents</p>
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
                <span class="logo-text">GED</span>
                <div class="airport-badge">
                  <mat-icon>flight</mat-icon>
                </div>
              </div>
              
              <h1 class="app-title gradient-text">GED ADCSA</h1>
              <p class="app-subtitle">Gestion Électronique des Documents</p>
              
              <div class="airport-info">
                <p class="airport-welcome">Bienvenue aux Aéroports du Cameroun</p>
                <p class="airport-location">Système de Gestion Documentaire Sécurisé</p>
              </div>
            </div>

            <div *ngIf="showError" class="error-message">
              <mat-icon>error</mat-icon>
              <span>{{errorMessage}}</span>
            </div>

            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline">
                <mat-label>Nom d'utilisateur ou Email</mat-label>
                <input matInput formControlName="email" placeholder="Entrez votre identifiant professionnel">
                <mat-icon matSuffix>person</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Mot de passe</mat-label>
                <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="motDePasse" placeholder="Entrez votre mot de passe">
                <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
                  <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                </button>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit" [disabled]="isLoading || loginForm.invalid" class="submit-btn">
                <mat-spinner *ngIf="isLoading" diameter="20" class="loading-spinner"></mat-spinner>
                <span *ngIf="!isLoading">Se connecter</span>
                <span *ngIf="isLoading">Connexion en cours...</span>
              </button>
            </form>

            <div class="forgot-password">
              <button mat-button (click)="navigateToReset()" class="forgot-link">
                Mot de passe oublié ?
              </button>
            </div>

            <div class="footer-info">
              <p><strong>© 2025 ADCSA - Aéroports du Cameroun</strong></p>
              <p>Système sécurisé SSL 256 bits | Version 2.1.0</p>
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

    .persobodo { 
      background-image: url('/assets/images/img7.png');
      background-repeat: no-repeat;   
      position: absolute;
      width: 100%;
      height: 110%;
      overflow: hidden;
      filter: blur(5px);
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
      background: linear-gradient(135deg, rgba(0, 107, 63, 0.1), rgba(0, 86, 179, 0.1)) !important;
    }

    .icon-container {
      text-align: center;
    }

    .main-icon {
      font-size: 120px;
      width: 120px;
      height: 120px;
      color: #006B3F;
      margin-bottom: 32px;
    }

    .icon-content {
      color: white;
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

    .logo-section {
      text-align: center;
      margin-bottom: 40px;
    }

    .logo {
      position: relative;
      display: inline-block;
      width: 80px;
      height: 80px;
      background: linear-gradient(145deg, #006B3F, #0056B3);
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-text {
      color: white;
      font-size: 24px;
      font-weight: bold;
    }

    .airport-badge {
      position: absolute;
      top: -10px;
      right: -10px;
      background: #FFD700;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .airport-badge mat-icon {
      color: #006B3F;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .app-title {
      font-size: 32px;
      font-weight: 700;
      margin: 16px 0 8px;
      background: linear-gradient(45deg, #006B3F, #0056B3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .app-subtitle {
      color: #666;
      font-size: 16px;
      margin-bottom: 24px;
    }

    .airport-info {
      margin-top: 24px;
    }

    .airport-welcome {
      color: #006B3F;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .airport-location {
      color: #666;
      font-size: 14px;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 16px;
    }

    .submit-btn {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      margin-top: 8px;
      background: linear-gradient(45deg, #006B3F, #0056B3);
    }

    .loading-spinner {
      margin-right: 8px;
    }

    .forgot-password {
      text-align: center;
      margin-top: 16px;
    }

    .forgot-link {
      color: #0056B3;
      font-size: 14px;
    }

    .footer-info {
      margin-top: 32px;
      text-align: center;
      color: #666;
      font-size: 12px;
    }

    .error-message {
      background-color: #ffebee;
      color: #c62828;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .error-message mat-icon {
      color: #c62828;
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.9) !important;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    }

    .cameroon-flag-accent {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(to right, #007A5E, #CE1126, #FCD116);
    }

    @media (max-width: 768px) {
      .content-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .icon-section {
        display: none;
      }

      .form-card {
        padding: 24px !important;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  // Le formulaire de connexion avec ses règles de validation
  loginForm: FormGroup;
  
  // Message d'erreur à afficher si la connexion échoue
  errorMessage: string = '';
  
  // Indique si une tentative de connexion est en cours
  // Utile pour désactiver le bouton pendant la connexion
  isLoading: boolean = false;

  hidePassword: boolean = true;
  showError: boolean = false;

  constructor(
    private fb: FormBuilder,    // Pour créer notre formulaire
    private authService: AuthService,    // Pour gérer la connexion
    private router: Router              // Pour naviguer après la connexion
  ) {
    // On crée notre formulaire avec ses règles
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Au démarrage du composant, on vérifie si l'utilisateur est déjà connecté
    // Si oui, on le redirige vers la page d'accueil
    // C'est utile si quelqu'un essaie d'accéder à /login alors qu'il est déjà connecté
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  /**
   * Méthode appelée quand l'utilisateur clique sur le bouton de connexion
   */
  onSubmit(): void {
    // On vérifie que le formulaire est valide
    if (this.loginForm.valid) {
      // On active l'indicateur de chargement
      this.isLoading = true;
      // On efface les messages d'erreur précédents
      this.errorMessage = '';

      // On récupère les identifiants saisis
      const credentials: LoginCredentials = {
        email: this.loginForm.get('email')?.value,
        motDePasse: this.loginForm.get('motDePasse')?.value
      };

      // On essaie de se connecter
      this.authService.login(credentials).subscribe({
        // Si la connexion réussit
        next: (response: AuthResponse) => {
          this.isLoading = false;  // On désactive le chargement
          
          // Log de débogage pour voir la réponse du serveur
          console.log('Réponse du serveur:', response);
          
          // Si la connexion est réussie, on redirige vers first-password
          if (response.success) {
            console.log('Connexion réussie, redirection vers first-password');
            this.router.navigate(['/first-password']);
          } else {
            // Si la connexion échoue, on affiche le message d'erreur
            this.errorMessage = response.message || 'Une erreur est survenue lors de la connexion';
          }
        },
        // Si la connexion échoue
        error: (error) => {
          this.isLoading = false;  // On désactive le chargement
          
          // Log de débogage pour voir l'erreur
          console.error('Erreur de connexion:', error);
          
          // On affiche un message d'erreur approprié
          if (error.status === 401) {
            // Si les identifiants sont incorrects
            this.errorMessage = 'Identifiants invalides';
          } else if (error.error?.errors) {
            // Si le serveur renvoie des erreurs de validation
            this.errorMessage = Object.values(error.error.errors).join(', ');
          } else {
            // Pour toute autre erreur
            this.errorMessage = 'Une erreur est survenue lors de la connexion';
          }
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

  navigateToReset() {
    this.router.navigate(['/reset-request']);
  }
}