/**
 * Page Object pour les tests e2e
 * 
 * Ce fichier définit les méthodes pour interagir avec l'application
 * dans les tests e2e. Il encapsule :
 * - La navigation
 * - Les interactions avec les éléments
 * - Les vérifications
 * 
 * L'utilisation d'un Page Object permet de :
 * - Centraliser le code d'interaction
 * - Faciliter la maintenance
 * - Réutiliser le code entre les tests
 */

import { browser, by, element } from 'protractor';

export class AppPage {
  /**
   * Navigue vers la page de connexion
   */
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  /**
   * Récupère le titre de la page
   */
  getTitleText() {
    return element(by.css('h1')).getText() as Promise<string>;
  }

  /**
   * Récupère l'URL courante
   */
  getCurrentUrl() {
    return browser.getCurrentUrl() as Promise<string>;
  }

  /**
   * Remplit le champ nom d'utilisateur
   * @param username Le nom d'utilisateur à saisir
   */
  setUsername(username: string) {
    return element(by.css('input[formControlName="username"]')).sendKeys(username);
  }

  /**
   * Remplit le champ mot de passe
   * @param password Le mot de passe à saisir
   */
  setPassword(password: string) {
    return element(by.css('input[formControlName="password"]')).sendKeys(password);
  }

  /**
   * Clique sur le bouton de connexion
   */
  clickLoginButton() {
    return element(by.css('button[type="submit"]')).click();
  }

  /**
   * Vérifie si un message d'erreur est affiché
   */
  hasErrorMessage() {
    return element(by.css('.error-message')).isPresent();
  }

  /**
   * Récupère le texte du message d'erreur
   */
  getErrorMessage() {
    return element(by.css('.error-message')).getText() as Promise<string>;
  }
} 