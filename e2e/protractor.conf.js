/**
 * Configuration de Protractor pour les tests e2e
 * 
 * Ce fichier configure l'environnement d'exécution des tests e2e :
 * - Le navigateur à utiliser
 * - Les timeouts
 * - Les reporters
 * - Les options de test
 * 
 * Protractor est l'outil utilisé par Angular pour les tests e2e.
 * Il permet de simuler les actions d'un utilisateur réel dans un navigateur.
 */

// Configuration de Protractor
exports.config = {
  // Framework de test à utiliser
  framework: 'jasmine',
  
  // Plugins de test
  plugins: [{
    package: 'protractor-console-plugin',
    failOnWarning: false,
    failOnError: false
  }],
  
  // Configuration de Selenium
  seleniumAddress: 'http://localhost:4444/wd/hub',
  
  // Configuration du navigateur
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage']
    }
  },
  
  // Configuration des tests
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  
  // Configuration de Jasmine
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  
  // Configuration de la base URL
  baseUrl: 'http://localhost:4200/',
  
  // Configuration des timeouts
  allScriptsTimeout: 11000,
  
  // Configuration des reporters
  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  }
}; 