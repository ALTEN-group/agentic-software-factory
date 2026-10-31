# 👥 Équipe

Une squad porte un résultat client, de la réunion à la production.

## Qui fait quoi

<SquadFlowchart />

## L’évolution des rôles

L’IA rédige les spécifications, le code, les tests et la documentation. Le **Product Engineer** réunit les responsabilités produit et développement :

- **Plus de codeurs manuels** : les agents IA génèrent 100 % du code, des tests et de la documentation.
- **Product Engineer** : porte **Meet** à **Prove**, anime les échanges clients, fixe les priorités et entretient le contexte et l’automatisation.
  - **Meet** : comprendre le problème du client et le résultat attendu.
  - **Think** : fixer les contraintes qui guident les décisions de l’IA.
- **Empathie client** : préserver l’intention du client tout au long de la livraison.

## Structure type

Une squad compte généralement un ou deux Product Engineers. L’architecture, le DevOps, la QA et la maintenance sont mutualisés :

| Membre | Périmètre principal | Rôle dans le développement piloté par les réunions |
|---|---|---|
| **Product Engineer** | Meet, Triage, Think, Plan, Code et Prove | Anime le dialogue client, définit valeur et priorités, pilote l’automatisation et résout les échecs escaladés |
| **QA et mainteneur** | Qualité et support de production | Pilote Learn : surveille la QA et la production, gère les incidents et remonte les constats du monitoring ; mutualisé entre les squads |
| **DevOps** | Déploiement automatisé et pipeline | Pilote Release : déploiement automatisé ; mutualisé entre les squads |
| **Architecte** | Rails de plateforme, Contexte persistant, Contrôles déterministes et Forge | Garant des contraintes, de la politique de décision et des contrôles de risque ; les agents décident de manière autonome et escaladent les échecs non résolus |

## Frontières

Une squad est définie par un **résultat utilisateur**, jamais par une couche technologique.

| Bonne frontière orientée résultat | Mauvaise frontière par couche technologique |
|---|---|
| « Parcours d’intégration client et identité » | « Équipe Frontend » |
| « Paiements, facturation et recouvrement » | « Équipe API Backend » |
| « Catalogue et pertinence de la recherche » | « Équipe Base de données et SQL » |

Le découpage par couche multiplie les passages de relais et fragmente le contexte des agents.

## Responsabilité du code et du contexte

La squad responsable du résultat possède le code, les tests et le contexte. Les agents proposent des changements inter-dépôts par demandes de fusion ; les contrôles de chaque dépôt imposent ses règles métier et ses frontières.
