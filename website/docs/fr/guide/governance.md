# ⚖️ Gouvernance

Qui décide, et ce que l’IA est autorisée à faire. La vitesse découle de la clarté des droits de décision ; l’Agentic Software Factory les rend donc explicites : les squads n’attendent jamais une autorisation dont elles n’avaient pas besoin, et ne prennent jamais une décision qui ne leur appartient pas. L’IA est traitée comme une capacité de production à part entière : dotée d’un responsable, versionnée, budgétée et auditée.

## Qui décide

### Règle par défaut

**La squad décide**, sauf si la décision figure dans le tableau ci-dessous.

### Tableau de décision

| Décision | Décidé par | Consulté | Enregistré sous forme de |
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

### Rayon d’impact et validation humaine requise {#blast-radius-and-required-human-validation}

Le poids d’une décision est déterminé par son rayon d’impact (*blast radius*) et par la difficulté à revenir en arrière. Le rayon d’impact est classifié une première fois lors de [2 — Think](./stage-think), puis vérifié à nouveau lors de [3 — Plan](./stage-plan) au regard du périmètre de fichiers. Il fixe ensuite le niveau de validation humaine exigé lors de [5 — Prove](./stage-prove).

| Rayon d’impact | Critères | Validation humaine requise |
|---|---|---|
| **Faible (*Low*)** | Refactoring interne, évolution de schéma non cassante, modification de texte couverte par des tests déterministes au vert | **Fusion automatique (*Auto-merge*)** dès que tous les contrôles sont au vert, ou validation développeur en un clic |
| **Moyen (*Medium*)** | Nouveau point de terminaison public, ajout au schéma, intégration avec un fournisseur externe | **Validation simple** : le développeur vérifie l’intention du client et l’environnement de prévisualisation |
| **Élevé (*High*)** | Authentification, permissions, facturation, traitement de données personnelles (PII), migration de données | **Double validation** : le développeur + l’architecte vérifient l’intention métier, les frontières d’accès et le mécanisme de rollback |
| **Critique (*Critical*)** | Migration de données irréversible, rupture d’un contrat public, changement d’infrastructure | **Approbation conjointe** : l’architecte + le Product Owner approuvent la continuité d’activité et un déploiement progressif |

### Interdiction de la revue de code ligne par ligne

**La revue manuelle de la syntaxe du code ligne par ligne est interdite en tant que jalon de validation.** Tout ce qui peut être évalué automatiquement est appliqué par les vérifications automatisées et les [Contrôles déterministes](./deterministic-controls). La revue humaine se limite strictement à la **Validation humaine minimale**, décrite dans [5 — Prove](./stage-prove#minimum-human-validation).

## Responsabilité (*Accountability*)

L’IA exécute le processus au maximum de ses capacités : transcription des réunions, extraction des besoins métier, génération de 100 % du code et validation déterministe avec auto-remédiation par les agents. **La responsabilité finale incombe toujours à une personne nommée**, en particulier pour :

- l’acceptation finale de tout changement fusionné,
- tout engagement envers le client et le choix du problème à résoudre,
- la validation de l’intention métier et des invariants de sécurité (**Validation humaine minimale**),
- tout changement sensible pour la sécurité, y compris l’approbation des frontières de sécurité, de conformité et d’architecture à fort rayon d’impact,
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
