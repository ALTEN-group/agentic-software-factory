---
pageClass: page-stage-yellow
---

# 🎯 1 — Triage

<div class="stage-hero-banner banner-yellow">
  <span class="stage-hero-badge">ÉTAPE 1</span>
  <span class="stage-hero-desc">Besoins candidats qualifiés en exigences, évalués &amp; priorisés dans le backlog</span>
</div>

Là où la demande capturée devient le **backlog d’exigences**. Triage transforme les besoins candidats issus de [0 — Meet](./stage-meet) et d’autres sources en exigences métier qualifiées, enrichies du contexte système et de preuves tangibles. L’IA les évalue, et le Product Owner valide et priorise les tickets de backlog qui en résultent.

## Objectif

| Entrée | Sortie | Responsable |
|---|---|---|
| Besoins candidats et preuves issus de [0 — Meet](./stage-meet) et d’autres sources de demande + **Contexte persistant** (glossaire du domaine, spécifications existantes, périmètre produit) | Un backlog d’exigences priorisé : tickets de backlog liés aux preuves avec exigences métier qualifiées, cartographie système, estimation précoce du risque et grille d’évaluation (*scorecard*) complétée | Product Owner |

## De la preuve au ticket de backlog

Triage fait le pont entre le dialogue client brut issu de [0 — Meet](./stage-meet) et les critères d’acceptation exécutables de [3 — Plan](./stage-plan). Cette étape évalue chaque besoin candidat au regard du périmètre produit et de l’architecture actuels afin que seules des exigences fondées et bien cadrées entrent dans le backlog. L’IA utilise le Contexte persistant et les informations du dépôt pour :

1. **Qualifier et cartographier l’exigence** par rapport aux capacités existantes, aux spécifications, aux concepts du domaine et aux frontières d’architecture.
2. **Estimer l’impact** en identifiant les systèmes touchés, le risque précoce et les inconnues. Le niveau de rayon d’impact (*blast radius*) est fixé plus tard, lors de l’étape [2 — Think](./stage-think).
3. **Rédiger le ticket de backlog** dans un format standardisé, formuler clairement l’exigence métier, la relier à sa preuve source et pré-remplir les champs de la grille d’évaluation (*scorecard*). Le Product Owner peut réviser les scores et détermine la priorité.

## Le ticket de backlog

Chaque besoin métier retenu à l’issue de l’analyse devient une **exigence métier** qualifiée, enregistrée sous la forme d’un **ticket de backlog** dans l’outil de suivi de la squad. L’ensemble de ces tickets forme le **backlog d’exigences** de la squad.
Le ticket exprime *ce qui* est requis et *pourquoi*, en s’appuyant sur des preuves verbatim ; l’étape [2 — Think](./stage-think) décide ensuite *comment* satisfaire l’exigence sur le plan architectural, et [3 — Plan](./stage-plan) la traduit en critères d’acceptation testables.

| Champ | Contenu |
|---|---|
| **Titre** | L’exigence métier en une phrase, avec les mots du client autant que possible |
| **Énoncé du problème** | Qui est bloqué, ce que cela lui coûte et l’exigence à satisfaire |
| **Preuve** | Un lien vers la citation horodatée de la transcription ou toute autre source qui le justifie |
| **Hypothèse / métrique d’impact** | Lorsque c’est pertinent, un résultat mesurable attendu et la métrique que le Product Owner s’engage à suivre |
| **Grille d’évaluation (Scorecard)** | Les cinq scores détaillés ci-dessous |
| **Label de décision** | `todo`, `explore`, `later` ou `no` |
| **Source** | La réunion, le ticket ou le signal dont il provient |

Les tickets sont classés selon la grille d’évaluation, et le backlog d’exigences ainsi ordonné alimente la revue hebdomadaire.

### D’où viennent les tickets de backlog {#where-backlog-issues-come-from}

Les réunions clients constituent la source principale. Trois autres sources alimentent également le backlog, comme illustré dans le [diagramme du modèle opérationnel](./overview) :

- **L’audit hebdomadaire.** Une tâche planifiée dans la CI audite la base de code et ouvre un ticket de backlog pour chaque constat.
- **Learn.** La supervision et les incidents en production ouvrent des tickets pour les anomalies, les tendances défavorables et les fonctionnalités invalidées. Voir [7 — Learn](./stage-learn).
- **Les tickets de support et notes de terrain.** L’IA regroupe les tickets de support et les retours commerciaux ou terrain en besoins candidats, via la tâche de « Regroupement des retours » ci-dessous.

Quelle que soit son origine, un ticket utilise le même format et la même grille d’évaluation.

## Où l’IA intervient

L’IA qualifie, enrichit et évalue les exigences candidates ; les humains valident l’alignement client et fixent la priorité stratégique.

| Tâche | Rôle de l’IA | Rôle humain |
|---|---|---|
| Qualification et enrichissement de l’exigence | Transformer les besoins candidats en exigences métier reliées aux systèmes existants, aux spécifications et aux concepts du domaine ; estimer le risque initial | Valider le périmètre de l’exigence, l’alignement client et la responsabilité de la squad |
| Regroupement des retours | Regrouper les tickets et notes de terrain en thèmes avec nombre d’occurrences | Nommer le thème stratégique, écarter le bruit non pertinent |
| Rédaction du ticket de backlog | Rédiger des tickets d’exigence concis et liés aux preuves à partir des besoins candidats et autres signaux | Confirmer que l’exigence est actionnable et relève bien de la squad |
| Formulation d’hypothèses | Proposer des hypothèses mesurables et des métriques de résultat métier | S’engager sur la métrique métier à suivre |
| Estimation de complexité et de risque | Analyser le code et le Contexte persistant, signaler les risques précoces et les inconnues | Valider les frontières de risque architectural |
| Pré-remplissage de la grille | Pré-remplir la valeur client, l’effort estimé, le risque et le niveau de confiance | Fixer les pondérations stratégiques et départager les ex æquo |

L’IA ne décide jamais quel problème client compte le plus.

## Primitives dans le Contexte persistant

Triage s’appuie sur les primitives publiées par [coding-pal](https://alten-group.github.io/coding-pal/) :

- Un agent **Triage Analyst** enrichit un besoin candidat par session et rédige un fichier `triage.md` : le ticket de backlog, sa preuve, la cartographie système, la grille d’évaluation et une décision *proposée*.
- Une instruction **triage** garantit que les preuves restent verbatim et que les scores restent volontairement macroscopiques.
- Un skill **triage** valide le dossier de manière déterministe : preuves réelles, citations verbatim, règle d’exploration (*explore*), et décision finale que seul le Product Owner peut fixer.
- Un **registre de triage (triage ledger)** conserve les besoins arbitrés, y compris chaque `no` avec sa justification, afin qu’un même besoin ne soit pas débattu à nouveau par erreur.
- Un **script de classement** ordonne les grilles d’évaluation selon les pondérations stratégiques détenues par le Product Owner, en vue de la revue hebdomadaire.

Voir le [guide Triage de coding-pal](https://alten-group.github.io/coding-pal/guide/domain-triage).

## La grille d’évaluation (Scorecard)

Un instrument léger et délibérément macroscopique. Chercher une précision fine à ce stade serait une fausse précision.

| Champ | Échelle | Source |
|---|---|---|
| Valeur client | 1–5 | Preuves issues des réunions clients et des retours |
| Valeur métier | 1–5 | Product Owner |
| Effort | 1–5 | Analyse du code assistée par l’IA + développeur |
| Risque | 1–5 | Analyse architecturale + règles de sécurité. Une première estimation utile au classement. [2 — Think](./stage-think) définit ensuite le niveau de rayon d’impact |
| Confiance | Faible / Moyenne / Élevée | Caractère direct des citations clients et solidité des preuves |

Les éléments à forte valeur mais à faible confiance reçoivent la décision **explore** : recueillir des preuves supplémentaires pour réduire l’incertitude avant de décider de construire.

## Jalon de sortie

Une exigence quitte Triage lorsque son ticket de backlog possède :

1. un problème nommé et une exigence métier claire liés à un échange client précis ou à des données empiriques,
2. au moins une preuve non anecdotique (par exemple une citation de réunion client ou un groupe de tickets de support),
3. une ligne de grille d’évaluation complétée,
4. une décision explicite : *todo*, *explore*, *later* ou *no*.

Un `no` est consigné avec sa justification. Les exigences rejetées construisent la mémoire institutionnelle et guident les discussions futures avec les clients. La revue hebdomadaire qui parcourt le backlog d’exigences classé est décrite dans [Cadence](./cadence).
Seule une décision `todo`, fixée par le Product Owner, déclenche l’étape [2 — Think](./stage-think).
