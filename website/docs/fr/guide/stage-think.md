---
pageClass: page-stage-pink
---

# 💡 2 — Think

<div class="stage-hero-banner banner-pink">
  <span class="stage-hero-badge">ÉTAPE 2</span>
  <span class="stage-hero-desc">Exploration des options, compromis &amp; décisions d’architecture</span>
</div>

Think choisit comment résoudre un ticket priorisé. L’IA compare les options, réutilise [la Forge](./forge) et respecte les règles du Contexte persistant. [Plan](./stage-plan) transforme ensuite l’approche en tâches.

## Objectif

| Entrée | Sortie | Responsable |
|---|---|---|
| Un ticket `todo` de [Triage](./stage-triage), [la Forge](./forge) et le Contexte persistant | Approche choisie, options, briques réutilisées, contraintes, risque et relevés de décision requis | Développeur + Architecte |

## Le dossier Think {#the-think-record}

Chaque ticket consigne son approche avant la planification.

| Champ | Contenu | Longueur |
|---|---|---|
| **Options envisagées** | Les approches crédibles, incluant la réutilisation depuis la Forge par rapport à un développement sur mesure | 2 à 4 options |
| **Approche retenue** | L’option sélectionnée et le raisonnement qui la justifie | 1 paragraphe |
| **Liaisons aux briques de la Forge** | Services réutilisables pré-approuvés, librairies et contrats d’API assemblés dans l’approche | Liste de références Forge |
| **Contraintes & invariants** | Relevés de décision, règles de sécurité, de conformité, de latence et de compatibilité de schémas qui encadrent la solution | Liste à puces |
| **Rayon d’impact (Blast radius)** | Systèmes touchés et [risque](./governance#blast-radius-and-required-human-validation) : Faible, Moyen, Élevé ou Critique. Le niveau fixe les preuves de [Prove](./stage-prove). Élevé/Critique nomment aussi le rollback | Niveau + puces |

[Plan](./stage-plan) réutilise ces décisions et vérifie si son périmètre de fichiers augmente le niveau de risque.

## Où l’IA intervient

L’IA compare les options, choisit l’approche et consigne sa justification. L’Architecte et le Développeur sont garants des contraintes et traitent les échecs non résolus, sans approbation systématique.

| Tâche | Responsabilité autonome de l’IA | Gestion humaine des exceptions |
|---|---|---|
| **Exploration des options** | Évaluer les compromis, coûts et risques ; choisir et justifier l’approche | Résoudre une ambiguïté empêchant la validation |
| **Découverte & composition avec la Forge** | Sélectionner les briques et valider les liaisons d’intégration | Résoudre un échec de compatibilité |
| **Analyse du code & du contexte** | Ancrer l’approche dans les composants et contraintes réels | Corriger une contrainte manquante ou contradictoire |
| **Analyse d’impact & des contrats** | Fixer le rayon d’impact et consigner les décisions d’API, de schéma et de frontières | Traiter un échec de contrôle non résolu |

## Relevés de décision (Decision records)

L’IA choisit l’approche de chaque changement selon les preuves, contraintes et conventions du dépôt.
Les modifications d’API publique, de schéma de base de données, de frontières de services et tous les changements Critiques exigent aussi un relevé de décision formel.

Ce relevé nomme l’automatisation et sa date, passe les contrôles et rejoint le Contexte persistant.
Tous les niveaux de risque avancent automatiquement si leurs contrôles passent. Aucune signature humaine n’est requise ni fabriquée.

## Agents et skills {#primitives-dans-le-contexte-persistant}

Think s’appuie sur les primitives du Contexte persistant publiées par [coding-pal](https://alten-group.github.io/coding-pal/) :

- Un agent **Thinker** explore 2 à 4 options, identifie les briques candidates dans la Forge, évalue le rayon d’impact et rédige le dossier `think.md`.
- Une instruction **think** impose les contraintes du dépôt et l’attribution explicite des décisions IA.
- Le skill **think-plan** valide de manière déterministe le dossier Think : 2 à 4 options crédibles, liaisons Forge valides, justification du niveau de rayon d’impact et mécanisme de rollback nommé pour les niveaux Élevé et Critique.
- Les **relevés de décision** (`docs/decisions/`) et le **catalogue de la Forge** (`docs/forge/`) constituent les ressources du Contexte persistant inspectées par l’agent pour encadrer les solutions et lier les briques réutilisables.

Voir le [guide Think & Plan de coding-pal](https://alten-group.github.io/coding-pal/guide/domain-think-plan).

## Pipeline de livraison

Le pipeline Think transforme un ticket en spécification validée, selon les [déclencheurs et points de revue communs](./platform-rails#declencheurs-points-de-revue-et-statuts) :

1. Consulte la file et le travail existant : attendre, démarrer Think ou reprendre une phase ultérieure.
2. Positionne le statut **Think** avant de lancer l’agent.
3. Définit le problème, l’approche, le périmètre et les contraintes.
4. Valide la spécification et la lie au ticket.
5. Crée un travail amont lié si nécessaire et bloque le ticket jusqu’à sa livraison.
6. Consigne l’approbation automatisée et passe à [Plan](./stage-plan#pipeline-de-livraison), sauf si une revue est demandée.

**Point d’arrêt :** revue demandée, dépendance amont ou passage à Plan. Le statut reste **Think** jusqu’au démarrage de Plan. Signalez les échecs non résolus à un développeur ; le travail indépendant peut continuer.

### Reprise après une livraison amont

Un pipeline de reprise des dépendances relance le travail des consommateurs après une notification de livraison amont :

1. Identifie le composant et la version livrés et vérifie que l’artefact requis est disponible pour les consommateurs.
2. Recherche les tickets bloqués liés à cette dépendance.
3. Ajoute les instructions de mise à jour et lève le blocage une fois le prérequis satisfait.
4. Met les tickets en file de reprise, réutilise les dossiers toujours valides et lance la prochaine phase éligible lorsque la capacité le permet.

**Point d’arrêt :** tickets débloqués et mis en file, ou aucun ticket correspondant. Gardez le blocage si l’artefact est indisponible. Ce pipeline n’implémente, ne fusionne ni ne publie le consommateur.

## Jalon de sortie

Un élément de travail quitte Think et entre dans [3 — Plan](./stage-plan) uniquement lorsque :

1. les options sont comparées et une approche est choisie,
2. les briques Forge pertinentes sont liées,
3. les contraintes du Contexte persistant sont vérifiées,
4. le [niveau de risque](./governance#blast-radius-and-required-human-validation) est justifié, avec un rollback nommé pour Élevé/Critique,
5. les relevés de décision requis sont validés et les mises à jour du contexte sont listées pour Plan.
