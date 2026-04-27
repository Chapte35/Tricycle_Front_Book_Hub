# BookHub — Frontend

Interface web de la plateforme **BookHub**, développée pour l'association "Quartier Solidaire".  
Application de gestion de bibliothèque communautaire permettant la consultation du catalogue, la gestion des emprunts et des réservations.

> Projet généré avec [Angular CLI](https://github.com/angular/angular-cli) version 17+.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre machine :

- [Node.js](https://nodejs.org/) v20.19+ ou v22.12+ ou ≥v24
- [npm](https://www.npmjs.com/) v6.11+
- [Angular CLI](https://angular.dev/tools/cli) v20.3+

```bash
# Vérifier les versions installées
node -v
npm -v
ng version
```

---

## Installation

### 1. Cloner le repository

```bash
git clone https://github.com/Chapte35/Tricycle_Front_Book_Hub.git
cd Tricycle_Front_Book_Hub
```

### 2. Installer les dépendances

```bash
npm install -f
```

> Le flag `-f` (force) est nécessaire en cas de conflits de dépendances.

---

## Lancer le serveur de développement

```bash
ng serve
```

L'application est accessible par défaut sur : **`http://localhost:4200/`**

Pour utiliser un port différent :

```bash
ng serve --port 4201
```

L'application se recharge automatiquement à chaque modification du code source.

---

## Connexion au Backend

Le frontend communique avec l'API REST Spring Boot.  
Par défaut, l'API est attendue sur : **`http://localhost:8080`**

Si besoin, modifiez l'URL de base de l'API dans le fichier d'environnement :

```
src/environments/environment.ts
```

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

> Le backend doit être lancé avant d'utiliser les fonctionnalités de l'application.

---

## Build

Pour compiler le projet en production :

```bash
ng build
```

Les fichiers compilés sont générés dans le dossier `dist/`. Le build de production optimise automatiquement les performances de l'application.

---

## Tests

### Tests unitaires



### Tests end-to-end

```bash
ng e2e
```

> Angular CLI ne fournit pas de framework e2e par défaut. Consultez la documentation pour configurer [Cypress](https://www.cypress.io/) ou [Playwright](https://playwright.dev/).

---

## Génération de composants

```bash
# Générer un composant
ng generate component nom-du-composant

# Générer un service
ng generate service nom-du-service

# Générer un guard
ng generate guard nom-du-guard

# Lister tous les schematics disponibles
ng generate --help
```

---

## Problèmes fréquents

**Erreur lors du `npm install`**
```bash
# Utiliser le flag force
npm install -f

# Ou vider le cache npm
npm cache clean --force
npm install -f
```

**Port 4200 déjà utilisé**
```bash
ng serve --port 4201
```

**Erreur CORS avec le backend**  
Vérifiez que le backend est bien lancé sur le port 8080 et que la configuration CORS de Spring Boot autorise `http://localhost:4200`.

---

## Ressources

- [Documentation Angular](https://angular.dev/overview)
- [Angular CLI — Référence des commandes](https://angular.dev/tools/cli)
- [Repository Backend BookHub](https://github.com/Celeste-Cavalle/bookHub.git)
- [Cahier des charges BookHub](lien_à_ajouter)

---

## Équipe

| Nom | Rôle |
|-----|------|
| Celeste Cavallin | Développeuse Full Stack |
| Sébastien Laloe | Développeur Full Stack |
| Audrey Pehuet | Développeuse Full Stack |

---

*Projet réalisé dans le cadre de la formation CDA — Avril 2026*