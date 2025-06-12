/**
 * Configuration de l'environnement de développement
 * 
 * Ce fichier contient les variables d'environnement utilisées en développement :
 * - L'URL de l'API
 * - Les clés d'API
 * - Les configurations spécifiques à l'environnement
 * 
 * Note : Ce fichier ne doit PAS être commité dans le dépôt Git
 * car il peut contenir des informations sensibles.
 * À la place, utilisez environment.example.ts comme modèle.
 */

export const environment = {
  // Indique que nous sommes en mode développement
  production: false,
  
  // URL de base de l'API
  // En développement, on utilise localhost
  apiUrl: 'http://localhost:8085/api',
  
  // Clés d'API pour les services externes
  // À remplacer par vos propres clés
  apiKeys: {
    googleMaps: 'YOUR_GOOGLE_MAPS_API_KEY',
    stripe: 'YOUR_STRIPE_API_KEY'
  },
  
  // Configuration du logging
  logging: {
    // Active les logs détaillés en développement
    level: 'debug',
    // Active la console en développement
    console: true
  },
  
  // Configuration de l'authentification
  auth: {
    // Durée de validité du token en secondes
    tokenExpiration: 3600,
    // URL de redirection après la connexion
    redirectUrl: '/dashboard'
  }
}; 