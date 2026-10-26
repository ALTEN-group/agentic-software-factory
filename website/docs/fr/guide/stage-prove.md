---
pageClass: page-stage-cyan
---

# ✅ 5 — Prove

<div class="stage-hero-banner banner-cyan">
  <span class="stage-hero-badge">ÉTAPE 5</span>
  <span class="stage-hero-desc">Validation par jalons déterministes et auto-remédiation par les agents</span>
</div>

La qualité n’est ni une phase tardive ni un marathon humain de relecture ligne par ligne. Dans l’Agentic Software Factory, Prove est l’étape qui combine **un réseau dense de contrôles déterministes pour l’auto-validation de l’IA** et une **validation humaine minimale** afin de garantir avec confiance que le logiciel généré est correct, sûr et aligné sur l’intention du client.

## Objectif

| Entrée | Sortie | Responsable |
|---|---|---|
| La pull request issue de [4 — Code](./stage-code), déjà au vert dans la boucle de l’agent | Une pull request ayant franchi tous les contrôles en CI et disposant d’une validation humaine enregistrée au niveau exigé par son rayon d’impact, prête à être mise en production | Développeur |

## Pourquoi les contrôles déterministes remplacent la revue de code manuelle {#why-deterministic-controls-replace-manual-code-review}

Lorsque le code est généré de manière autonome par l’IA, demander à des humains de relire manuellement la syntaxe ligne par ligne est un anti-patron dangereux :
- **Fatigue du relecteur** : les humains qui survolent de volumineux diffs passent à côté de défauts logiques subtils et d’hypothèses hallucinées.
- **Goulot d’étranglement cognitif** : la vélocité de livraison retombe à la vitesse de la lecture manuelle.
- **Fausse sécurité** : un « LGTM » (*Looks good to me*) n’apporte aucune garantie réelle.

L’Agentic Software Factory résout ce problème en transférant la charge de vérification vers des **contrôles déterministes denses et objectifs** qui s’exécutent en boucle fermée, réservant l’attention humaine exclusivement à l’intention métier de haut niveau et aux frontières de sécurité.

## Le harnais de contrôles déterministes

Les contrôles déterministes sont binaires : ils réussissent ou échouent avec une certitude absolue. Aucune approximation probabiliste n’est permise.

La plupart des contrôles s’exécutent également plus tôt, dans la propre boucle de l’agent lors de [4 — Code](./stage-code), de sorte que les échecs sont généralement corrigés avant même que la pull request n’existe. L’étape Prove les réexécute sur la pull request, dans un environnement propre, comme filet de sécurité. Elle exécute aussi les contrôles qui n’ont lieu qu’en CI. Chaque contrôle est détaillé dans [Contrôles déterministes](./deterministic-controls).

### Les contrôles déterministes

| Contrôle | Type | Exécution | Ce qu’il prouve |
|---|---|---|---|
| **Réexécution CI propre (*Clean CI Re-run*)** | Jalon (*Gate*) | CI dans un environnement vierge | Réexécute le build, le typage, le linter ainsi que les tests unitaires et d’intégration de [4 — Code](./stage-code) là où l’agent ne peut pas influencer le résultat |
| **Vérification des tests de critères** | Jalon (*Gate*) | Exécuteur de tests | Prouve que chaque critère d’acceptation du dossier Plan possède une assertion qui passe |
| **Compatibilité des contrats et schémas** | Contrat (*Contract*) | OpenAPI / JSON Schema / Pact | Garantit que les interfaces publiques et les contrats consommateurs ne sont jamais rompus silencieusement |
| **Seuil de tests de mutation (*Mutation Testing*)** | Jalon (*Gate*) | Exécuteur de tests de mutation | **Prouve la qualité des tests eux-mêmes** : injecte des mutants dans le code ; les tests doivent les détecter et les éliminer |
| **Tests d’API** | Contrat (*Contract*) | Tests d’API HTTP (par ex. Supertest) | Prouve que chaque point de terminaison renvoie les codes de statut et réponses convenus, pour des requêtes valides comme invalides |
| **Tests de fuzzing** | Sonde (*Probe*) | Fuzzing d’API depuis la spécification OpenAPI (par ex. RESTler) | Prouve que l’API gère les entrées inattendues et malformées sans erreur serveur ni crash |
| **Tests de base de données** | Jalon (*Gate*) | Assertions SQL sur une base migrée (par ex. PostgreSQL avec Liquibase) | Prouve que le schéma et les migrations se comportent comme spécifié : lectures, écritures, archivage et historique d’audit |
| **Tests de bout en bout (E2E)** | Sonde (*Probe*) | Tests navigateur de parcours utilisateurs réels (par ex. Playwright) | Prouve que les parcours principaux fonctionnent du point de vue de l’utilisateur, sur l’application en cours d’exécution |
| **Sécurité et Policy-as-Code** | Garde (*Guard*) | Semgrep / Trivy / OPA Conftest, protection des secrets et des pushs | Vérifie l’absence de CVE connues, de secrets et de violations de politiques. La protection des secrets s’exécute aussi au commit dans Code et est de nouveau appliquée ici en CI |
| **Smoke tests de prévisualisation** | Sonde (*Probe*) | Environnement éphémère de prévisualisation | Prouve que l’application démarre, route le trafic et répond aux vérifications d’état (*health checks*) |

Les tests d’API, de fuzzing, de base de données et E2E sont générés avec le code, tout comme les tests unitaires, et s’exécutent contre une véritable pile applicative en cours d’exécution ou une base de données migrée. La vérification des tests de critères et les tests de mutation garantissent leur fiabilité en prouvant qu’ils couvrent bien les critères d’acceptation et qu’ils interceptent de vrais défauts.

## Auto-remédiation par l’agent

Si un jalon déterministe échoue en CI, l’agent IA est automatiquement déclenché avec les diagnostics d’erreur. L’agent :
1. lit la sortie du jalon en échec, telle qu’une erreur de réexécution propre, un critère d’acceptation non couvert, un mutant survivant ou une rupture de contrat,
2. diagnostique le défaut exact,
3. corrige le code de manière autonome. Il ne peut jamais affaiblir ni ignorer un contrôle déterministe pour obtenir un succès,
4. commite la correction et relance le harnais déterministe.

Ce cycle se répète automatiquement jusqu’à ce que chaque contrôle déterministe passe, ou que la limite de boucle de correction fixée dans [4 — Code](./stage-code) soit atteinte et que le développeur intervienne. Les humains ne sont jamais sollicités pour dépanner de banales erreurs de compilation ou de formatage.

## Où l’IA est utilisée

Les contrôles déterministes tranchent. L’IA écrit les suites de tests et effectue le travail de réparation.

| Tâche | Rôle de l’IA | Rôle humain |
|---|---|---|
| **Diagnostic des échecs** | Lire la sortie du jalon en échec et localiser le défaut | Aucun pour les échecs courants |
| **Remédiation** | Réécrire le code pour satisfaire le jalon, dans la limite de la boucle de correction, sans jamais affaiblir un contrôle | Intervenir uniquement lorsque la limite est atteinte |
| **Suites de tests** | Écrire et maintenir les tests d’API, de fuzzing, de base de données et E2E exécutés par les contrôles | Confirmer que les tests couvrent les critères d’acceptation |

## Validation humaine minimale {#minimum-human-validation}

Une fois que tous les contrôles déterministes sont au vert, la pull request entre en **Validation humaine minimale**.
Les relecteurs **ne lisent pas la syntaxe ligne par ligne**. La validation humaine se concentre strictement sur trois questions précises :

1. **Intention du client** : cette fonctionnalité livre-t-elle fidèlement ce que le client a demandé lors de la réunion ?
2. **Expérience comportementale** : l’environnement de prévisualisation en direct a-t-il l’apparence, le comportement et l’ergonomie attendus ?
3. **Sécurité et rayon d’impact** : le changement respecte-t-il les contraintes opérationnelles et dispose-t-il d’un chemin de rollback propre ?

### Validation humaine pondérée par le risque

Le niveau de validation humaine requis pour un changement dépend de son rayon d’impact (*blast radius*), classifié lors de [2 — Think](./stage-think) et revérifié lors de [3 — Plan](./stage-plan) au regard du périmètre de fichiers. Les paliers (Faible, Moyen, Élevé, Critique) et la validation exigée pour chacun sont définis dans [Gouvernance](./governance#blast-radius-and-required-human-validation).

## La règle des bugs

Chaque défaut en production doit donner lieu à une nouvelle vérification ou à un nouveau contrôle automatisé (un cas de test en échec, une règle de linter plus stricte, un validateur de schéma ou un nouveau garde) commité avant le correctif. L’agent IA corrige ensuite le code pour satisfaire cette nouvelle vérification ou ce nouveau contrôle, afin que le bug ne puisse jamais réapparaître silencieusement.

## Primitives dans le Contexte persistant

L’étape Prove s’appuie sur des primitives de vérification déterministe publiées par [coding-pal](https://alten-group.github.io/coding-pal/) :

### Auto-remédiation et gouvernance
- Un agent **Gate Fixer** lit les diagnostics des jalons en échec et répare chirurgicalement l’implémentation dans la limite de la boucle de correction.
- Une instruction **prove-controls** impose l’intégrité des contrôles : les agents peuvent exécuter les contrôles mais ne peuvent jamais les affaiblir, les modifier ni les contourner ; toute dérogation exige un motif documenté, un approbateur et une date d’expiration ; les corrections de bugs exigent d’abord un test en échec.

### Compétences de vérification et de jalons de qualité
- Une compétence **criteria-verify** analyse les rapports de test et vérifie une couverture d’assertions à 100 % pour chaque critère d’acceptation de `plan.md`.
- Une compétence **mutation-bar** exécute les tests de mutation sur le code modifié, en vérifiant que les tests détectent et éliminent les mutants injectés afin d’éviter les suites de tests complaisantes.
- Une compétence **contract-compat** vérifie que les contrats d’API publiques, les schémas et les formats de messages restent rétrocompatibles avec les consommateurs.

### Intégrité, sécurité et sondes comportementales
- Une compétence **control-guard** protège le harnais lui-même : elle détecte et rejette toute PR qui abaisse les seuils de test, désactive des workflows ou modifie des fichiers de contrôle protégés, tout en appliquant la règle des bugs.
- Les compétences **secret-guard** et **dependency-guard** vérifient l’absence totale de jetons ou clés codés en dur et s’assurent que les nouveaux paquets respectent les politiques de licence et de vulnérabilités.
- Une compétence **preview-smoke** sonde le déploiement éphémère en cours d’exécution pour vérifier le démarrage, le routage HTTP et les *health checks* avant la validation humaine.

### Pipeline et approbation humaine
- Une compétence **pr-record** valide que les approbations humaines enregistrées correspondent au palier de rayon d’impact déterminé dans Think et Plan.
- Un modèle de workflow **verification-pipeline** fournit le squelette CI en environnement propre qui exécute les jalons dans l’ordre.

Consultez le [guide Prove de coding-pal](https://alten-group.github.io/coding-pal/guide/domain-prove).

## Jalon de sortie

Un changement quitte Prove et entre dans [Release](./stage-release) lorsque :

1. chaque contrôle déterministe est au vert,
2. la validation humaine minimale est enregistrée au niveau exigé par le rayon d’impact,
3. pour les changements à rayon d’impact Élevé et Critique, le mécanisme de rollback désigné dans [Think](./stage-think) est configuré et validé.
