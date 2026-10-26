# 📊 Métriques

L’Agentic Software Factory est pilotée par un ensemble volontairement restreint de métriques. Tout ce qui est mesuré l’est parce qu’une décision en dépend.

<MetricChart
  title="Délai de mise en œuvre de la réunion à la production (médiane par semaine)"
  unit="heures"
  :labels="['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8']"
  :values="[120, 96, 78, 64, 55, 46, 40, 34]"
  :target="48"
  target-label="cible 48"
/>

C’est le chiffre sur lequel l’ensemble du modèle est jugé : le temps nécessaire pour qu’un besoin exprimé par le client atteigne la production.

## Métriques de flux (*Flow metrics*)

Les métriques fondamentales de livraison, mesurées par squad sur des fenêtres glissantes de quatre semaines :

| Métrique | Définition | Direction | Cible |
|---|---|---|---|
| **Délai de la réunion à la production (*Lead Time*)** | Transcription de la réunion client → exécution en production | À la baisse | < 24 à 48 heures pour les changements standards |
| **Fréquence de déploiement** | Déploiements en production par semaine | À la hausse | Plusieurs déploiements par jour |
| **Taux d’échec des changements** | Déploiements entraînant un rollback, la coupure d’un flag ou un incident | À la baisse | < 1 % |
| **Temps de rétablissement (*Time to restore*)** | Détection d’un défaut en production → atténuation | À la baisse | < 15 minutes |

## Métriques par cas d’usage

Les métriques de flux montrent la performance globale de la chaîne. Pour améliorer une tâche IA précise, il faut mesurer cette tâche isolément. Un **cas d’usage** est une tâche assistée par l’IA au sein d’une étape, comme la création de tests automatisés ou la mise à jour de la documentation. Pour chaque cas d’usage, mesurez les mêmes indicateurs clés par élément de travail :

| Mesure | Question à laquelle elle répond |
|---|---|
| **Temps passé** | Combien de temps prend cette sous-tâche pour un élément de travail ? |
| **Itérations** | Combien de tentatives faut-il pour obtenir un résultat correct ? |
| **Coût** | Combien dépense le modèle pour un élément de travail ? |
| **Intervention humaine** | À quelle fréquence une personne doit-elle intervenir ? |
| **Succès au premier passage** | À quelle fréquence le résultat est-il bon dès la première tentative ? |

Les durées proviennent directement des horodatages que le pipeline enregistre déjà (ticket, branche, pull request, exécution CI), de sorte que personne ne chronomètre quoi que ce soit à la main. Les exemples ci-dessous illustrent l’évolution d’un cas d’usage sain dans le temps.

### Création de tests automatisés (Code)

Les tests sont générés en même temps que le code. La première question est de savoir où passe le temps dans un élément de travail. La seconde est de vérifier si la sous-tâche de création de tests s’accélère à mesure que l’équipe améliore son contexte et ses compétences.

<MetricChart
  type="bar"
  title="Répartition du temps sur un élément de travail"
  unit="minutes"
  :labels="['Générer le code', 'Créer les tests', 'Boucle de correction', 'Documentation']"
  :values="[18, 22, 9, 4]"
/>

La création de tests représente ici la part la plus importante ; il est donc pertinent de la suivre séparément.

<MetricChart
  title="Temps passé à créer les tests, par élément de travail (médiane par semaine)"
  unit="minutes"
  :labels="['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8']"
  :values="[42, 38, 35, 33, 29, 27, 24, 22]"
  :target="30"
  target-label="cible 30"
/>

Une courbe descendante indique que le contexte et les compétences d’écriture de tests s’améliorent. Une courbe plate signale généralement une compétence ou une instruction de test manquante. Une courbe ascendante traduit le plus souvent des critères d’acceptation trop vagues dans le dossier Plan.

### Boucles de correction (Code)

<MetricChart
  type="bar"
  title="Nombre moyen de boucles de correction par élément de travail"
  unit="boucles"
  :labels="['S1', 'S2', 'S3', 'S4', 'S5', 'S6']"
  :values="[4.2, 3.8, 3.5, 3.1, 2.9, 2.6]"
  :target="3"
  target-label="alerte 3"
/>

Au-delà de 3 boucles, l’élément de travail était probablement trop volumineux ou trop vague lorsqu’il a quitté l’étape Plan.

### Création des tickets de backlog (Triage)

<MetricChart
  title="Heures entre la fin d'une réunion et un ticket de backlog classé"
  unit="heures"
  :labels="['S1', 'S2', 'S3', 'S4', 'S5', 'S6']"
  :values="[20, 16, 12, 9, 7, 6]"
  :target="8"
  target-label="cible 8"
/>

Cet indicateur mesure la rapidité avec laquelle une conversation client est transformée en travail enregistré et priorisé.

### Contrôles déterministes dès le premier passage (Prove)

<MetricChart
  title="Pull requests passant tous les contrôles dès la première exécution CI"
  unit="%"
  :labels="['S1', 'S2', 'S3', 'S4', 'S5', 'S6']"
  :values="[62, 66, 71, 75, 79, 83]"
  :target="80"
  target-label="cible 80 %"
  :lower-is-better="false"
/>

Un taux faible révèle des vérifications automatisées insuffisantes dans l’étape Code ou un contexte manquant.

### Temps de rétablissement (Learn)

<MetricChart
  title="Minutes entre la détection d'un défaut et son atténuation"
  unit="minutes"
  :labels="['S1', 'S2', 'S3', 'S4', 'S5', 'S6']"
  :values="[38, 31, 26, 19, 14, 12]"
  :target="15"
  target-label="cible 15"
/>

Les mêmes cibles que celles des métriques de flux s’appliquent. La vue par cas d’usage permet d’identifier quelle partie du travail progresse.

## Métriques d’autonomie et de levier IA

| Métrique | Définition | Signal de vigilance |
|---|---|---|
| **Part de code généré par l’IA** | Pourcentage du code, des tests et de la doc écrits par l’IA | Cible **100 %** (zéro frappe manuelle de syntaxe) |
| **Taux de succès au premier passage dans Code** | Éléments de travail dont les vérifications et tests automatisés sont au vert dès le premier essai | < 80 % indique une dérive du Contexte persistant ou des instructions manquantes |
| **Taux de réussite des contrôles déterministes** | Pull requests passant tous les contrôles déterministes dès la première exécution CI dans Prove | < 80 % indique des vérifications automatisées trop faibles ou un contexte incomplet |
| **Nombre de boucles de correction** | Boucles d’auto-correction nécessaires avant d’obtenir un passage au vert | > 3 boucles indique un mauvais découpage des tâches lors de l’étape Plan |
| **Taux d’acceptation** | Artefacts générés fusionnés sans reprise substantielle | Une baisse indique une dérive du Contexte persistant |
| **Taux de reprise (*Rework rate*)** | Production acceptée mais corrigée dans les 14 jours | Une hausse indique une validation trop superficielle |
| **Taux de retouche humaine** | Pull requests où un humain a modifié manuellement la syntaxe du code | Doit tendre vers **0 %** ; les correctifs appartiennent au contexte, pas au code |
| **Délai de validation humaine minimale** | Temps écoulé entre le passage au vert de tous les contrôles et l’approbation humaine | Une hausse indique que les relecteurs retombent dans la relecture manuelle ligne par ligne |
| **Part assistée par étape** | Part des livrables de chaque étape produite avec l’IA | Usage concentré uniquement dans l’étape 4 — Code |
| **Taux de pertinence du contexte (*Context hit rate*)** | Sessions pour lesquelles le Contexte persistant commité a suffi | Une baisse signale des artefacts manquants ou obsolètes |
| **Coût par changement fusionné** | Dépense en modèles / changements fusionnés | Pics de coût sans réduction correspondante du *lead time* |

## Métriques de résultat (*Outcome metrics*)

| Métrique | Définition |
|---|---|
| **Taux de validation des hypothèses** | Hypothèses validées / total des hypothèses clôturées |
| **Taux de suppression des fonctionnalités** | Fonctionnalités invalidées supprimées en moins d’un cycle |
| **Délai avant première preuve (*Time to evidence*)** | Création du ticket de backlog → premier signal réel d’utilisation |

Un taux de validation proche de 100 % est un signal d’alerte, et non un succès. Il signifie généralement que l’équipe ne teste que des paris dont elle est déjà certaine, et qu’elle apprend donc peu. Un taux sain laisse de la place à l’échec : certaines hypothèses doivent être invalidées, et les fonctionnalités correspondantes supprimées.

## Métriques de qualité

| Métrique | Définition |
|---|---|
| **Taux de défauts échappés** | Défauts découverts en production / total des défauts découverts |
| **Couverture sur les lignes modifiées** | Par pull request, sans régression |
| **Profondeur moyenne de revue sur les changements à haut risque** | Temps passé en revue, pondéré par le rayon d’impact |

## Ce qui n’est délibérément pas mesuré

| Non mesuré | Pourquoi |
|---|---|
| Lignes de code | L’IA rend cette mesure absurde et contre-productive |
| Vélocité en *story points* | Mesure l’estimation, pas la valeur produite |
| Taux d’acceptation des suggestions d’autocomplétion dans l’éditeur | Ne présente aucune corrélation avec ce qui compte réellement |

## Revue

La squad examine la valeur des métriques chaque mois, lors de la rétrospective du modèle opérationnel. Cette même session passe en revue la liste des métriques elle-même : toute métrique qui n’a éclairé aucune décision depuis deux trimestres est supprimée.
