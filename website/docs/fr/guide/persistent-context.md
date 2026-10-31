# 🧠 Contexte persistant

<EnablerBlock type="persistent-context" />

Le Contexte persistant est le savoir versionné qui guide les agents : règles, tâches, workflows et décisions passées.

## Pourquoi

Les agents ont besoin de conventions et de décisions réutilisables. Consignez-les une fois plutôt que de les répéter dans chaque conversation.

## Primitives

Quatre types de fichiers guident les agents : **instructions** (règles), **prompts** (tâches), **skills** (workflows) et **agents** (spécialistes). Voir [coding-pal](https://alten-group.github.io/coding-pal/guide/persistent-context) pour savoir quand et comment les utiliser.
[coding-pal](https://alten-group.github.io/coding-pal/) publie également des catalogues d’[instructions](https://alten-group.github.io/coding-pal/guide/catalog-instructions), de [prompts](https://alten-group.github.io/coding-pal/guide/catalog-prompts), de [compétences (*skills*)](https://alten-group.github.io/coding-pal/guide/catalog-skills) et d’[agents](https://alten-group.github.io/coding-pal/guide/catalog-agents).

## Le Contexte persistant à travers les étapes

Le Contexte persistant soutient les étapes **[0 — Meet](./stage-meet)** à **[5 — Prove](./stage-prove)**.
En retour, **[7 — Learn](./stage-learn)** enrichit le Contexte persistant :

| Étape | Rôle du Contexte persistant |
|---|---|
| **0 — Meet** | Fournit le glossaire du domaine, les spécifications ainsi que les instructions et prompts de l’agent de réunion, et reçoit en retour la nouvelle terminologie client |
| **1 — Triage** | Ancre la qualification et la mise en correspondance des exigences avec les capacités existantes et les glossaires du domaine |
| **2 — Think** | Fournit les invariants d’architecture, les relevés de décision et les frontières du domaine qui encadrent les options |
| **3 — Plan** | Alimente les contraintes et les invariants non fonctionnels reportés dans le plan |
| **4 — Code** | Guide les agents IA avec les conventions du dépôt, les règles de typage et les compétences d’exécution |
| **5 — Prove** | Encadre les boucles d’auto-remédiation des agents afin que les correctifs automatisés respectent les relevés de décision et les contrats |
| **7 — Learn** | Reçoit de nouvelles instructions, de nouveaux prompts, compétences, agents et relevés de décision issus des constats en production |

## Qui en est responsable

L’Architecte est garant du Contexte persistant, et chaque équipe y contribue par le biais de pull requests.

## Où il réside

Le Contexte persistant réside à deux endroits, selon l’étendue de son application.

| | Spécifique au projet | Partagé (global et générique) |
|---|---|---|
| **Contenu** | Ce dont seule cette application a besoin : ses propres instructions, spécifications et relevés de décision | Ce dont chaque projet a besoin : standards de codage, conventions de test, ainsi que les agents, compétences et prompts génériques |
| **Emplacement** | Dans le dépôt de l’application, à côté du code qu’il décrit | Dans un dépôt dédié, tel que [coding-pal](https://alten-group.github.io/coding-pal/) |
| **Distribution au projet** | Il s’y trouve déjà et est relu comme le code qu’il décrit | Il est installé dans chaque projet via un gestionnaire de paquets ([coding-pal](https://alten-group.github.io/coding-pal/) utilise [APM](https://alten-group.github.io/coding-pal/guide/apm-distribution)), de sorte qu’une modification profite à tous les projets |

Les deux sont commités, relus via des pull requests et versionnés.

## Règles

1. **Commité, relu, versionné.** Tout artefact de contexte évolue par pull request.
2. **Guidé par la preuve.** Les nouveaux artefacts proviennent de [7 — Learn](./stage-learn) : une erreur corrigée deux fois, ou un point réexpliqué deux fois.
3. **Court et spécifique.** Les instructions qui tentent de tout couvrir finissent ignorées tant par les modèles que par les humains.
4. **Ciblé avec précision.** Les instructions déclarent le motif de fichiers (*glob*) le plus restreint possible ; des motifs trop larges gaspillent du contexte à chaque requête.
5. **Supprimé dès qu’obsolète.** Une instruction périmée est pire qu’aucune instruction : elle produit un résultat assuré, cohérent et faux.
6. **Ne contient jamais de secrets.** Les artefacts de contexte sont lus par les outils et partagés entre les sessions.

## Signaux de santé

| Signal | Sain | Dégradé |
|---|---|---|
| Itérations de boucle de correction nécessaires | En baisse (1 à 2 boucles) | Stable ou supérieur à 3 boucles |
| Corrections humaines manuelles lors de la validation | Proche de zéro | Fréquentes |
| Nombre d’instructions | Stable, chacune étant utilisée | En croissance continue sans élagage |
| Taux de succès au premier passage dans Code | > 80 % | < 50 % |
| Conformité du code généré aux conventions du dépôt | Élevée | Nécessite des réécritures |
