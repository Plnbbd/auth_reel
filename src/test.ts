/**
 * Configuration des tests unitaires
 * 
 * Ce fichier configure l'environnement de test pour Angular :
 * - Initialise le framework de test
 * - Configure les reporters
 * - Définit les comportements par défaut
 * 
 * Il est exécuté avant chaque suite de tests pour
 * préparer l'environnement de test.
 */

// Import des modules de test Angular
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Désactive la détection des changements automatique
// pour un meilleur contrôle dans les tests
declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    <T>(id: string): T;
    keys(): string[];
  };
};

// Initialisation de l'environnement de test
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

// Configuration du contexte de test
const context = require.context('./', true, /\.spec\.ts$/);

// Chargement de tous les fichiers de test
context.keys().forEach(context); 