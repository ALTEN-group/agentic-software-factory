# ⚖️ Gouvernance

Les agents décident et exécutent selon des règles consignées. Des personnes nommées sont responsables de ces règles, budgets et résultats.

## Qui décide

### Règle par défaut

**Tous les changements peuvent être autonomes**, y compris les API publiques, schémas, changements de sécurité et niveaux Élevé et Critique. Les personnes interviennent sur les échecs non résolus ou les tentatives épuisées. Les pauses de revue sont facultatives et doivent être demandées.

Les responsables ci-dessous sont **garants des règles, pas approbateurs obligatoires**. Les décisions automatisées consignent l’agent, la date, les options, les preuves et les conséquences, sans prétendre à une signature humaine.

### Tableau de décision

| Décision | Responsable | Consulté en cas d’exception | Enregistré sous forme de |
|---|---|---|---|
| Quoi construire ensuite dans le cadre du résultat convenu | Product Owner | Squad, clients | Ligne de *scorecard* |
| Lancer ou non une expérimentation | Product Owner | Architecte | Entrée dans le registre des hypothèses |
| Approche d’implémentation dans le code de la squad | Développeur | Architecte | Pull request |
| Modification d’un contrat public ou d’une frontière inter-services | Architecte | Squads propriétaires | Relevé de décision |
| Modification du modèle de données affectant d’autres squads | Architecte | Squads impactées | Relevé de décision + plan de migration |
| Changement sensible pour la sécurité (authentification, données personnelles/PII, facturation) | Architecte | Développeur, squad | Dossier de revue sur la pull request |
| Ajout d’un nouveau runtime, d’une base de données ou d’un fournisseur | Architecte | DevOps | Relevé de décision |
| Politique d’usage de l’IA et accès aux modèles | Architecte | Juridique | Version de la politique |
| Adoption d’un nouveau modèle, agent ou standard de prompt | Architecte | Squads | Rapport d’évaluation |
| Mise en service d’un engagement visible par le client | Product Owner | Architecte | Changelog |
| Rollback pendant un incident | DevOps ou QA et mainteneur | Aucun — agir d’abord | Dossier d’incident |
| Suppression d’une fonctionnalité invalidée | Product Owner | Squad | Verdict du registre des hypothèses |

### Escalade

N’escaladez qu’en cas de : conflit inter-squads, exposition de sécurité, obligation de conformité, engagement externe ou impact budgétaire. Une escalade énonce la décision à prendre, les options, la recommandation et la date à laquelle le silence vaut adoption de la recommandation.

### Rayon d’impact et validation automatisée requise {#blast-radius-and-required-human-validation}

Le rayon d’impact décrit la portée et la réversibilité d’un changement. [Think](./stage-think) fixe le niveau ; [Plan](./stage-plan) le vérifie. Il détermine les preuves requises dans [Prove](./stage-prove), pas qui doit signer.

| Rayon d’impact | Critères | Validation automatisée requise |
|---|---|---|
| **Faible (*Low*)** | Refactoring interne, schéma non cassant, modification de texte | Contrôles au vert et évaluation indépendante de l’intention, du comportement et de la sécurité |
| **Moyen (*Medium*)** | API publique, ajout au schéma, intégration externe | Preuves du niveau Faible et contrôles de contrat et d’intégration adaptés |
| **Élevé (*High*)** | Authentification, permissions, facturation, PII, migration | Contrôles des frontières d’accès et de sécurité, avec preuves de rollback vérifié |
| **Critique (*Critical*)** | Migration irréversible, contrat public cassant, infrastructure | Preuves du niveau Élevé, relevé de décision, contrôles de continuité et déploiement progressif validé |

### Interdiction de la revue de code ligne par ligne

**La revue manuelle ligne par ligne n’est pas un jalon autorisé.** Utilisez les vérifications et [contrôles automatisés](./deterministic-controls). [Prove](./stage-prove#minimum-human-validation) évalue indépendamment l’intention, le comportement et la sécurité. La revue humaine est facultative ou traite les exceptions.

## Responsabilité (*Accountability*)

L’IA exécute le processus avec validation et auto-remédiation. **La responsabilité finale incombe toujours à une personne nommée**, sans exiger d’approbation manuelle de chaque exécution. Les responsables restent garants :

- des objectifs et politiques d’acceptation automatique des changements,
- tout engagement envers le client et le choix du problème à résoudre,
- des contrôles et preuves de validation de l’intention métier et des invariants de sécurité,
- des frontières de sécurité, de conformité et d’architecture, y compris les décisions automatisées Élevées/Critiques,
- toute modification des modèles, prompts ou agents ayant un impact sur la confiance ou la conformité,
- la résolution de tout incident et les actions post-mortem associées.

## Outillage

Seuls les outils figurant sur la liste homologuée peuvent être utilisés avec les données de l’entreprise ou des clients. L’homologation exige : un hébergement dédié entreprise (*enterprise tenancy*), aucun entraînement sur les données soumises, une journalisation d’audit, l’authentification unique (SSO) et un accord de traitement des données (DPA) signé.

## Auditabilité

| Élément | Durée de conservation | Emplacement |
|---|---|---|
| Actions des agents sur les dépôts et l’infrastructure | 12 mois | Journal d’audit de la plateforme |
| Versions des modèles, prompts et agents utilisées en CI | 12 mois | Métadonnées de build |
| Rapports d’évaluation des changements adoptés | Indéfiniment | Dépôt Git |
| Coût par squad et par workflow | 24 mois | Tableau de bord des coûts |

## Coût

Les dépenses liées aux modèles sont imputées par squad et passées en revue chaque semaine. Tout workflow dont le coût dépasse la valeur créée est repensé ou retiré — modèles plus économiques, contexte plus ciblé, ou suppression de l’IA lorsque celle-ci n’est pas pertinente.

## Violations

Toute violation de politique est traitée comme un incident. Une politique qui ne peut être respectée que par la seule vigilance humaine constitue un défaut des [Contrôles déterministes](./deterministic-controls).
