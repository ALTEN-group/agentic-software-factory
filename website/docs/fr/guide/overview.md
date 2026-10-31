# Vue d’ensemble

L’Agentic Software Factory est un **modèle de livraison pilotée par l’IA**, de la réunion client à la production. Il définit les responsabilités, le travail des agents et les contrôles requis pour livrer.

- **Agentic** : les agents IA implémentent, testent et corrigent de manière autonome.
- **Software Factory** : chaque changement suit des étapes reproductibles avec des critères de sortie clairs.

## Diagramme du modèle opérationnel

<DeliveryFlowchart />

Le flux de travail s’écoule de haut en bas. Les blocs verts (Contexte persistant, Contrôles déterministes et la Forge) alimentent les étapes qu’ils soutiennent. Un audit hebdomadaire ainsi que l’étape Learn peuvent ouvrir de nouveaux tickets dans Triage, ce qui referme la boucle.

## Les trois fondations

- **[Contexte persistant](./persistent-context)** : instructions, prompts, skills et agents versionnés dans le dépôt qui ancrent le comportement de l’IA.
- **[Forge](./forge)** : fonctions, bibliothèques et services éprouvés que les agents réutilisent au lieu de réécrire la même logique.
- **[Contrôles déterministes](./deterministic-controls)** : garde-fous automatiques qui bloquent les changements ne respectant pas les règles de sûreté, de sécurité ou de conformité.

## Un changement, de bout en bout

Exemple : un client veut accélérer la réconciliation de ses stocks.

1. **Meet.** Lors d’un appel client, un directeur des opérations indique que ses responsables perdent 45 minutes chaque matin à réconcilier des exports. L’IA transcrit l’appel et le Product Owner clarifie les cas limites directement en séance avec le client.
2. **Triage.** L’IA cite les propos du client, évalue le besoin et crée un ticket. Le Product Owner le marque *todo*.
3. **Think.** L’IA compare les options, choisit un service de la Forge et consigne sa justification et les risques.
4. **Plan.** L’IA définit les fichiers, étapes, code et tests, puis valide et approuve automatiquement le plan.
5. **Code et Prove.** L’agent de codage génère le code et les tests, exécute la compilation, la vérification de types, le linter, les tests et les contrôles déterministes, puis corrige toute erreur et répète la boucle jusqu’à ce que tout soit au vert.
6. **Release.** Le changement est déployé automatiquement et exposé progressivement aux utilisateurs. Le franchissement d’un seuil déclencherait son annulation immédiate.
7. **Learn.** La supervision prédictive surveille la métrique d’impact métier. Le verdict et les enseignements tirés viennent enrichir en retour le Contexte persistant et les Contrôles déterministes si nécessaire.

## Principes

Ces principes s’appliquent à chaque changement :

1. **Partir du client.** L’IA transforme les échanges en besoins métier liés à leurs preuves.
2. **Les développeurs ne codent pas la syntaxe.** L’écriture du code est une capacité automatisée confiée aux agents IA. Les développeurs spécifient, structurent le contexte et valident.
3. **Valider automatiquement.** Les agents exécutent builds, tests et contrôles, puis corrigent les échecs dans la limite de tentatives.
4. **Décider de manière autonome, vérifier indépendamment.** Les agents choisissent l’approche ; Prove vérifie l’intention, le comportement et la sécurité. Les personnes traitent les échecs non résolus, sans signature systématique.
5. **Tout ce qui compte est un artefact versionné.** Les instructions, prompts, skills, agents, spécifications, relevés de décision (*decision records*), suites de contrôles et runbooks vivent dans un dépôt Git et évoluent par pull requests.
6. **Le code généré doit passer [Prove](./stage-prove).** La génération seule ne prouve pas qu’un changement fonctionne.
7. **Sécurisé et conforme par défaut.** La plateforme applique le policy-as-code et les scanners automatisés afin que les squads n’aient pas à s’en souvenir manuellement. Voir [Contrôles déterministes](./deterministic-controls).

## Ce qui change par rapport à une organisation logicielle classique

| Organisation classique | L’Agentic Software Factory |
|---|---|
| Les développeurs écrivent la syntaxe manuellement dans un IDE | Les développeurs **ne codent pas** ; l’IA génère 100 % du code, des tests et de la documentation |
| Les développeurs passent des heures en revues de PR ligne par ligne | Les **contrôles déterministes et agents indépendants valident** ; les personnes résolvent les exceptions |
| Les exigences se perdent dans les tickets manuels et les transferts | **Meeting-Driven Development** : l’IA transforme les réunions clients en tickets de backlog qualifiés et classés |
| La connaissance réside dans les têtes, les chats et des wikis obsolètes | La connaissance réside dans le [Contexte persistant](./persistent-context) versionné |
| L’IA est utilisée de façon ponctuelle comme assistant d’autocomplétion | Des agents IA autonomes opèrent en boucle fermée avec auto-correction sous garde-fous |
| La vélocité est mesurée en story points et en volume de PR | Le flux est mesuré par le délai entre réunion et mise en production (*lead time*), le taux de succès déterministe et les résultats clients |

Le défi passe de l’écriture du code à **la compréhension du client et à la vérification du résultat**.

Pour découvrir les mauvaises habitudes qui compromettent silencieusement ce modèle, consultez les [Anti-patterns](./anti-patterns).
