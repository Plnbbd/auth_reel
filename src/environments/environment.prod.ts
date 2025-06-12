/**
 * Configuration de l'environnement de production
 * 
 * Ce fichier contient les variables d'environnement utilisées en production :
 * - L'URL de l'API en production
 * - Les clés d'API de production
 * - Les configurations optimisées pour la production
 * 
 * Les valeurs de ce fichier sont utilisées lors du build de production
 * avec la commande : ng build --configuration production
 */

export const environment = {
  // Indique que nous sommes en mode production
  production: true,
  
  // URL de base de l'API en production
  // À remplacer par l'URL de votre API en production
  apiUrl: 'https://api.votredomaine.com/api',
  
  // Clés d'API pour les services externes en production
  // À remplacer par vos clés de production
  apiKeys: {
    googleMaps: 'YOUR_PRODUCTION_GOOGLE_MAPS_API_KEY',
    stripe: 'YOUR_PRODUCTION_STRIPE_API_KEY'
  },
  
  // Configuration du logging en production
  logging: {
    // En production, on limite les logs aux erreurs
    level: 'error',
    // On désactive la console en production
    console: false
  },
  
  // Configuration de l'authentification en production
  auth: {
    // Durée de validité du token en secondes
    // Plus courte en production pour plus de sécurité
    tokenExpiration: 1800,
    // URL de redirection après la connexion
    redirectUrl: '/dashboard'
  }
}; 