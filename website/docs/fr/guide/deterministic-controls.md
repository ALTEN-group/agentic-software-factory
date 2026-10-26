# 🛡️ Contrôles déterministes

Gardes (*guards*), jalons (*gates*), contrats (*contracts*) et sondes (*probes*) : les contrôles automatisés et déterministes qui font du chemin sûr l’unique chemin possible.

## Pourquoi

Les agents IA génèrent un grand volume de changements à grande vitesse, et **les développeurs ne codent pas manuellement** ni ne relisent le code ligne par ligne. Les règles qui reposent sur la mémoire humaine ne peuvent pas suivre la cadence. Les règles doivent s’exécuter d’elles-mêmes et renvoyer un verdict binaire : succès ou échec.

> Une squad ou un agent devrait avoir du mal à faire quelque chose de risqué, et ne devrait jamais avoir de mal à faire quelque chose de sûr.

Toute règle qui n’existe que dans un document de politique générale n’est pas un contrôle : c’est un vœu pieux. Dans l’Agentic Software Factory, **tous les contrôles déterministes sont exécutables et déterministes**.

## Contrôles déterministes et Contexte persistant

Les contrôles déterministes ne sont pas la même chose que le [Contexte persistant](./persistent-context), mais ils en font partie intégrante.

- **Des rôles complémentaires.** Le Contexte persistant détient le savoir qui guide les agents : instructions, prompts, compétences et agents. Le modèle le lit et l’interprète. Un contrôle, en revanche, est un script qui renvoie « succès » ou « échec », de sorte que l’agent ne puisse pas réinterpréter le résultat.
- **Distribués de la même manière.** Les contrôles sont empaquetés sous forme de compétences (*skills*), si bien qu’ils vivent et circulent comme le reste du Contexte persistant. Ils sont conservés dans le dépôt partagé ou dans le projet, installés dans chaque projet, versionnés et relus via des pull requests. Dans [coding-pal](https://alten-group.github.io/coding-pal/guide/deterministic-controls), les gardes, jalons, contrats et sondes sont des compétences que les agents exécutent au sein de leur propre boucle.

## Vérifications automatisées et contrôles déterministes

Les deux sont déterministes : un script renvoie un succès ou un échec, jamais une opinion. Ils diffèrent par ce qu’ils vérifient.

| | Vérifications automatisées | Contrôles déterministes |
|---|---|---|
| **Quoi** | Compilateur et build, vérifications de typage, linters et tests automatisés générés avec le code | Gardes, jalons, contrats et sondes |
| **Objectif** | Prouver que le code fonctionne | Prouver que le changement peut être fusionné et mis en production sans risque |
| **Où ils s’exécutent** | Dans la boucle propre de l’agent lors de [4 — Code](./stage-code), puis à nouveau dans la CI sur la pull request lors de [5 — Prove](./stage-prove) | Aux deux mêmes endroits |
| **L’agent peut-il les modifier ?** | L’agent écrit les tests, il peut donc les éditer | Les règles et scripts sont fixes ; l’agent les exécute mais ne les modifie pas. Les suites de tests générées sont tenues en respect par la vérification des tests de critères et les tests de mutation |

Leur exécution précoce maintient une boucle rapide : un échec est corrigé en quelques secondes à l’intérieur de la boucle de l’agent, et non lors d’un cycle CI ultérieur. La réexécution en CI sert de filet de sécurité, dans un environnement propre, pour tout ce qui aurait pu passer entre les mailles. La CI exécute également les contrôles qui ne peuvent tourner que là-bas, comme les smoke tests sur environnement de prévisualisation.

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
