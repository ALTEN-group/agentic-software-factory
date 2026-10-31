# 📦 Forge

<EnablerBlock type="forge" />

La Forge est un catalogue de fonctions, bibliothèques, services et modèles certifiés. Les agents réutilisent ces briques au lieu de régénérer la même logique à chaque changement.

## Ce que contient la Forge

| Niveau | Exemples | Pourquoi |
|---|---|---|
| **Services partagés** | Authentification, identité, facturation, journalisation d’audit, envoi de notifications, stockage documentaire | Des services éprouvés en production sont appelés, jamais reconstruits |
| **Code réutilisable** | Bibliothèques, SDK clients partagés, logique métier validée, utilitaires cryptographiques, wrappers de télémétrie | Les agents importent des paquets pré-testés qui respectent déjà les standards de l’entreprise |
| **Modèles en contexte (*In-context templates*)** | Squelettes de projets, *scaffolding* et patrons de conception canoniques (par exemple des frameworks tels que [Gatelin](https://github.com/ALTEN-group/Gatelin) ou [Foxnox](https://github.com/ALTEN-group/Foxnox)) injectés dans le contexte de l’agent | Les agents suivent l’architecture de référence dès la première ligne |
| **Contrats d’interface** | Spécifications d’API versionnées (OpenAPI, gRPC, AsyncAPI) | La compatibilité inter-services est fixée avant le début de la génération |

Les modèles donnent aux agents l’architecture de référence pour démarrer un service, une API ou un pipeline.

## Où la Forge est utilisée

La Forge alimente trois étapes du [modèle opérationnel](./overview).

| Étape | Ce qui se passe avec la Forge |
|---|---|
| [2 — Think](./stage-think) | L’agent interroge sémantiquement le catalogue et propose des options de réutilisation. Les briques retenues sont enregistrées comme **associations de briques de la Forge (*Forge asset bindings*)** dans le dossier Think |
| [3 — Plan](./stage-plan) | Le Plan lit les associations depuis le dossier Think, afin que les étapes d’implémentation les assemblent |
| [4 — Code](./stage-code) | L’agent importe les paquets associés et appelle les services liés, ou copie le code réutilisable |

## Règles

- **Assembler avant de construire.** Toute implémentation sur mesure d’une capacité déjà offerte par la Forge nécessite une justification documentée dans le dossier Think.
- **Un seul correctif, tous les consommateurs servis.** Les correctifs de sécurité, optimisations de performance et mises à jour de dépendances apportés à un module de la Forge profitent automatiquement à toutes les squads consommatrices.
- **Certifié avant d’être référencé.** Une brique n’entre au catalogue qu’avec un responsable, une interface versionnée, des tests et une documentation.
- **Déprécier explicitement.** Une brique retirée indique sa brique de remplacement ainsi qu’une date de suppression, afin que les agents ne se lient jamais à un composant en fin de vie.

## Qui en est responsable

L’Architecte est garant de la Forge, et chaque équipe y contribue en proposant des briques via des pull requests.

## Où elle réside

Versionnée dans les registres de paquets d’entreprise, les catalogues de services et les dépôts de l’organisation.

## Signaux de santé

| Signal | Sain | Alerte |
|---|---|---|
| Part des éléments de travail associant au moins une brique de la Forge | En hausse | Stable ou en baisse |
| Logique dupliquée générée alors qu’une brique de la Forge la couvre déjà | Proche de zéro | Récurrente |
| Briques sans responsable ou avec une version obsolète | Aucune | Une ou plusieurs |
