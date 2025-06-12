/**
 * Guard d'authentification
 * 
 * Ce guard protège les routes qui nécessitent une authentification.
 * Il vérifie si l'utilisateur est connecté avant de lui permettre
 * d'accéder à une page protégée.
 * 
 * Comment ça marche :
 * 1. Quand l'utilisateur essaie d'accéder à une page protégée
 * 2. Le guard vérifie si l'utilisateur est connecté
 * 3. Si oui, il laisse passer
 * 4. Si non, il redirige vers la page de connexion
 */

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,  // Service d'authentification
    private router: Router            // Service de navigation
  ) {}

  /**
   * Méthode appelée par Angular pour vérifier si l'accès est autorisé
   * @returns true si l'accès est autorisé, false sinon
   */
  canActivate(): boolean {
    // On vérifie si l'utilisateur est connecté
    if (this.authService.isAuthenticated()) {
      // Si oui, on autorise l'accès
      return true;
    }

    // Si non, on redirige vers la page de connexion
    this.router.navigate(['/login']);
    return false;
  }
} 