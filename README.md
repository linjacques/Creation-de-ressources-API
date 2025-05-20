#  Projet API Express.js – TPs Étudiants

Ce dépôt regroupe deux Travaux Pratiques (TP) autour de la création et la **sécurisation d’une API REST** avec **Node.js**, **Express.js** et **MongoDB/Mongoose**.

Le projet est organisé en **deux branches** distinctes :

---

##  Branche `main` — TP1 : Création de Ressources API

###  Objectif
Développer une API REST avec Express.js et Mongoose pour gérer des **albums** et des **photos**, en mettant en place des routes **CRUD complètes** et des relations entre les entités.

###  Énoncé
Étendre une API existante pour :
- Créer les **modèles Mongoose** pour `Album` et `Photo`
- Implémenter des **routes CRUD** pour :
  - Albums : `GET /album/:id`, `POST /album`, `PUT /album/:id`, `DELETE /album/:id`, `GET /albums`
  - Photos : `GET /album/:idalbum/photos`, `GET /album/:idalbum/photo/:idphotos`, `POST`, `PUT`, `DELETE`
- Gérer les **relations** entre albums et photos :
  - Lors de la création ou suppression d’une photo, mettre à jour dynamiquement la liste des photos dans l’album
  - Utiliser `populate()` (Mongoose v6+)
- **Tester l’API** avec Postman ou cURL

###  Critères de réussite
- Modèles Mongoose complets
- Routes fonctionnelles avec bons statuts HTTP
- Relations entre collections bien gérées

---

##  Branche `APIsecurite` — TP2 : Sécurisation d’une API

###  Objectif
Ajouter plusieurs couches de **sécurité** à une API existante via JWT, HTTPS, validation d’entrée, rate limiting, etc.

###  Étapes clés

1. **Headers de sécurité HTTP**
   - Utiliser `helmet` pour protéger contre XSS, clickjacking, etc.
   - Configurer CORS selon les origines autorisées

2. **Authentification & Autorisation (JWT)**
   - Générer un **token JWT** à la connexion
   - Créer un **middleware** pour vérifier les tokens sur les routes protégées

3. **Validation des entrées**
   - Utiliser `better-validator` pour s’assurer que les données reçues sont valides
   - Empêcher les injections ou données malformées

4. **Rate Limiting**
   - Limiter les requêtes avec `express-limiter` (ex : 100 requêtes/heure)

5. **HTTPS**
   - Forcer l’utilisation de **HTTPS** via certificat SSL (même auto-signé en local)

6. **Gestion des erreurs**
   - Messages d’erreurs clairs, sans fuite d’informations sensibles

7. **Audit des paquets Node.js**
   - Faire un `npm audit` et corriger les vulnérabilités (mettre à jour les dépendances)

###  Critères de réussite
- API sécurisée avec JWT fonctionnel
- Entrées validées
- Limitation de requêtes active
- Erreurs gérées proprement
- API auditée et à jour

---

##  Utilisation des branches

```bash
# TP1 : API CRUD albums/photos
git checkout main

# TP2 : Sécurisation de l’API
git checkout APIsecurite
