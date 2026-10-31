# 🛡️ Contrôles déterministes

<EnablerBlock type="deterministic-controls" />

Gardes, jalons, contrats et sondes sont des règles exécutables qui renvoient succès ou échec.

## Pourquoi

Les agents génèrent des changements plus vite que les personnes ne peuvent les relire. Les règles de sécurité doivent s’exécuter automatiquement.

> Une squad ou un agent devrait avoir du mal à faire quelque chose de risqué, et ne devrait jamais avoir de mal à faire quelque chose de sûr.

Une politique écrite n’est pas un contrôle tant qu’elle n’est pas exécutable.

## Contrôles déterministes et Contexte persistant

Les contrôles déterministes ne sont pas la même chose que le [Contexte persistant](./persistent-context), mais ils en font partie intégrante.

- **Des rôles distincts.** Le contexte guide le modèle ; les contrôles imposent des règles avec un résultat succès/échec.
- **Une même distribution.** Les contrôles sont des skills versionnés dans un dépôt partagé ou propre au projet. Les projets les installent comme les autres éléments de contexte. Voir [coding-pal](https://alten-group.github.io/coding-pal/guide/deterministic-controls).

## Vérifications automatisées et contrôles déterministes

Les deux sont déterministes : un script renvoie un succès ou un échec, jamais une opinion. Ils diffèrent par ce qu’ils vérifient.

| | Vérifications automatisées | Contrôles déterministes |
|---|---|---|
| **Quoi** | Compilateur et build, vérifications de typage, linters et tests automatisés générés avec le code | Gardes, jalons, contrats et sondes |
| **Objectif** | Prouver que le code fonctionne | Prouver que le changement peut être fusionné et mis en production sans risque |
| **Où ils s’exécutent** | Dans la boucle propre de l’agent lors de [4 — Code](./stage-code), puis à nouveau dans la CI sur la pull request lors de [5 — Prove](./stage-prove) | Aux deux mêmes endroits |
| **L’agent peut-il les modifier ?** | L’agent écrit les tests, il peut donc les éditer | Les règles et scripts sont fixes ; l’agent les exécute mais ne les modifie pas. Les suites de tests générées sont tenues en respect par la vérification des tests de critères et les tests de mutation |

Exécutez les contrôles dans la boucle de l’agent pour corriger vite. Répétez-les en CI propre, avec les contrôles propres à la CI, comme les smoke tests.

## Les contrôles

| Contrôle | Type | S’exécute dans | Application | Objectif |
|---|---|---|---|---|
| **Protection des secrets et des pushs** | Garde (*Guard*) | Boucle de l’agent, au commit et en CI | Hooks Git de la plateforme et CI | Bloque immédiatement les commits contenant des identifiants, jetons ou clés privées |
| **Policy-as-Code** | Garde (*Guard*) | Boucle de l’agent et CI | Open Policy Agent (OPA) / Conftest | Applique de façon déterministe les règles d’infrastructure, de sécurité et de configuration cloud |
| **Scan de licences et SAST** | Garde (*Guard*) | Boucle de l’agent et CI | Semgrep / Snyk / Trivy | Bloque les licences open source non autorisées et les dépendances présentant des vulnérabilités connues |
| **Réexécution CI propre (*Clean CI Re-run*)** | Jalon (*Gate*) | CI (filet de sécurité) | CI dans un environnement vierge | Répète les vérifications et contrôles sur la pull request, là où l’agent ne peut pas influencer le résultat |
| **Vérification des tests de critères** | Jalon (*Gate*) | Boucle de l’agent et CI | Exécuteur de tests | Prouve que 100 % des critères d’acceptation du dossier Plan possèdent des assertions qui passent |
| **Seuil de tests de mutation** | Jalon (*Gate*) | Boucle de l’agent et CI | Stryker / Mutmut | Prouve que les suites de tests générées sont pertinentes et détectent réellement les défauts injectés |
| **Compatibilité des contrats et schémas** | Contrat (*Contract*) | Boucle de l’agent et CI | OpenAPI / JSON Schema / Pact | Prouve que les modifications ne cassent pas les consommateurs externes ni les API aval |
| **Tests d’API** | Contrat (*Contract*) | Boucle de l’agent et CI | Tests d’API HTTP (par ex. Supertest) | Prouve que chaque point de terminaison renvoie les codes de statut et réponses convenus |
| **Tests de fuzzing** | Sonde (*Probe*) | CI (prévisualisation) | Fuzzing d’API depuis la spécification OpenAPI (par ex. RESTler) | Prouve que l’API gère les entrées inattendues et malformées sans erreurs ni crashs |
| **Tests de base de données** | Jalon (*Gate*) | Boucle de l’agent et CI | Assertions SQL sur une base migrée | Prouve que le schéma et les migrations se comportent comme spécifié |
| **Tests E2E** | Sonde (*Probe*) | CI (prévisualisation) | Tests navigateur de parcours utilisateurs réels (par ex. Playwright) | Prouve que les parcours principaux fonctionnent sur l’application en cours d’exécution |
| **Smoke tests de prévisualisation** | Sonde (*Probe*) | CI (prévisualisation) | Environnement éphémère de prévisualisation | Prouve que l’application démarre, route le trafic et répond aux *health checks* |

## Comment les contrôles se renforcent

L’étape [7 — Learn](./stage-learn) alimente directement cette page : tout défaut ou rollback qu’un contrôle aurait dû intercepter plus tôt se traduit par un jalon, un seuil ou une sonde plus strict.

## Mode de défaillance à éviter

Les contrôles qui se déclenchent constamment sur des faux positifs finissent par être désactivés. Chaque contrôle a un responsable qui surveille son rapport signal/bruit ; un contrôle régulièrement contourné est soit corrigé, soit supprimé, mais jamais laissé à titre décoratif.
