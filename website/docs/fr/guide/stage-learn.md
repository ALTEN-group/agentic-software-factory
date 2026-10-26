---
pageClass: page-stage-gray
---

# 📈 7 — Learn

<div class="stage-hero-banner banner-gray">
  <span class="stage-hero-badge">ÉTAPE 7</span>
  <span class="stage-hero-desc">Analyse de télémétrie et surveillance prédictive</span>
</div>

L’étape qui referme la boucle du modèle opérationnel. Elle observe les effets d’une mise en production, ouvre des tickets de backlog pour ce qu’elle détecte et réinjecte ses enseignements dans le Contexte persistant et les Contrôles déterministes.

## Objectif

| Entrée | Sortie | Responsable |
|---|---|---|
| Télémétrie de production, comportement des utilisateurs, incidents, coûts | Alertes précoces, hypothèses validées ou invalidées, nouveaux tickets de backlog, amélioration du Contexte persistant et des Contrôles déterministes | QA et mainteneur |

## Ce qui est observé

| Dimension | Exemples | Alimente |
|---|---|---|
| **Résultat métier (*Outcome*)** | La métrique de résultat engagée dans le ticket de backlog de [1 — Triage](./stage-triage) | Cela valait-il la peine d’être construit ? |
| **Santé du système** | Latence, taux d’erreur, saturation, disponibilité | Réponse aux incidents |
| **Flux (*Flow*)** | Délai de mise en œuvre (*lead time*), fréquence de déploiement, taux d’échec des changements, temps de rétablissement | [Métriques](./metrics) |
| **Levier IA** | Taux d’acceptation, taux de reprise (*rework*), coût par changement | Évaluation des modèles et des prompts |
| **Coût** | Dépenses d’infrastructure et d’utilisation des modèles par squad et par fonctionnalité | Priorisation |

## Surveillance prédictive

L’IA surveille la télémétrie de production en continu, et pas uniquement après un incident. Elle compare les signaux en direct aux lignes de base apprises ainsi qu’à la métrique de résultat engagée dans le ticket de backlog de [1 — Triage](./stage-triage), et signale les anomalies et tendances défavorables (dérive du taux d’erreur, approche de la saturation, glissement des coûts) avant que les clients ne s’en aperçoivent.

| Étape | Ce qui se passe | Qui décide |
|---|---|---|
| **Détecter** | L’IA signale une anomalie ou une tendance qui se dirige vers un seuil | L’IA propose |
| **Expliquer** | L’IA corrèle les journaux (*logs*), traces, déploiements et diffs récents pour identifier la cause probable | Le QA et mainteneur confirme |
| **Agir** | Atténuer tôt, ouvrir un ticket de backlog dans [1 — Triage](./stage-triage) afin de renforcer le contrôle qui aurait dû intercepter le problème | Le QA et mainteneur décide ; les seuils de rollback de [6 — Release](./stage-release) continuent de déclencher le rollback automatique |

Ce que la surveillance apprend peut être réinjecté dans le Contexte persistant, et les signaux manqués doivent devenir des Contrôles déterministes plus stricts.

## Le registre des hypothèses (*Hypothesis ledger*)

Chaque élément de travail ayant défini une métrique de résultat est examiné à l’issue de sa fenêtre d’observation.

| Verdict | Signification | Action suivante |
|---|---|---|
| **Validée** | La métrique a évolué comme prévu | Poursuivre l’investissement, retirer le *feature flag* |
| **Non concluante** | Aucun mouvement détectable | Décider : itérer une fois ou supprimer |
| **Invalidée** | La métrique n’a pas bougé ou a évolué dans le mauvais sens | Supprimer la fonctionnalité, documenter l’enseignement |

Les fonctionnalités invalidées sont **supprimées**. Conserver des fonctionnalités mortes constitue la forme de dette technique la plus coûteuse dans une base de code accélérée par l’IA, car chaque passe de génération future doit raisonner autour d’elles.

## Incidents

1. Détecter — alerte ou signalement client.
2. Atténuer — *feature flag*, rollback ou correctif en avant (*forward fix*). L’atténuation précède toujours le diagnostic.
3. Diagnostiquer — l’IA corrèle les journaux, traces, déploiements et diffs récents ; les humains concluent.
4. Réparer — ajouter un test qui reproduit le défaut, confirmer qu’il échoue, puis corriger le défaut et confirmer que le test passe ([Prove](./stage-prove)).
5. Apprendre — passer l’incident en revue dans un délai de cinq jours ouvrés.

## Durcissement des Contrôles déterministes

Pour chaque défaut, rollback ou quasi-incident (*near-miss*), on pose également la question : qu’est-ce qui a atteint la production alors qu’un contrôle aurait dû l’intercepter ?

- Une vérification manquait → ajouter un **garde** (*guard*), un **jalon** (*gate*), un **contrat** (*contract*) ou une **sonde** (*probe*).
- Un signal est arrivé trop tard → ajouter une **sonde** plus précoce.

## Primitives dans le Contexte persistant

L’étape Learn referme la boucle de rétroaction du développement en s’appuyant sur des primitives publiées par [coding-pal](https://alten-group.github.io/coding-pal/) :

### Primitives d’analyse et de gouvernance
- Un agent **Learn Analyst** traite les exports de télémétrie, corrèle l’historique des déploiements, évalue les métriques de résultat des hypothèses et prépare les revues d’incidents.
- Une instruction **learn** impose la discipline par la preuve : l’atténuation précède le diagnostic, les correctifs exigent d’abord un test en échec, les fonctionnalités invalidées sont supprimées et seuls les humains enregistrent les verdicts.

### Compétences de gestion des incidents et de télémétrie de production
- Une compétence **telemetry-scan** analyse les métriques temporelles pour identifier les anomalies précoces, les tendances de dégradation et les franchissements de seuils au regard des déploiements précédents.
- Une compétence **incident-record** formate et valide les dossiers `docs/incidents/` : elle garantit que les horodatages d’atténuation précèdent le diagnostic, lie les tests de reproduction en échec et planifie les revues rétrospectives.

### Compétences de suivi des hypothèses et d’entretien du contexte
- Une compétence **hypothesis-ledger** maintient `specs/learn/hypotheses.md`, en comparant les métriques de production observées aux cibles déclarées et en proposant des verdicts (Validée, Non concluante, Invalidée) soumis à la décision du Product Owner.
- Une compétence **context-health** audite les jeux d’instructions et analyse les journaux de corrections pour suggérer l’ajout ou l’élagage d’artefacts du Contexte persistant.

### Fermeture de la boucle
- Une compétence **learn-signals** traduit les constats de production, les éléments de durcissement des contrôles et les hypothèses invalidées en nouveaux tickets de backlog pour **[1 — Triage](./stage-triage)**, garantissant que l’usine apprend en continu.

Consultez le [guide Learn de coding-pal](https://alten-group.github.io/coding-pal/guide/domain-learn).

## Jalon de sortie

La boucle est bouclée lorsqu’une sortie de l’étape Learn est devenue un nouveau ticket de backlog dans [1 — Triage](./stage-triage).
