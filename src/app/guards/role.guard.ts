/**
 * Guard de protection des routes basé sur les rôles utilisateur
 * 
 * Imaginez ce guard comme un videur de boîte de nuit :
 * - Il vérifie si vous avez le bon bracelet (rôle) pour entrer
 * - Si vous n'avez pas le bon bracelet, il vous redirige vers l'entrée
 * - Il peut vérifier plusieurs types de bracelets (plusieurs rôles)
 * 
 * Comment l'utiliser dans les routes :
 * {
 *   path: 'admin',                    // La page qu'on veut protéger
 *   component: AdminComponent,        // Le composant à afficher
 *   canActivate: [RoleGuard],         // On active notre videur
 *   data: { roles: ['ADMIN'] }        // On lui dit quels bracelets sont acceptés
 * }
 * 
 * Exemple concret :
 * - Un utilisateur normal essaie d'accéder à /admin
 * - Le guard vérifie ses rôles
 * - Comme il n'est pas admin, il est redirigé vers la page de connexion
 * - Un message d'erreur lui explique pourquoi il n'a pas accès
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'  // Notre videur est disponible partout dans l'application
})
export class RoleGuard {
  constructor(
    private authService: AuthService,  // Pour vérifier les rôles de l'utilisateur
    private router: Router            // Pour rediriger si accès refusé
  ) {}

  /**
   * Méthode appelée par Angular à chaque fois qu'on essaie d'accéder à une route protégée
   * 
   * C'est comme le processus de vérification du videur :
   * 1. Il regarde la liste des bracelets acceptés (roles requis)
   * 2. Si la liste est vide, tout le monde peut entrer
   * 3. Sinon, il vérifie si vous avez au moins un des bracelets requis
   * 4. Si vous n'avez pas le bon bracelet, il vous redirige
   * 
   * @param route - La route qu'on essaie d'atteindre, avec ses règles d'accès
   * @returns true si vous pouvez entrer, false si vous êtes redirigé
   */
  canActivate(route: any): boolean {
    // On récupère la liste des bracelets acceptés pour cette route
    const requiredRoles = route.data['roles'] as Array<string>;
    
    // Si aucun bracelet n'est requis, tout le monde peut entrer
    // C'est comme une zone publique de la boîte
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // On vérifie si l'utilisateur a au moins un des bracelets requis
    // C'est comme vérifier si vous avez un bracelet VIP ou Staff
    const hasRequiredRole = requiredRoles.some(role => this.authService.hasRole(role));
    
    // Si vous n'avez pas le bon bracelet :
    if (!hasRequiredRole) {
      // On vous redirige vers l'entrée (page de connexion)
      // avec un message expliquant pourquoi vous ne pouvez pas entrer
      this.router.navigate(['/login'], { 
        queryParams: { error: 'insufficient_permissions' }
      });
      return false;
    }

    // Si vous avez le bon bracelet, vous pouvez entrer
    return true;
  }
} 