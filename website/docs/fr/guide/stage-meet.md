---
pageClass: page-stage-orange
---

# 🎙️ 0 — Meet

<div class="stage-hero-banner banner-orange">
  <span class="stage-hero-badge">ÉTAPE 0</span>
  <span class="stage-hero-desc">Dialogue client &amp; découverte</span>
</div>

Là où naît la demande et où la vérité terrain est captée. L’Agentic Software Factory est **pilotée par les réunions (Meeting-Driven)** : les conversations brutes avec les clients, les entretiens avec les parties prenantes et les ateliers de découverte sont capturés sous forme d’entrées traçables qui établissent une intention claire pour l’ensemble de l’usine logicielle. L’étape 0 préserve la source et le contexte, en établissant ce qui compte et pourquoi.

## Objectif

Éliminer la dégradation des exigences et l’effet « téléphone arabe » traditionnel en capturant l’intention authentique du client directement à la source.

| Entrée | Sortie | Responsable |
|---|---|---|
| Dialogue client, ateliers de découverte avec les parties prenantes, appels audio et vidéo, débriefings d’incidents | Transcriptions, synthèses de réunion, citations métier mises en évidence et ancres d’intention client | Client + Product Owner |

## Ce qui se perd sans cette étape

Dans une livraison traditionnelle, les paroles d’un client passent par plusieurs intermédiaires avant qu’un Développeur ne les voie, et chaque transfert en perd une partie.

| | Ticket traditionnel | Ticket de backlog Meeting-Driven |
|---|---|---|
| **Ce que le client a dit** | « Nos responsables régionaux passent 45 minutes chaque matin à recouper les exports CSV de SAP avec les feuilles d’inventaire locales avant que les camions ne puissent partir. » | La même phrase, citée mot pour mot, avec un lien vers l’instant exact dans la transcription |
| **Ce que le Développeur reçoit** | « Améliorer l’export d’inventaire » | Un problème nommé, qui est bloqué et ce que cela lui coûte |
| **Ce qui a disparu** | Les 45 minutes, la source SAP, les camions qui attendent, les personnes impactées | Rien |
| **Comment vérifier plus tard** | Impossible. La seule trace est le résumé écrit par quelqu’un | Chaque étape ultérieure peut être confrontée aux mots d’origine |

Les agents IA ne peuvent pas deviner les nuances implicites du métier d’un client. Si ces nuances sont perdues avant que le travail ne leur parvienne, aucune quantité de tests ne les ramènera. Capturer le dialogue à la source permet de garder chaque étape suivante ancrée dans ce que le client a réellement exprimé.

## Capacités clés

### 1. Transcription et attribution des locuteurs
L’IA ingère les réunions clients (appels de découverte, revues de sprint, comités de pilotage) et génère des transcriptions horodatées dans lesquelles chaque intervention est attribuée à son locuteur (*speaker diarization*).

### 2. Ancrage verbatim de l’intention
Plutôt que de résumer les conversations en listes à puces génériques, le pipeline de réunion extrait des citations exactes (*verbatims*) et les ancre aux concepts du domaine. Lorsqu’un besoin est enregistré dans [1 — Triage](./stage-triage), le ticket de backlog cite la phrase exacte du client dans son champ de preuve :

> *« Nos responsables régionaux passent 45 minutes chaque matin à recouper les exports CSV de SAP avec les feuilles d’inventaire locales avant que les camions ne puissent partir. »*
> — Directeur des opérations, Transcription de réunion (2026-09-24, 15:14:32)

## L’artefact Meeting Pack

À l’issue de chaque réunion, le pipeline d’intelligence produit un **Meeting Pack** immuable :

1. **Transcription intégrale** : texte verbatim indexé par horodatage et par locuteur.
2. **Synthèse exécutive** : résumé d’une page des enjeux métier, de l’urgence et des défis principaux abordés.
3. **Concepts et terminologie du domaine** : nouveaux termes ou acronymes introduits par le client, prêts à être intégrés au [Contexte persistant](./persistent-context).
4. **Besoins métier candidats** : besoins prêts à être qualifiés en exigences et classés comme tickets de backlog dans **[1 — Triage](./stage-triage)**.

## Où l’IA intervient

L’IA capture et structure le dialogue ; le Product Owner oriente la conversation et le client confirme ce qui a été dit.

| Tâche | Rôle de l’IA | Rôle humain |
|---|---|---|
| **Transcription** | Convertir le flux audio ou vidéo en une transcription horodatée avec attribution des locuteurs | Vérifier l’exactitude de l’attribution des locuteurs |
| **Ancrage des citations** | Extraire les citations verbatim et les relier aux concepts du domaine | Confirmer que les citations reflètent fidèlement la pensée du client |
| **Synthèse de réunion** | Produire une synthèse exécutive, la nouvelle terminologie et les besoins métier candidats, à l’aide du glossaire et des instructions du Contexte persistant | Confirmer les énoncés de problèmes avec le client |

## Primitives dans le Contexte persistant

Le Contexte persistant fournit au pipeline de réunion son glossaire métier et ses instructions afin que les termes soient transcrits avec précision, que les Meeting Packs suivent une structure cohérente et que les nouveaux termes clients identifiés enrichissent le dépôt en retour.

Meet s’appuie sur les primitives publiées par [coding-pal](https://alten-group.github.io/coding-pal/) :

- Un agent **Meeting Analyst** transforme la transcription texte brut de l’outil homologué en Meeting Pack et prépare la liste de relecture du Product Owner.
- Une instruction **meeting-pack** garantit l’immuabilité de la transcription ainsi que le caractère verbatim et attribué de chaque citation.
- Un skill **meeting-pack** normalise la transcription, valide le pack par rapport à la transcription et au glossaire du domaine (synthèse, citations verbatim, termes du glossaire et confirmations humaines nominatives), et émet un ticket de backlog par besoin confirmé à destination de [1 — Triage](./stage-triage).
- Le **glossaire du domaine** (`docs/glossary.md`) est lu par l’agent, et les nouveaux termes clients détectés sont préparés pour une pull request.

Voir le [guide Meet de coding-pal](https://alten-group.github.io/coding-pal/guide/domain-meet).

## Jalon de sortie

Une réunion se clôture avec succès lorsque :

1. La transcription de la réunion a été capturée, vérifiée quant à l’attribution des locuteurs, et commitée dans le dépôt.
2. Le client a confirmé que les énoncés de problèmes figurant dans la synthèse de réunion reflètent fidèlement sa difficulté métier.
3. Les besoins métier candidats ont été émis vers le backlog pour être classés dans **[1 — Triage](./stage-triage)**.
