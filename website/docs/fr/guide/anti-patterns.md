# 🚧 Anti-patrons

Les habitudes qui freinent la livraison autonome, et quoi faire à la place.

## Opérations et ingénierie

### Des développeurs qui écrivent encore la syntaxe du code

Utiliser l’IA comme autocomplétion tout en écrivant logique et tests à la main. Confiez le code aux agents ; concentrez-vous sur les spécifications, les contrôles et le Contexte persistant.

### Revues manuelles de syntaxe ligne par ligne

Relire les diffs générés comme condition de fusion. Utilisez les contrôles et l’[évaluation indépendante de Prove](./stage-prove#why-deterministic-controls-replace-manual-code-review). Les personnes résolvent les échecs, sans signature systématique.

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

Envoyer une demande vague directement à un agent. Définissez d’abord des critères testables dans [Plan](./stage-plan).

### Contrôles déterministes faibles (« Faire confiance au modèle »)

Se reposer sur l’auto-critique du LLM ou sur des tests unitaires superficiels qui ne vérifient pas les invariants. Le code généré doit affronter des vérifications automatisées (compilateurs, systèmes de types stricts, linters AST, tests) et des contrôles déterministes denses (tests de contrat, tests de mutation, scans de sécurité).

### Corriger à la main les bugs générés

Corriger le code généré à la main. Ajoutez un test en échec ou corrigez le [contexte](./persistent-context), puis laissez l’agent réparer l’implémentation.

### Effort de revue uniforme

Appliquer les mêmes contrôles à une correction de texte et à un changement de permissions. Adaptez les preuves au risque.

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

Un agent capable d’agir directement sur la production par commodité. Les agents passent par des demandes de fusion soumises aux contrôles et à la validation automatisée indépendante. Des décisions autonomes ne donnent pas un accès illimité à la production.

### Éparpillement des outils et fragmentation du contexte

Disperser exigences, code et preuves entre des outils déconnectés. Gardez-les liés sur [une plateforme Git](./tooling).

## Mesure

### Compter le volume de production

Lignes de code, nombre de pull requests, suggestions acceptées. La génération par IA rend tous ces indicateurs artificiellement gonflables et dénués de sens.

### Ne jamais rien supprimer

Une base de code où les fonctionnalités invalidées s’accumulent parce que supprimer donne l’impression de gaspiller. Chaque fonctionnalité morte taxe chaque passe de génération future et chaque futur relecteur.
