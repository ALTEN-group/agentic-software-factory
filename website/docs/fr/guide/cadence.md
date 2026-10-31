# 🗓️ Cadence

Les réunions clients alimentent la livraison. Le suivi d’avancement est asynchrone, écrit et lié au ticket.

## Rituels pilotés par les réunions

| Rituel | Durée | Participants | Nature | Sortie |
|---|---|---|---|---|
| **Réunion client / parties prenantes** | 30 à 45 min | Client, Product Owner, Développeur | **Déclencheur du cycle** | Pack de réunion : transcription, synthèse, nouvelle terminologie et besoins métier candidats |
| **Revue hebdomadaire de Triage** | 45 min | Product Owner, Développeur | Décision humaine | Exigences métier classées et enregistrées en tickets de backlog, chacune appuyée par des preuves clients |
| **Revue hebdomadaire des résultats (*Outcomes*)** | 45 min | Product Owner, QA et mainteneur, Développeur | Décision humaine | Hypothèses validées ou invalidées et nouveaux tickets de backlog |
| **Revue hebdomadaire du Contexte persistant et des Contrôles** | 45 min | Architecte, Développeur | Gouvernance | Amélioration du Contexte persistant et des Contrôles déterministes |
| **Rétrospective mensuelle du modèle opérationnel** | 1 heure | Product Owner, Architecte, Développeur, DevOps, QA et mainteneur | Stratégie | Évolutions du modèle opérationnel lui-même |

Il n’y a **pas de réunion quotidienne de *daily standup***. L’état d’avancement est un simple lien vers la pull request active, ses vérifications et son déploiement de prévisualisation.

## Les règles des réunions clients dans l’Agentic Software Factory

1. **Enregistrer et transcrire** avec un outil homologué.
2. **Extraire les besoins** avec leurs citations sources. [Triage](./stage-triage) crée les tickets ; [Plan](./stage-plan) définit les critères d’acceptation.
3. **Inclure un Développeur** pour capter le contexte métier et les contraintes.
4. **Confirmer avec le client** : relire les besoins avant la fin de la réunion, puis envoyer la synthèse pour vérification finale.

## Règles des réunions internes

1. Toute réunion qui ne débouche sur aucune décision ni aucun artefact commité est supprimée définitivement.
2. Chaque réunion récurrente possède un responsable et une date d’expiration.
3. Les documents préparatoires (*pre-reads*) sont rédigés par l’IA et diffusés à l’avance ; les réunions sont réservées au débat et à la prise de décision, jamais à la lecture de diapositives.
4. Les décisions sont écrites dans le dépôt (dossier Plan, relevé de décision ou *scorecard*) avant la fin de l’appel.
