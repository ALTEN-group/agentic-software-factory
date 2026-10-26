# Vue d’ensemble

L’Agentic Software Factory est un **modèle opérationnel** pour les organisations logicielles modernes, qui aligne les personnes, les processus, les outils, les décisions et les responsabilités afin de livrer, maintenir et améliorer les produits en **exploitant l’IA au maximum de ses capacités sur l’ensemble du cycle de vie**, de la réunion client jusqu’à la mise en production.

- **Agentic** : des agents IA autonomes qui pilotent l’implémentation, les tests et la remédiation en boucles fermées.
- **Software Factory** : un système industrialisé et reproductible où le logiciel progresse de façon prévisible depuis l’intention client jusqu’à une mise en production vérifiée, à travers des jalons contrôlés.

## Diagramme du modèle opérationnel

<DeliveryFlowchart />

Le flux de travail s’écoule de haut en bas. Les blocs verts (Contexte persistant, Contrôles déterministes et la Forge) alimentent les étapes qu’ils soutiennent. Un audit hebdomadaire ainsi que l’étape Learn peuvent ouvrir de nouveaux tickets dans Triage, ce qui referme la boucle.

> **L’Agentic Software Factory est le modèle opérationnel moderne qui connecte le dialogue client, l’exécution autonome par l’IA, la vérification déterministe et la livraison continue au sein d’un seul et même système.**

## Les trois fondations

- **[Contexte persistant](./persistent-context)** : instructions, prompts, skills et agents versionnés dans le dépôt qui ancrent le comportement de l’IA.
- **[Forge](./forge)** : code réutilisable tel que des fonctions, des librairies et des services.
- **[Contrôles déterministes](./deterministic-controls)** : gardes (*guards*), jalons (*gates*), contrats (*contracts*) et sondes (*probes*) qui fournissent aux agents IA un retour déterministe, leur permettant de corriger itérativement le logiciel généré jusqu’à ce que toutes les vérifications requises passent au vert.

## Un changement, de bout en bout

Exemple illustratif de la manière dont un besoin client traverse les différentes étapes :

1. **Meet.** Lors d’un appel client, un directeur des opérations indique que ses responsables perdent 45 minutes chaque matin à réconcilier des exports. L’IA transcrit l’appel et le Product Owner clarifie les cas limites directement en séance avec le client.
2. **Triage.** L’IA qualifie l’exigence métier, cite le verbatim exact, l’évalue et l’enregistre dans le backlog d’exigences sous forme de ticket de backlog. Le Product Owner le classe en *todo*.
3. **Think.** Guidée par les contraintes et directives du Contexte persistant, l’IA propose deux options et sélectionne celle qui correspond le mieux tout en réutilisant un service de réconciliation de la Forge. Elle consigne sa justification, les systèmes impactés et les effets attendus.
4. **Plan.** L’IA transforme l’approche retenue en un Plan comprenant des critères d’acceptation, un découpage fichier par fichier et le code à implémenter. Le Développeur confirme qu’il reflète bien l’intention convenue et valide le plan.
5. **Code et Prove.** L’agent de codage génère le code et les tests, exécute la compilation, la vérification de types, le linter, les tests et les contrôles déterministes, puis corrige toute erreur et répète la boucle jusqu’à ce que tout soit au vert.
6. **Release.** Le changement est déployé automatiquement et exposé progressivement aux utilisateurs. Le franchissement d’un seuil déclencherait son annulation immédiate.
7. **Learn.** La supervision prédictive surveille la métrique d’impact métier. Le verdict et les enseignements tirés viennent enrichir en retour le Contexte persistant et les Contrôles déterministes si nécessaire.

## Principes

Sept principes gouvernent chaque décision. Lorsqu’une règle de cette documentation entre en conflit avec une commodité locale, le principe l’emporte.

1. **Piloté par les réunions et ancré dans le besoin client.** L’évolution du logiciel commence dans les échanges avec les clients et les parties prenantes. L’IA structure ce dialogue en besoins métier afin que les exigences ne se perdent jamais dans la saisie manuelle de tickets.
2. **Les développeurs ne codent pas la syntaxe.** L’écriture du code est une capacité automatisée confiée aux agents IA. Les développeurs spécifient, structurent le contexte et valident.
3. **Auto-validation par des contrôles déterministes denses.** Des vérifications automatisées rapides (compilateurs, vérificateurs de types, linters, tests) maintiennent la rapidité de la boucle de codage, tandis que des contrôles déterministes (tests de contrat, tests de mutation, scanners de sécurité, policy-as-code) prouvent le résultat. Les agents s’exécutent en boucle fermée face à ces contrôles jusqu’à ce que chaque jalon passe au vert.
4. **Validation humaine minimale, effet de levier maximal.** Aucune revue ligne par ligne de la syntaxe générée. La revue humaine se concentre sur l’intention métier, le résultat pour le client et la maîtrise du rayon d’impact (*blast radius*).
5. **Tout ce qui compte est un artefact versionné.** Les instructions, prompts, skills, agents, spécifications, relevés de décision (*decision records*), suites de contrôles et runbooks vivent dans un dépôt Git et évoluent par pull requests.
6. **Le code généré est un brouillon tant qu’il n’est pas prouvé de manière déterministe.** L’étape [Prove](./stage-prove) convertit des brouillons probabilistes en systèmes au comportement prouvé.
7. **Sécurisé et conforme par défaut.** La plateforme applique le policy-as-code et les scanners automatisés afin que les squads n’aient pas à s’en souvenir manuellement. Voir [Contrôles déterministes](./deterministic-controls).

## Ce qui change par rapport à une organisation logicielle classique

| Organisation classique | L’Agentic Software Factory |
|---|---|
| Les développeurs écrivent la syntaxe manuellement dans un IDE | Les développeurs **ne codent pas** ; l’IA génère 100 % du code, des tests et de la documentation |
| Les développeurs passent des heures en revues de PR ligne par ligne | Des **contrôles déterministes denses auto-valident** le code ; les humains effectuent une **validation minimale** centrée sur l’intention |
| Les exigences se perdent dans les tickets manuels et les transferts | **Meeting-Driven Development** : l’IA transforme les réunions clients en tickets de backlog qualifiés et classés |
| La connaissance réside dans les têtes, les chats et des wikis obsolètes | La connaissance réside dans le [Contexte persistant](./persistent-context) versionné |
| L’IA est utilisée de façon ponctuelle comme assistant d’autocomplétion | Des agents IA autonomes opèrent en boucle fermée avec auto-correction sous garde-fous |
| La vélocité est mesurée en story points et en volume de PR | Le flux est mesuré par le délai entre réunion et mise en production (*lead time*), le taux de succès déterministe et les résultats clients |

Lorsque la génération de code devient autonome et peu coûteuse, le goulot d’étranglement se déplace. Il ne s’agit plus d’*écrire* du code, mais de **capter fidèlement l’intention réelle du client et de prouver de manière déterministe que ce qui a été généré y répond**.

Pour découvrir les mauvaises habitudes qui compromettent silencieusement ce modèle, consultez les [Anti-patterns](./anti-patterns).
