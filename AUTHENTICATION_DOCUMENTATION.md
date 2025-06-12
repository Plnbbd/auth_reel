# Documentation de l'Authentification

## 1. Vue d'ensemble

L'authentification est implémentée selon le document de conception fourni, avec les composants suivants :
- Service d'authentification (`AuthService`)
- Guard de rôles (`RoleGuard`)
- Intercepteur HTTP (`AuthInterceptor`)
- Composant de connexion (`LoginComponent`)

## 2. Service d'Authentification (AuthService)

### 2.1 Configuration
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';
  private readonly API_URL = 'http://localhost:8080/api/auth';
}
```

### 2.2 Fonctionnalités principales

#### Connexion
```typescript
login(credentials: {username: string, password: string}): Observable<any> {
  return this.http.post(`${this.API_URL}/login`, credentials).pipe(
    tap(response => {
      this.setToken(response.token);
      this.setUser(response.user);
    })
  );
}
```

#### Déconnexion
```typescript
logout(): void {
  localStorage.removeItem(this.TOKEN_KEY);
  localStorage.removeItem(this.USER_KEY);
  this.router.navigate(['/login']);
}
```

#### Vérification des rôles
```typescript
hasRole(role: string): boolean {
  const user = this.getUser();
  return user?.roles?.includes(role) || false;
}
```

### 2.3 Gestion du token
- Stockage dans le localStorage
- Récupération automatique
- Vérification de validité

## 3. Guard de Rôles (RoleGuard)

### 3.1 Objectif
Protège les routes en vérifiant les permissions de l'utilisateur.

### 3.2 Implémentation
```typescript
canActivate(route: any): boolean {
  const requiredRoles = route.data['roles'] as Array<string>;
  const hasRequiredRole = requiredRoles.some(role => this.authService.hasRole(role));
  
  if (!hasRequiredRole) {
    this.router.navigate(['/login'], { 
      queryParams: { error: 'insufficient_permissions' }
    });
    return false;
  }
  return true;
}
```

## 4. Intercepteur HTTP (AuthInterceptor)

### 4.1 Objectif
Ajoute automatiquement le token JWT à toutes les requêtes HTTP.

### 4.2 Implémentation
```typescript
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }
  return next(req);
};
```

## 5. Intégration dans l'Application

### 5.1 Configuration des routes
```typescript
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard],
    data: { roles: ['ADMIN'] }
  }
];
```

### 5.2 Utilisation dans les composants

#### Vérification de l'authentification
```typescript
constructor(private authService: AuthService) {
  if (this.authService.isAuthenticated()) {
    // L'utilisateur est connecté
  }
}
```

#### Vérification des rôles
```typescript
if (this.authService.hasRole('ADMIN')) {
  // Afficher les fonctionnalités admin
}
```

### 5.3 Gestion de la navigation
```typescript
// Dans app.component.ts
shouldShowNavbar(): boolean {
  return this.authService.isAuthenticated() && 
         !this.router.url.includes('/login') &&
         !this.router.url.includes('/register');
}
```

## 6. Flux d'Authentification

1. L'utilisateur accède à la page de connexion
2. Il entre ses identifiants
3. Le service d'authentification envoie une requête au backend
4. Si la connexion réussit :
   - Le token JWT est stocké
   - Les informations utilisateur sont stockées
   - L'utilisateur est redirigé vers la page d'accueil
5. Pour les requêtes suivantes :
   - L'intercepteur ajoute automatiquement le token
   - Le guard vérifie les permissions si nécessaire

## 7. Sécurité

### 7.1 Protection des routes
- Routes publiques : accessibles sans authentification
- Routes protégées : nécessitent une authentification
- Routes avec rôles : nécessitent des permissions spécifiques

### 7.2 Gestion des tokens
- Stockage sécurisé dans le localStorage
- Vérification de validité
- Déconnexion automatique en cas d'expiration

## 8. Bonnes pratiques

1. Toujours utiliser le service d'authentification pour :
   - Vérifier l'état de connexion
   - Vérifier les rôles
   - Gérer la déconnexion

2. Protéger les routes sensibles avec le guard de rôles

3. Utiliser l'intercepteur pour les requêtes HTTP

4. Gérer les erreurs d'authentification :
   - Token expiré
   - Accès refusé
   - Session invalide

## 9. Exemple d'utilisation complète

```typescript
// Dans un composant
export class MonComposant {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Vérifier l'authentification
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // Vérifier les rôles
    if (this.authService.hasRole('ADMIN')) {
      // Charger les fonctionnalités admin
    }

    // Faire une requête HTTP (le token sera ajouté automatiquement)
    this.http.get('/api/data').subscribe(
      data => {
        // Traiter les données
      },
      error => {
        if (error.status === 401) {
          this.authService.logout();
        }
      }
    );
  }
}
```

## 10. Points d'attention et améliorations futures

### 10.1 Gestion des erreurs spécifiques du backend
- Implémenter une gestion plus détaillée des codes d'erreur HTTP (401, 403, etc.)
- Ajouter des messages d'erreur spécifiques pour chaque type d'erreur
- Mettre en place un système de notification pour informer l'utilisateur

### 10.2 Validation des tokens expirés
- Ajouter une vérification de l'expiration du token JWT
- Implémenter un système de rafraîchissement automatique du token
- Gérer la déconnexion automatique en cas d'expiration

### 10.3 Gestion des sessions
- Mettre en place un système de timeout de session
- Implémenter une fonctionnalité "Se souvenir de moi"
- Gérer la déconnexion automatique après une période d'inactivité 