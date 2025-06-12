/**
 * Service d'authentification
 * 
 * Ce service gère toute la logique d'authentification :
 * - Connexion des utilisateurs
 * - Déconnexion
 * - Vérification du statut d'authentification
 * - Stockage du token
 * - Récupération des informations utilisateur
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

// Interface pour les identifiants de connexion
export interface LoginCredentials {
  email: string;      // L'email de l'utilisateur
  motDePasse: string; // Le mot de passe de l'utilisateur
}

// Interface pour les informations de l'utilisateur
export interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  role: string;
}

// Interface pour la réponse du serveur
export interface AuthResponse {
  success: boolean;   // Indique si la requête a réussi
  message: string;    // Message de la réponse
  data: {            // Données de la réponse
    accessToken: string;    // Token JWT pour l'accès
    refreshToken: string;   // Token pour le rafraîchissement
    expiration: number;     // Durée de validité du token
    utilisateur: User;     // Informations de l'utilisateur
  };
  timestamp: string;  // Horodatage de la réponse
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL de l'API d'authentification
  private apiUrl = `${environment.apiUrl}/auth`;
  
  // Observable pour suivre l'état de l'authentification
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Observable pour suivre l'utilisateur courant
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Au démarrage du service, on vérifie si un token existe
    this.checkAuthStatus();
  }

  /**
   * Vérifie si l'utilisateur est authentifié
   * @returns true si l'utilisateur est authentifié, false sinon
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  /**
   * Vérifie le statut d'authentification au démarrage
   */
  private checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticatedSubject.next(true);
    }
  }

  /**
   * Connecte l'utilisateur
   * @param credentials Les identifiants de connexion
   * @returns Un Observable contenant la réponse du serveur
   */
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.success) {
          // On stocke le token
          localStorage.setItem('token', response.data.accessToken);
          // On met à jour le statut d'authentification
          this.isAuthenticatedSubject.next(true);
          // On met à jour l'utilisateur courant
          this.currentUserSubject.next(response.data.utilisateur);
        }
      })
    );
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout(): void {
    // On supprime le token
    localStorage.removeItem('token');
    // On met à jour le statut d'authentification
    this.isAuthenticatedSubject.next(false);
    // On réinitialise l'utilisateur courant
    this.currentUserSubject.next(null);
  }

  /**
   * Récupère le token d'authentification
   * @returns Le token JWT ou null s'il n'existe pas
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Récupère l'utilisateur courant
   * @returns L'utilisateur courant ou null s'il n'est pas connecté
   */
  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Vérifie si l'utilisateur a un rôle spécifique
   * @param role Le rôle à vérifier
   * @returns true si l'utilisateur a le rôle, false sinon
   */
  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.role === role;
  }
} 