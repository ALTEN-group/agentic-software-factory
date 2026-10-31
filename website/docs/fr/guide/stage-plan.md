---
pageClass: page-stage-indigo
---

# 📋 3 — Plan

<div class="stage-hero-banner banner-indigo">
  <span class="stage-hero-badge">ÉTAPE 3</span>
  <span class="stage-hero-desc">Découpage d’implémentation, périmètre de fichiers &amp; limites</span>
</div>

Plan transforme l’approche choisie en petites étapes ordonnées. Chacune liste les fichiers, l’action, le code, la commande de vérification et le contrôle de démarrage.

Un bon plan répond à trois questions avant qu’une seule ligne de code ne soit écrite :

1. **Où** les agents sont-ils autorisés à intervenir, et où leur est-il interdit de toucher ?
2. **Dans quel ordre** les étapes doivent-elles s’exécuter ? Chaque étape est-elle suffisamment petite pour être vérifiée individuellement ?
3. **Comment prouver** que chaque étape, ainsi que le changement dans son ensemble, est correcte ?

## Objectif

| Entrée | Sortie | Responsable |
|---|---|---|
| Le dossier Think validé issu de [2 — Think](./stage-think) | Un plan comprenant le périmètre de fichiers, les critères d’acceptation, une liste d’implémentation ordonnée, le code à implémenter et un plan de test | Architecte + Développeur |

## Le dossier Plan

Le dossier Plan (`plan.md`) est commité avec l’élément de travail aux côtés du ticket de backlog et du dossier Think.

| Section | Description |
|---|---|
| **Périmètre de fichiers & limites** | Les fichiers et zones que les agents peuvent modifier, et ceux auxquels ils ne doivent pas toucher |
| **Prérequis** | Dépendances, variables d’environnement ou services nécessaires avant l’Étape 1 |
| **Critères d’acceptation** | 3 à 8 énoncés observables qui sont soit vrais soit faux, rédigés de sorte qu’un test puisse les vérifier |
| **Checklist d’implémentation** | Étapes atomiques ordonnées, chacune avec ses fichiers, son action, son nouveau code, sa commande de vérification, sa vérification de démarrage et le critère auquel elle répond |
| **Plan de test** | Pour chaque critère d’acceptation, quel test le prouve et à quelle étape il est créé |
| **Questions ouvertes & hypothèses** | Tout point resté en suspens ou supposé au niveau de l’implémentation. Les questions ouvertes sont tranchées avant le démarrage de Code |

Incluez les mises à jour du contexte identifiées dans Think comme étapes. Ajoutez une étape inverse pour ce qu’un revert ne peut pas annuler, comme une migration de données. Le rollback Élevé/Critique est nommé dans [Think](./stage-think#the-think-record).

### Critères d’acceptation

Les critères sont rédigés de manière à ce qu’un test puisse les vérifier sans part d’interprétation :

```text
- Étant donné une requête non authentifiée vers GET /api/v1/orders, alors la réponse est 401 avec un corps vide.
- Étant donné un utilisateur ayant le rôle viewer, lorsqu’il envoie POST /api/v1/orders, alors la réponse est 403.
- Étant donné une commande valide pour un produit connu, lors d’un POST /api/v1/orders, alors la réponse est 201 et exactement un événement order.created est publié.
- Étant donné une commande pour un produit inconnu, lors d’un POST /api/v1/orders, alors la réponse est 400 et aucune ligne n’est écrite en base.
```

### La checklist d’implémentation

Chaque étape représente un petit changement vérifiable indépendamment. Une étape comporte :

| Champ | Signification |
|---|---|
| **Fichiers** | Les fichiers exacts à créer ou modifier. Aucun fichier en dehors du périmètre autorisé |
| **Action** | Ce que fait l’étape, en une ligne |
| **Nouveau code** | Le code à implémenter pour cette étape, préparé par l’IA |
| **Vérification** | Une commande ciblée qui prouve cette étape, par exemple l’exécution d’un seul fichier de test |
| **Vérification de démarrage** | Une commande qui prouve que l’application complète démarre et fonctionne toujours après l’étape |
| **Sert** | Le critère d’acceptation que cette étape contribue à satisfaire |

Une étape est bien formée lorsque :

- elle fait **une seule chose**, et est suffisamment petite pour qu’un agent la termine en quelques boucles de correction (voir le nombre de boucles de correction dans [Métriques](./metrics)),
- elle **ne dépend que des étapes précédentes**, afin que l’ordre d’exécution compile toujours,
- elle laisse l’application **démarrable (*bootable*)**, jamais à moitié cassée,
- elle peut être **vérifiée par une commande**, et non par une opinion,
- chaque fichier du périmètre apparaît dans au moins une étape, et **aucune étape ne touche un fichier hors périmètre**.

## Où l’IA intervient

L’IA produit, recoupe et approuve automatiquement le plan. Le Développeur et l’Architecte interviennent uniquement si un contrôle en échec ou une ambiguïté non résolue empêche de continuer.

| Tâche | Responsabilité autonome de l’IA | Gestion humaine des exceptions |
|---|---|---|
| **Périmètre de fichiers & prérequis** | Définir et valider les frontières et dépendances depuis Think | Résoudre un conflit de périmètre |
| **Critères d’acceptation** | Déduire des critères observables et vérifier leur traçabilité | Résoudre une ambiguïté bloquante |
| **Checklist d’implémentation** | Générer et valider des étapes atomiques ordonnées | Traiter un échec de validation non résolu |
| **Vérification par étape & plan de test** | Relier chaque critère à des contrôles et tests exécutables | Corriger une lacune de politique de contrôle |
| **Questions ouvertes & hypothèses** | Résoudre depuis les preuves disponibles et expliciter les hypothèses | Fournir l’intention manquante si la validation est bloquée |
| **Validation de la structure du plan** | Exécuter les contrôles et consigner l’approbation automatisée | Intervenir après un échec non résolu |

## Agents et skills {#primitives-dans-le-contexte-persistant}

Plan s’appuie sur les primitives du Contexte persistant issues de [coding-pal](https://alten-group.github.io/coding-pal/) :

- Un agent **Planner** convertit le dossier Think en étapes atomiques, établit des frontières de fichiers explicites et rédige `plan.md`.
- Une instruction **plan** impose des étapes atomiques, des tests associés, des extraits de code et le respect du périmètre de Think.
- Le skill **think-plan** vérifie le périmètre, la couverture des étapes, les tests d’acceptation et la cohérence du risque avec Think.
- Le **dossier Think** (`think.md`) constitue l’entrée immédiate du Contexte persistant qui encadre le plan.

Voir le [guide Think & Plan de coding-pal](https://alten-group.github.io/coding-pal/guide/domain-think-plan).

## Pipeline de livraison

Le pipeline Plan transforme la spécification en plan d’implémentation, selon les [déclencheurs et points de revue communs](./platform-rails#declencheurs-points-de-revue-et-statuts) :

1. Restaure la spécification Think validée.
2. Positionne le statut **Plan** avant de lancer l’agent.
3. Définit les étapes, fichiers, tests et documents.
4. Valide le plan par rapport à Think.
5. Lie le plan versionné au ticket.
6. Consigne l’approbation automatisée et passe à [Code](./stage-code#pipeline-de-livraison), sauf si une revue est demandée.

**Point d’arrêt :** revue demandée, validation en échec ou passage à Code. Le statut reste **Plan** jusqu’au démarrage de Code. Signalez les échecs non résolus à un développeur ; le travail indépendant peut continuer.

## Jalon de sortie

Un élément de travail quitte Plan et entre dans [4 — Code](./stage-code) uniquement lorsque :

1. chaque fichier du périmètre a une étape ; aucune étape ne touche un fichier hors périmètre,
2. chaque critère est observable et couvert par une étape et un test,
3. chaque étape ordonnée liste ses fichiers, son action, son nouveau code, sa commande de vérification et sa vérification de démarrage,
4. les questions ouvertes ont trouvé réponse et les hypothèses sont consignées,
5. tout changement qu’un revert ne peut pas annuler possède sa propre étape inverse,
6. le niveau de risque et les contrôles requis correspondent au périmètre final,
7. le plan passe la validation déterministe et son approbation automatisée est consignée.
