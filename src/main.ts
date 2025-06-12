/**
 * Point d'entrée principal de l'application
 * 
 * Ce fichier initialise l'application Angular avec :
 * - La configuration de l'environnement
 * - Les providers globaux
 * - Les intercepteurs HTTP
 * - Les configurations de production
 * 
 * Il est exécuté au démarrage de l'application et configure
 * l'environnement d'exécution.
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';

// Démarrage de l'application avec la configuration
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));