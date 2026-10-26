---
pageClass: page-stage-pink
---

# 💡 2 — Think

<div class="stage-hero-banner banner-pink">
  <span class="stage-hero-badge">ÉTAPE 2</span>
  <span class="stage-hero-desc">Exploration des options, compromis &amp; décisions d’architecture</span>
</div>

Là où un ticket priorisé est transformé en une approche décidée avant que quoi que ce soit ne soit planifié ou construit.
Think s’appuie sur [la Forge](./forge) pour le code à réutiliser, et sur le Contexte persistant pour les règles et décisions passées à respecter. Cette étape explore les options, pèse les compromis et consigne les décisions que [3 — Plan](./stage-plan) décomposera ensuite en tâches.

## Objectif

| Entrée | Sortie | Responsable |
|---|---|---|
| Un ticket de backlog classé issu de [1 — Triage](./stage-triage) avec une décision `todo` + **[la Forge](./forge)** + **Contexte persistant** | Un dossier Think (`think.md`) : les options envisagées, l’approche retenue, les **liaisons aux briques de la Forge**, les contraintes du Contexte persistant, le rayon d’impact (*blast radius*) et tout nouveau relevé de décision | Développeur + Architecte |

## Le dossier Think {#the-think-record}

Chaque élément de travail s’accompagne d’un dossier court et vérifiable consignant la décision prise avant le démarrage de la planification.

| Champ | Contenu | Longueur |
|---|---|---|
| **Options envisagées** | Les approches crédibles, incluant la réutilisation depuis la Forge par rapport à un développement sur mesure | 2 à 4 options |
| **Approche retenue** | L’option sélectionnée et le raisonnement qui la justifie | 1 paragraphe |
| **Liaisons aux briques de la Forge** | Services réutilisables pré-approuvés, librairies et contrats d’API assemblés dans l’approche | Liste de références Forge |
| **Contraintes & invariants** | Relevés de décision, règles de sécurité, de conformité, de latence et de compatibilité de schémas qui encadrent la solution | Liste à puces |
| **Rayon d’impact (Blast radius)** | Les API, schémas, files de messages et consommateurs impactés, ainsi que le niveau qui en découle : Faible (*Low*), Moyen (*Medium*), Élevé (*High*) ou Critique (*Critical*), tel que défini dans [Gouvernance](./governance#blast-radius-and-required-human-validation). Ce niveau détermine la validation humaine requise dans [5 — Prove](./stage-prove). Pour les niveaux Élevé et Critique, il nomme également le mécanisme de retour arrière (*rollback*) | Niveau + puces |

Le [Plan](./stage-plan) lit les liaisons Forge, les contraintes et le rayon d’impact directement depuis le dossier Think. Ces choix sont arrêtés ici. L’étape Plan vérifie uniquement que le niveau de rayon d’impact reste valide au vu du périmètre exact des fichiers touchés.

## Où l’IA intervient

L’IA explore l’espace des options et le confronte à la réalité de l’organisation ; l’Architecte et le Développeur prennent la décision.

| Tâche | Rôle de l’IA | Rôle humain |
|---|---|---|
| **Exploration des options** | Rédiger des approches crédibles avec les compromis, le coût et le risque pour chacune | Sélectionner l’approche et challenger les hypothèses |
| **Découverte & composition avec la Forge** | Interroger sémantiquement le catalogue de la Forge, associer les modules réutilisables et services partagés au besoin | Confirmer la pertinence des briques, éviter les développements en doublon, approuver les liaisons d’intégration |
| **Analyse du code & du contexte** | Parcourir le code, les briques de la Forge et le Contexte persistant pour identifier les contraintes applicables | Valider l’approche architecturale et les frontières des composants |
| **Analyse d’impact & des contrats** | Détecter les API, schémas de base de données, files de messages et dépendances consommateurs impactés, et proposer un niveau de rayon d’impact | Confirmer le niveau et déclencher un relevé de décision si les frontières évoluent |

## Relevés de décision (Decision records)

Si l’approche retenue nécessite de modifier une API publique, de faire évoluer un schéma de base de données ou de déplacer les frontières entre services, l’IA rédige un projet de relevé de décision conforme aux conventions du dépôt. L’Architecte relit et signe ce relevé, qui est commité dans le dépôt afin d’enrichir immédiatement le Contexte persistant.

## Primitives dans le Contexte persistant

Think s’appuie sur les primitives du Contexte persistant publiées par [coding-pal](https://alten-group.github.io/coding-pal/) :

- Un agent **Thinker** explore 2 à 4 options, identifie les briques candidates dans la Forge, évalue le rayon d’impact et rédige le dossier `think.md`.
- Une instruction **think** maintient l’exploration des options ancrée dans les contraintes du dépôt et garantit que les relevés de décision sont uniquement préparés, et jamais décidés, par l’IA.
- Le skill **think-plan** valide de manière déterministe le dossier Think : 2 à 4 options crédibles, liaisons Forge valides, justification du niveau de rayon d’impact et mécanisme de rollback nommé pour les niveaux Élevé et Critique.
- Les **relevés de décision** (`docs/decisions/`) et le **catalogue de la Forge** (`docs/forge/`) constituent les ressources du Contexte persistant inspectées par l’agent pour encadrer les solutions et lier les briques réutilisables.

Voir le [guide Think & Plan de coding-pal](https://alten-group.github.io/coding-pal/guide/domain-think-plan).

## Jalon de sortie

Un élément de travail quitte Think et entre dans [3 — Plan](./stage-plan) uniquement lorsque :

1. les options crédibles, y compris la réutilisation depuis la Forge, ont été évaluées et qu’une approche a été choisie,
2. les modules de code réutilisables et services partagés issus de **la Forge** sont liés à l’approche le cas échéant,
3. les contraintes d’architecture, les spécifications du domaine et les invariants du **Contexte persistant** sont validés,
4. le niveau de rayon d’impact est fixé (Faible, Moyen, Élevé ou Critique), avec la liste des systèmes et utilisateurs impactés qui le justifient, et le mécanisme de rollback est nommé pour les niveaux Élevé et Critique ([Gouvernance](./governance#blast-radius-and-required-human-validation)),
5. toutes les mises à jour requises du **Contexte persistant** sont identifiées pour être incluses dans le Plan, et les décisions d’architecture associées sont consignées dans un relevé de décision.
