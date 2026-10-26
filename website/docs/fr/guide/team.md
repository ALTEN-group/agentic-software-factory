# 👥 Équipe

L’Agentic Software Factory aligne le produit, le développement et les résultats clients au sein de squads autonomes.
Une squad est la plus petite unité capable d’assumer la responsabilité d’un résultat de bout en bout — de la réunion client jusqu’à la mise en production.

## Qui fait quoi

<SquadFlowchart />

Chaque squad est responsable de l’intégralité du cycle de vie, de la réunion client jusqu’à l’apprentissage en production.

## L’évolution des rôles

Dans l’Agentic Software Factory, **les développeurs n’écrivent plus la syntaxe du code**, et **les Product Owners ne rédigent plus les spécifications à la main**. Parce que l’IA prend en charge aussi bien la rédaction des spécifications que la génération du code, la séparation traditionnelle entre Product Owner et Développeur s’efface au profit d’un rôle unifié de **Product Engineer** :

- **Plus de codeurs manuels** : les agents IA génèrent 100 % du code, des tests et de la documentation.
- **Product Engineer** : porte le résultat de **Meet** à **Prove** — en travaillant directement avec le client pour transformer ses problèmes en besoins métier clairs et bien définis, en spécifiant et en entretenant le contexte, et en validant l’intention plutôt qu’en tapant de la syntaxe.
- **Empathie client** : libérés de la frappe de syntaxe et des passages de relais (*handoffs*), les Product Engineers animent directement les réunions clients et portent le véritable contexte métier jusqu’à la validation finale.

## Structure type

**Une squad agentique à fort effet de levier s’articule autour d’un Product Engineer** (ou d’un binôme de Product Engineers), accompagné d’un Architecte, d’un DevOps et d’un QA et mainteneur mutualisés entre plusieurs squads :

| Membre | Périmètre principal | Rôle dans le développement piloté par les réunions |
|---|---|---|
| **Product Engineer** | Meet, Triage, Think, Plan, Code et Prove | Anime les réunions clients, définit la valeur métier, classe les tickets de backlog dans Triage, pèse les options dans Think, valide les dossiers Plan, orchestre la boucle de codage et réalise la validation humaine minimale |
| **QA et mainteneur** | Qualité et support de production | Pilote Learn : surveille la QA et la production, gère les incidents et remonte les constats du monitoring ; mutualisé entre les squads |
| **DevOps** | Déploiement automatisé et pipeline | Pilote Release : déploiement automatisé ; mutualisé entre les squads |
| **Architecte** | Les catalyseurs : Rails de plateforme, Contexte persistant, Contrôles déterministes et Forge | Garant des frontières du système et des relevés de décision, approuve les décisions à fort rayon d’impact ; mutualisé entre les squads |

## Frontières

Une squad est définie par un **résultat utilisateur**, jamais par une couche technologique.

| Bonne frontière orientée résultat | Mauvaise frontière par couche technologique |
|---|---|
| « Parcours d’intégration client et identité » | « Équipe Frontend » |
| « Paiements, facturation et recouvrement » | « Équipe API Backend » |
| « Catalogue et pertinence de la recherche » | « Équipe Base de données et SQL » |

Les squads découpées par couche technologique créent des tickets inter-équipes, des files d’attente et un contexte fragmenté qui paralysent les agents IA.

## Responsabilité du code et du contexte

Le code, les suites de tests déterministes et les artefacts du Contexte persistant appartiennent à la squad responsable du résultat métier. Les agents IA peuvent proposer des modifications à travers plusieurs dépôts via des pull requests, mais c’est la squad propriétaire qui valide l’intention métier et les invariants.
