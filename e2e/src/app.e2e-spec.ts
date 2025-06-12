/**
 * Tests end-to-end (e2e) de l'application
 * 
 * Ce fichier contient les tests e2e qui vérifient le bon fonctionnement
 * de l'application dans son ensemble. Les tests e2e :
 * - Simulent les actions d'un utilisateur réel
 * - Vérifient le comportement de l'application
 * - Testent les scénarios complets
 * 
 * Les tests sont exécutés avec Protractor, qui :
 * - Ouvre un navigateur réel
 * - Exécute les actions comme un utilisateur
 * - Vérifie les résultats
 */

import { browser, logging } from 'protractor';
import { AppPage } from './app.po';

describe('Application GED', () => {
  // Page d'accueil de l'application
  let page: AppPage;

  // Avant chaque test
  beforeEach(() => {
    page = new AppPage();
  });

  // Test de la page de connexion
  it('devrait afficher la page de connexion', () => {
    // On navigue vers la page de connexion
    page.navigateTo();
    
    // On vérifie que le titre est correct
    expect(page.getTitleText()).toEqual('Connexion');
  });

  // Test de la connexion
  it('devrait permettre de se connecter', () => {
    // On navigue vers la page de connexion
    page.navigateTo();
    
    // On remplit le formulaire
    page.setUsername('test@example.com');
    page.setPassword('password123');
    
    // On clique sur le bouton de connexion
    page.clickLoginButton();
    
    // On vérifie qu'on est redirigé vers le tableau de bord
    expect(page.getCurrentUrl()).toContain('/dashboard');
  });

  // Après chaque test
  afterEach(async () => {
    // On vérifie qu'il n'y a pas d'erreurs dans la console
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
}); 