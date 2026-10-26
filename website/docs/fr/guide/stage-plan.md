---
pageClass: page-stage-indigo
---

# 📋 3 — Plan

<div class="stage-hero-banner banner-indigo">
  <span class="stage-hero-badge">ÉTAPE 3</span>
  <span class="stage-hero-desc">Découpage d’implémentation, périmètre de fichiers &amp; limites</span>
</div>

Là où l’approche retenue devient une liste de contrôle d’implémentation ordonnée pour les agents de codage. Chaque étape nomme les fichiers à modifier, l’action à réaliser, le nouveau code à implémenter, une vérification ciblée et une vérification de démarrage (*bootable check*).

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

Les modifications du Contexte persistant identifiées dans Think, telles qu’une nouvelle instruction ou un nouveau skill, figurent comme des étapes de la checklist au même titre que le reste du travail.
Un plan ne comporte généralement pas de section de rollback dédiée, car un simple `git revert` suffit le plus souvent à annuler un changement. Un changement qu’un revert ne peut pas annuler, comme une migration de données, dispose de sa propre étape inverse dans la checklist. Pour les changements à rayon d’impact Élevé et Critique, le mécanisme de rollback est nommé dans le [dossier Think](./stage-think#the-think-record).

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

L’IA transforme le dossier Think validé en plan, et le développeur le valide. L’architecte intervient en appui si nécessaire.

| Tâche | Rôle de l’IA | Rôle humain |
|---|---|---|
| **Périmètre de fichiers & prérequis** | Rédiger le périmètre de fichiers et les dépendances requises avant l’Étape 1, à partir du dossier Think et de la base de code | Confirmer les frontières de fichiers et les dépendances |
| **Critères d’acceptation** | Convertir l’exigence en énoncés observables (vrai ou faux) et signaler toute ambiguïté | Confirmer qu’ils correspondent bien à la demande du client |
| **Checklist d’implémentation** | Découper le périmètre en étapes atomiques ordonnées avec fichiers exacts, actions et nouveau code | Valider le périmètre, les frontières de fichiers et l’ordre des étapes |
| **Vérification par étape & plan de test** | Fournir une commande de vérification ciblée et une vérification de démarrage pour chaque étape, et relier les critères aux tests | Confirmer que les vérifications couvrent chaque critère d’acceptation |
| **Questions ouvertes & hypothèses** | Lister les questions ouvertes et les hypothèses au niveau de l’implémentation | Répondre aux questions et confirmer les hypothèses |
| **Validation de la structure du plan** | Vérifier que chaque section est présente, que chaque étape possède les champs requis et qu’aucun fichier ne déborde du périmètre | Relire et approuver le plan |

## Primitives dans le Contexte persistant

Plan s’appuie sur les primitives du Contexte persistant issues de [coding-pal](https://alten-group.github.io/coding-pal/) :

- Un agent **Planner** convertit le dossier Think en étapes atomiques, établit des frontières de fichiers explicites et rédige `plan.md`.
- Une instruction **plan** impose la discipline d’implémentation : étapes atomiques à responsabilité unique, correspondance avec le plan de test, extraits de code balisés et interdiction stricte d’élargir le périmètre au-delà de Think.
- Le skill **think-plan** valide de manière déterministe le dossier Plan par rapport au dossier Think : chaque fichier du périmètre est couvert par une étape, aucune étape ne touche de fichier hors périmètre, tous les critères d’acceptation sont prouvés dans le plan de test et le niveau de rayon d’impact reste cohérent.
- Le **dossier Think** (`think.md`) constitue l’entrée immédiate du Contexte persistant qui encadre le plan.

Voir le [guide Think & Plan de coding-pal](https://alten-group.github.io/coding-pal/guide/domain-think-plan).

## Jalon de sortie

Un élément de travail quitte Plan et entre dans [4 — Code](./stage-code) uniquement lorsque :

1. le périmètre de fichiers est défini, et chaque fichier du périmètre est couvert par une étape d’implémentation, sans aucun fichier hors périmètre ajouté,
2. chaque critère d’acceptation est observable, et chacun est couvert par une étape et un test,
3. chaque étape ordonnée liste ses fichiers, son action, son nouveau code, sa commande de vérification et sa vérification de démarrage,
4. les questions ouvertes ont trouvé réponse et les hypothèses sont consignées,
5. tout changement qu’un revert ne peut pas annuler possède sa propre étape inverse,
6. le niveau de rayon d’impact issu de Think reste valide pour le périmètre de fichiers. Si le plan touche davantage que ce que Think avait prévu (authentification, données ou contrat public), le niveau est relevé et la validation humaine requise évolue en conséquence,
7. le Développeur a relu et approuvé le plan.
