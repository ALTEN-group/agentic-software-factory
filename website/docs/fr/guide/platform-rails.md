# 🛤️ Rails de plateforme

Les Rails de plateforme donnent à chaque squad un socle de livraison prêt à l’emploi.

## Objectif

Faire de la livraison sûre et autonome le fonctionnement par défaut.

## Ce que fournissent les Rails de plateforme

### Forge, Contexte persistant et catalogue d’agents

Les rails distribuent [la Forge](./forge), le [Contexte persistant](./persistent-context) et les [Contrôles déterministes](./deterministic-controls) à chaque projet, afin que toutes les squads partent du même socle. L’Architecte est garant de leur contenu.

### Pipeline de livraison

Chaque dépôt reçoit le même squelette de vérification : des vérifications et contrôles automatisés dans la boucle de l’agent, puis à nouveau ces mêmes vérifications et contrôles dans la CI.

Les pages des étapes décrivent les pipelines de [Think](./stage-think#pipeline-de-livraison), [Plan](./stage-plan#pipeline-de-livraison), [Code](./stage-code#pipeline-de-livraison), [Prove](./stage-prove#pipeline-de-livraison) et de [publication/déploiement](./stage-release#pipelines-de-publication-et-de-deploiement). Le même parcours peut fonctionner sur toute plateforme d’hébergement Git et de CI/CD.

#### Déclencheurs, points de revue et statuts

**Les déclencheurs lancent le travail ; les statuts indiquent sa progression.** Un déclencheur peut être une action, un label, un appel API ou un lancement manuel. Un changement de statut ne lance le pipeline que si cela est configuré.

Permettez au demandeur de choisir jusqu’où exécuter le parcours :

| Point d’arrêt demandé | Exécution jusqu’à |
|---|---|
| Think | La spécification validée, puis revue humaine |
| Plan | Le plan d’implémentation validé, puis revue humaine |
| Code | La demande de fusion ouverte (pull request ou merge request), puis revue humaine |
| Livraison complète | Prove, la fusion autorisée et les étapes de publication/déploiement configurées |

Limitez les exécutions simultanées par une file. À la reprise, réutilisez les spécifications valides et demandes de fusion existantes. Revalidez ce qui est affecté par un changement d’exigences ou de code.

Les pauses de revue sont facultatives. Sinon, tous les niveaux de risque avancent automatiquement après validation. Consignez l’agent, les preuves et la date, pas une signature humaine.

**Un statut de phase indique son démarrage, pas sa réussite.** Positionnez-le avant de lancer l’agent. Exemple de tableau :

| Workflow | Statut au début de la phase | Statut après réussite |
|---|---|---|
| Think | **Think** | Reste **Think** jusqu’au démarrage de Plan |
| Plan | **Plan** | Reste **Plan** jusqu’au démarrage de Code |
| Code | **Code** | Reste **Code** jusqu’au démarrage de Prove, y compris pendant une revue humaine |
| Prove | **Prove** (ou **Release** sur un tableau combiné) | Enregistre la validation ; **Done** uniquement lorsque les critères de fin convenus sont satisfaits |

Utilisez un indicateur séparé pour les pauses de revue ; aucune colonne dédiée n’est nécessaire. Autorisez l’automatisation à mettre à jour les tickets et publier les résultats.

**Done signifie terminé.** Précisez s’il veut dire fusionné, publié ou entièrement déployé. Un échec peut garder son statut de phase ; signalez-le séparément pour ne pas le confondre avec une exécution active.

::: warning Limites entre fusion et livraison
Fusionnez seulement après réussite des contrôles et de l’évaluation indépendante de Prove. Escaladez les échecs non résolus ; n’affaiblissez jamais les contrôles. Publication et déploiement peuvent être séparés : réussir Prove ne signifie pas être en production.
:::

### Une seule plateforme Git

Standardisation sur l’**écosystème Git** afin d’éliminer l’éparpillement des outils (*tool sprawl*) et de préserver un graphe de contexte ininterrompu pour les agents IA, comme détaillé dans **[Outillage](./tooling)**.
