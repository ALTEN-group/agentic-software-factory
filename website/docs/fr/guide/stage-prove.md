---
pageClass: page-stage-cyan
---

# ✅ 5 — Prove

<div class="stage-hero-banner banner-cyan">
  <span class="stage-hero-badge">ÉTAPE 5</span>
  <span class="stage-hero-desc">Validation par jalons déterministes et auto-remédiation par les agents</span>
</div>

Prove relance les contrôles en CI propre. Un agent indépendant vérifie l’intention, le comportement et la sécurité. Les changements validés peuvent fusionner automatiquement, sans signature humaine.

## Objectif

| Entrée | Sortie | Responsable |
|---|---|---|
| Une demande de fusion ayant passé les contrôles de [Code](./stage-code) | Résultats CI, évaluation indépendante et preuves de risque autorisant la fusion automatique | Développeur, responsable de l’automatisation |

## Pourquoi les contrôles déterministes remplacent la revue de code manuelle {#why-deterministic-controls-replace-manual-code-review}

La revue manuelle ne suit pas le rythme des changements générés et peut manquer des défauts. Utilisez des contrôles exécutables et une évaluation indépendante. Les personnes interviennent sur les échecs non résolus ou les tentatives épuisées.

## Le harnais de contrôles déterministes

Les contrôles renvoient succès ou échec. La plupart ont déjà tourné dans [Code](./stage-code) ; Prove les relance en CI propre et ajoute les contrôles propres à la CI. Voir [Contrôles déterministes](./deterministic-controls).

### Les contrôles déterministes

| Contrôle | Type | Exécution | Ce qu’il vérifie |
|---|---|---|---|
| **Réexécution CI propre** | Jalon | CI dans un environnement vierge | Relance build, typage, lint et tests de [Code](./stage-code), hors du contrôle de l’agent |
| **Vérification des critères** | Jalon | Exécuteur de tests | Chaque critère du Plan a une assertion qui passe |
| **Compatibilité des contrats et schémas** | Contrat | OpenAPI / JSON Schema / Pact | Les interfaces ne cassent pas silencieusement les consommateurs |
| **Tests de mutation** | Jalon | Exécuteur de mutations | Les tests détectent les défauts injectés |
| **Tests d’API** | Contrat | Tests HTTP, par ex. Supertest | Statuts et réponses respectent le contrat, sur requêtes valides et invalides |
| **Tests de fuzzing** | Sonde | Fuzzing OpenAPI, par ex. RESTler | Les entrées malformées ne provoquent ni erreur serveur ni crash |
| **Tests de base de données** | Jalon | Assertions SQL sur une base migrée | Lectures, écritures, migrations, archivage et audit respectent la spécification |
| **Tests E2E** | Sonde | Tests navigateur, par ex. Playwright | Les parcours principaux fonctionnent sur l’application |
| **Sécurité et Policy-as-Code** | Garde | Semgrep / Trivy / OPA Conftest, protection des secrets | Recherche les vulnérabilités connues, secrets et violations. Les secrets sont aussi vérifiés au commit |
| **Smoke tests** | Sonde | Prévisualisation éphémère | Démarrage, routage et points de santé fonctionnent |

Générez les tests d’API, de fuzzing, de base de données et E2E avec le code. Exécutez-les sur une pile réelle ou une base migrée. Vérifiez la couverture des critères et utilisez les mutations pour mesurer la détection des défauts injectés.

## Auto-remédiation par l’agent

Lorsqu’un contrôle CI échoue, l’agent :
1. lit les diagnostics,
2. trouve et corrige le défaut sans modifier ni contourner les contrôles,
3. commite la correction et relance les vérifications.

Répéter jusqu’au succès ou à la [limite de tentatives](./stage-code). Ensuite, escalader à un développeur.

## Où l’IA est utilisée

Les contrôles tranchent succès/échec. L’IA écrit les tests, corrige le code et réalise l’évaluation indépendante.

| Tâche | Rôle de l’IA | Rôle humain |
|---|---|---|
| **Diagnostic des échecs** | Lire la sortie du jalon en échec et localiser le défaut | Aucun pour les échecs courants |
| **Remédiation** | Réécrire le code pour satisfaire le jalon, dans la limite de la boucle de correction, sans jamais affaiblir un contrôle | Intervenir uniquement lorsque la limite est atteinte |
| **Suites de tests** | Écrire et maintenir les suites ; les contrôles vérifient la couverture des critères | Intervenir si la couverture ne peut pas être établie |

## Évaluation automatisée indépendante {#minimum-human-validation}

Un agent Prove indépendant consigne les preuves répondant à trois questions :

1. **Intention du client** : cette fonctionnalité livre-t-elle fidèlement ce que le client a demandé lors de la réunion ?
2. **Expérience comportementale** : l’environnement de prévisualisation en direct a-t-il l’apparence, le comportement et l’ergonomie attendus ?
3. **Sécurité et rayon d’impact** : le changement respecte-t-il les contraintes opérationnelles et dispose-t-il d’un chemin de rollback propre ?

### Validation automatisée pondérée par le risque

Les preuves requises dépendent du rayon d’impact, classifié dans [2 — Think](./stage-think) puis vérifié dans [3 — Plan](./stage-plan). Tous les niveaux peuvent continuer automatiquement ; Élevé et Critique conservent la vérification du rollback et Critique exige un déploiement progressif, selon [Gouvernance](./governance#blast-radius-and-required-human-validation).

## La règle des bugs

Chaque défaut en production doit donner lieu à une nouvelle vérification ou à un nouveau contrôle automatisé (un cas de test en échec, une règle de linter plus stricte, un validateur de schéma ou un nouveau garde) commité avant le correctif. L’agent IA corrige ensuite le code pour satisfaire cette nouvelle vérification ou ce nouveau contrôle, afin que le bug ne puisse jamais réapparaître silencieusement.

## Agents et skills {#primitives-dans-le-contexte-persistant}

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
- Une compétence **preview-smoke** vérifie le démarrage, le routage HTTP et les *health checks* du déploiement éphémère avant fusion.

### Pipeline et approbation automatisée
- Une compétence **pr-record** valide les résultats automatisés, les preuves de rollback et les références de déploiement progressif selon le niveau fixé dans Think et Plan, sans les présenter comme des signatures humaines.
- Un modèle de workflow **verification-pipeline** fournit le squelette CI en environnement propre qui exécute les jalons dans l’ordre.

Consultez le [guide Prove de coding-pal](https://alten-group.github.io/coding-pal/guide/domain-prove).

## Pipeline de livraison

Le pipeline Prove valide une demande de fusion existante avant qu’elle puisse être fusionnée, selon les [déclencheurs et points de revue communs](./platform-rails#declencheurs-points-de-revue-et-statuts) :

1. Positionne le statut de phase sur **Prove** (ou **Release** sur un tableau combiné) avant le début de la validation ; cela ne signifie pas que le changement a passé les contrôles.
2. Exécute les contrôles sur les spécifications, le périmètre, les secrets, les dépendances, les tests, les builds, les critères d’acceptation et les métadonnées de demande de fusion.
3. Lance l’agent Prove pour évaluer l’implémentation et rédiger un dossier de validation.
4. Si les contrôles échouent, applique des corrections automatiques et réessaie jusqu’à la limite configurée, **5 tentatives dans le socle de la factory**, puis demande l’intervention d’un développeur.
5. Consigne le verdict automatisé et ses preuves et autorise la fusion lorsque tous les contrôles et évaluations passent, à tous les niveaux d’impact.

Après validation, la plateforme fusionne et supprime la branche selon la politique de livraison. Elle transmet la révision et les preuves à [Release](./stage-release#pipelines-de-publication-et-de-deploiement).

Positionnez **Done** seulement au point de fin convenu : fusion, publication ou déploiement.

**Point d’arrêt :** revue demandée, passage à Release ou échec non résolu. Atteindre la limite bloque la fusion. Un échec de livraison ultérieur n’annule pas une fusion ; appliquez la politique de reprise.

::: warning L’autonomie n’est pas une dérogation
Tous les niveaux peuvent fusionner automatiquement, mais contrôles, évaluation indépendante, rollback, politique de déploiement et limites restent appliqués. Ne fabriquez pas de signature et ne contournez pas les protections.
:::

**La réussite de Prove ne prouve pas à elle seule la publication ou le déploiement en production.** Suivez ces résultats dans leurs propres pipelines.

## Jalon de sortie

Un changement quitte Prove et entre dans [Release](./stage-release) lorsque :

1. chaque contrôle déterministe est au vert,
2. l’évaluation automatisée indépendante et les preuves du niveau d’impact sont consignées,
3. pour les changements à rayon d’impact Élevé et Critique, le mécanisme de rollback désigné dans [Think](./stage-think) est configuré et validé.
