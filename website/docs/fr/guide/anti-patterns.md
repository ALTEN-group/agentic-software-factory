# 🚧 Anti-patrons

Des comportements qui ressemblent en apparence à l’adoption de l’Agentic Software Factory mais qui en inversent silencieusement l’intention. Chacun d’entre eux a été la cause d’une transformation ratée quelque part.

## Opérations et ingénierie

### Des développeurs qui écrivent encore la syntaxe du code

L’anti-patron fatal : des développeurs qui utilisent l’IA comme une simple autocomplétion améliorée tout en continuant à écrire manuellement la logique applicative, le code répétitif (*boilerplate*) et les tests. Dans l’Agentic Software Factory, les développeurs n’écrivent pas de code : ils conçoivent les spécifications, construisent les contrôles déterministes et entretiennent le Contexte persistant. Le codage manuel crée des goulots d’étranglement, des habitudes tribales non commitées et un faible effet de levier IA.

### Revues manuelles de syntaxe ligne par ligne

Des développeurs qui passent des heures à lire des milliers de lignes de diffs générés dans des pull requests. Tout ce qui peut être vérifié automatiquement doit l’être par des vérifications automatisées et des contrôles déterministes ; les humains effectuent uniquement la Validation humaine minimale sur l’intention client et les invariants de sécurité. Voir [Prove](./stage-prove#why-deterministic-controls-replace-manual-code-review).

### Ignorer les réunions clients et développer à partir de tickets périmés

Des développeurs isolés du dialogue client, qui s’appuient sur des résumés de tickets de troisième main. Dans le développement piloté par les réunions, le dialogue avec le client est la source primaire du signal, capturée et structurée par l’IA ([0 — Meet](./stage-meet)).

### Le centre d’excellence IA qui monopolise la livraison

Une équipe centrale qui écrit le code assisté par IA pour tout le monde. Elle devient vite une file d’attente, les squads perdent la maîtrise de leurs livrables et la pratique ne se diffuse jamais. Les équipes d’accompagnement (*enablement*) livrent des capacités, pas des fonctionnalités.

### L’accompagnement transformé en comité d’approbation

L’équipe plateforme ou sécurité qui se transforme en guichet auquel les squads doivent demander la permission. La bonne réponse à des demandes d’approbation récurrentes est un garde-fou déterministe automatisé, pas une réunion.

### Les squads découpées par couche technologique

« Squad Frontend », « Squad API », « Squad Data ». Chaque résultat utilisateur nécessite alors trois squads et deux passages de relais. Les frontières doivent suivre les résultats métier.

## Processus et qualité

### Sauter l’étape Plan

Envoyer un extrait de réunion vague directement à un agent de codage sans structurer les critères d’acceptation. Le modèle comble les blancs par des suppositions plausibles, et l’auto-validation ne peut pas vérifier ce qui n’a jamais été spécifié. C’est lors de [3 — Plan](./stage-plan) qu’il est le moins coûteux de lever les ambiguïtés.

### Contrôles déterministes faibles (« Faire confiance au modèle »)

Se reposer sur l’auto-critique du LLM ou sur des tests unitaires superficiels qui ne vérifient pas les invariants. Le code généré doit affronter des vérifications automatisées (compilateurs, systèmes de types stricts, linters AST, tests) et des contrôles déterministes denses (tests de contrat, tests de mutation, scans de sécurité).

### Corriger à la main les bugs générés

Un développeur qui repère un bug dans le code généré et tape manuellement le correctif dans le fichier source. La bonne réponse consiste à ajouter un test déterministe ou à mettre à jour l’instruction du [Contexte persistant](./persistent-context), puis à laisser l’agent IA régénérer et corriger l’implémentation.

### Effort de revue uniforme

Accorder la même attention à un refactoring interne qu’à une modification des permissions d’authentification ou des données personnelles (PII). La revue est pondérée par le risque, ou ce n’est que du théâtre.

### Regrouper les mises en production par lots (*Batching*)

Retenir les changements pour une release hebdomadaire « par sécurité ». Le regroupement par lots démultiplie le rayon d’impact et détruit la corrélation entre un changement et son effet.

## Contexte et usage de l’IA

### Prompter au lieu d’enrichir le contexte

Rédiger des prompts toujours plus longs pour réexpliquer les mêmes conventions dans le chat. C’est le signe d’un [Contexte persistant](./persistent-context) manquant, et non d’un manque de compétence en *prompt engineering*.

### L’instruction fourre-tout

Un fichier d’instructions unique de 900 lignes censé couvrir toute l’ingénierie. Les modèles le pondèrent mal, les humains cessent de le lire et il dérive rapidement. Privilégiez des artefacts courts, ciblés et fondés sur des preuves.

### Laisser en place un contexte obsolète

Une instruction décrivant un framework que l’entreprise a abandonné. C’est pire qu’aucune instruction : cela produit à grande échelle un code assuré, cohérent et faux.

### Déploiement à l’instinct (*Vibes-based rollout*)

Essayer un nouveau modèle sur un seul prompt, l’apprécier et l’activer pour tout le monde. Sans évaluation rigoureuse, un seul changement peut dégrader le travail de toute l’organisation du jour au lendemain.

### Des agents dotés d’accès directs à la production

Un agent capable d’agir directement sur la production par simple commodité. Les agents agissent exclusivement via des pull requests soumises à des contrôles déterministes ; les humains valident avant la fusion.

### Éparpillement des outils et fragmentation du contexte

Disperser le travail entre des outils SaaS déconnectés fragmente le graphe de connaissances dont dépendent les agents IA. Voir [Outillage](./tooling) pour comprendre pourquoi le cycle de vie est consolidé sur une pile Git unique et unifiée.

## Mesure

### Compter le volume de production

Lignes de code, nombre de pull requests, suggestions acceptées. La génération par IA rend tous ces indicateurs artificiellement gonflables et dénués de sens.

### Ne jamais rien supprimer

Une base de code où les fonctionnalités invalidées s’accumulent parce que supprimer donne l’impression de gaspiller. Chaque fonctionnalité morte taxe chaque passe de génération future et chaque futur relecteur.
