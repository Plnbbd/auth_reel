/**
 * Intercepteur d'authentification
 * 
 * Cet intercepteur ajoute automatiquement le token d'authentification
 * à toutes les requêtes HTTP sortantes. Il s'occupe de :
 * - Ajouter le token dans l'en-tête Authorization
 * - Gérer les erreurs d'authentification (401)
 * - Rediriger vers la page de connexion si nécessaire
 * 
 * Comment ça marche :
 * 1. À chaque requête HTTP, l'intercepteur est appelé
 * 2. Il récupère le token d'authentification
 * 3. Il l'ajoute à l'en-tête de la requête
 * 4. Si la requête échoue avec une erreur 401, il déconnecte l'utilisateur
 */

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,  // Service d'authentification
    private router: Router            // Service de navigation
  ) {}

  /**
   * Intercepte les requêtes HTTP pour ajouter le token
   * @param request La requête HTTP à intercepter
   * @param next Le prochain intercepteur dans la chaîne
   * @returns Un Observable qui émet la réponse HTTP
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // On récupère le token d'authentification
    const token = this.authService.getToken();

    // Si on a un token, on l'ajoute à l'en-tête de la requête
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // On continue le traitement de la requête
    return next.handle(request).pipe(
      // On intercepte les erreurs
      catchError((error: HttpErrorResponse) => {
        // Si c'est une erreur d'authentification (401)
        if (error.status === 401) {
          // On déconnecte l'utilisateur
          this.authService.logout();
          // On le redirige vers la page de connexion
          this.router.navigate(['/login']);
        }
        // On propage l'erreur
        return throwError(() => error);
      })
    );
  }
} 