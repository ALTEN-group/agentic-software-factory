# 🛤️ Rails de plateforme

Les fondations que les squads n’ont jamais à construire de zéro. Les Rails de plateforme fournissent tout ce qu’une squad reçoit dès le premier jour, afin qu’elle puisse se concentrer sur le résultat métier dont elle a la responsabilité.

## Objectif

Éliminer les tâches lourdes sans valeur différenciante pour les squads et faire du chemin sûr et autonome le chemin par défaut.

## Ce que fournissent les Rails de plateforme

### Forge, Contexte persistant et catalogue d’agents

Les rails distribuent [la Forge](./forge), le [Contexte persistant](./persistent-context) et les [Contrôles déterministes](./deterministic-controls) à chaque projet, afin que toutes les squads partent du même socle. L’Architecte est garant de leur contenu.

### Pipeline de livraison

Chaque dépôt reçoit le même squelette de vérification : des vérifications et contrôles automatisés dans la boucle de l’agent, puis à nouveau ces mêmes vérifications et contrôles dans la CI.

### Une seule plateforme Git

Standardisation sur l’**écosystème Git** afin d’éliminer l’éparpillement des outils (*tool sprawl*) et de préserver un graphe de contexte ininterrompu pour les agents IA, comme détaillé dans **[Outillage](./tooling)**.
