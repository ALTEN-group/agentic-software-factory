# 🗓️ Cadence

L’Agentic Software Factory remplace les réunions manuelles de suivi d’avancement par le **développement piloté par les réunions (*Meeting-Driven Development*)** : des sessions en direct avec les clients et les parties prenantes alimentent directement le moteur de développement autonome. Tout le reste est asynchrone, écrit et lié à l’élément de travail.

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

1. **L’IA est un participant actif** : la réunion est enregistrée et transcrite par l’outil d’intelligence de réunion homologué.
2. **Structuration des besoins** : pendant ou immédiatement après la réunion, l’IA structure le dialogue en besoins métier candidats accompagnés de citations probantes et d’ébauches de critères d’acceptation, que [1 — Triage](./stage-triage) enregistre en tickets de backlog et que [3 — Plan](./stage-plan) transforme ensuite en dossier Plan.
3. **Présence du développeur** : plutôt que d’isoler les développeurs derrière des files de tickets, ceux-ci participent directement afin de garantir que le contexte métier et les invariants du système sont capturés avec précision.
4. **Confirmation du client** : avant la fin de la réunion, le Product Owner relit les besoins capturés et le client les confirme ou les corrige. La synthèse écrite par l’IA est ensuite envoyée au client pour validation finale.

## Règles des réunions internes

1. Toute réunion qui ne débouche sur aucune décision ni aucun artefact commité est supprimée définitivement.
2. Chaque réunion récurrente possède un responsable et une date d’expiration.
3. Les documents préparatoires (*pre-reads*) sont rédigés par l’IA et diffusés à l’avance ; les réunions sont réservées au débat et à la prise de décision, jamais à la lecture de diapositives.
4. Les décisions sont écrites dans le dépôt (dossier Plan, relevé de décision ou *scorecard*) avant la fin de l’appel.
