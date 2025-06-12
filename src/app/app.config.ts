/**
 * Configuration globale de l'application
 * 
 * Ce fichier définit la configuration globale de l'application :
 * - Les providers Angular
 * - Les intercepteurs HTTP
 * - Les animations
 * - Le routage
 * 
 * Cette configuration est utilisée au démarrage de l'application
 * dans le fichier main.ts
 */

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';

/**
 * Configuration de l'application
 * 
 * Cette configuration est utilisée pour initialiser l'application
 * avec tous les providers et intercepteurs nécessaires.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Active les animations Angular Material
    provideAnimations(),
    
    // Configure le routage avec les routes définies
    provideRouter(routes),
    
    // Configure le client HTTP
    provideHttpClient(),
    
    // Ajout de l'intercepteur HTTP avec l'ancienne syntaxe compatible
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
}; 