# 🧰 Outillage

Dans l’Agentic Software Factory, l’outillage ne peut pas être un assemblage de produits SaaS déconnectés. L’éparpillement des outils (*tool sprawl*) est la cause première de la **fragmentation du contexte de l’IA** : lorsque les exigences métier résident dans Jira, les comptes rendus de réunion dans Confluence, les discussions dans Slack, le code dans Git, les pipelines dans Jenkins et les mises en production dans un portail externe, le contexte de l’agent IA est brisé par des silos d’authentification, des délais de synchronisation et des API incompatibles.

> **Pour maximiser la capacité de l’IA, minimisez l’éparpillement des outils.** Consolidez l’intégralité du cycle de vie sur une **seule plateforme**, telle que l’**écosystème GitHub ou GitLab**, où les besoins métier, les tickets de backlog, le code, la vérification déterministe, les pipelines et les releases partagent un seul et même graphe de contexte ininterrompu.

## Pourquoi une plateforme unique est essentielle pour l’IA

1. **Zéro perte de contexte de la réunion à la mise en production** : un agent IA peut lire les notes de la réunion client initiale dans un ticket, suivre les critères d’acceptation du Plan, inspecter le Contexte persistant du dépôt, générer le code dans une pull request, lire les journaux d’échec de la CI et publier la release sans jamais quitter la plateforme.
2. **Liens bidirectionnels natifs** : chaque PR est nativement liée à son ticket (*Issue*), sa branche, son commit, son exécution de vérification (*check run*), son environnement de prévisualisation et son tag de release. Aucune intégration tierce ni synchronisation fragile par webhook n’est requise.
3. **Frontière unifiée de permissions et de sécurité** : le modèle, l’exécuteur d’agent et le pipeline CI opèrent sous un seul contrôle d’accès basé sur les rôles (RBAC) et un journal d’audit unifié.
4. **Optimisation des tokens et de la latence** : les agents IA récupèrent un contexte riche et structuré via les API natives de la plateforme en quelques millisecondes au lieu d’interroger plusieurs API d’outils externes.

## La pile Git unifiée

L’Agentic Software Factory s’exécute de bout en bout sur une seule plateforme Git, telle que GitHub ou GitLab. Les tickets, branches, pull requests, pipelines, environnements et releases cohabitent au même endroit, de sorte que l’agent IA suit une chaîne ininterrompue depuis la réunion client jusqu’à la mise en production sans quitter la plateforme.

## Éliminer l’éparpillement des outils

Chaque outil externe introduit dans l’usine logicielle impose une **pénalité de contexte** :
- Si un outil ne s’intègre pas nativement dans le graphe de contexte de l’agent, il crée un trou noir informationnel.
- Toute proposition d’adopter un outil SaaS externe en dehors de la plateforme centrale nécessite un relevé de décision (*decision record*) prouvant que le besoin ne peut être couvert nativement et détaillant comment le contexte de l’IA sera préservé sans aucune perte.
