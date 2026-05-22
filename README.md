# Azure Functions Serverless Architecture (Local)

## Contexte

Ce projet implémente une architecture serverless locale avec Azure Functions et Azurite (émulateur Azure Storage).

Aucun compte Azure cloud n’est nécessaire.

## Architecture

HTTP Trigger → Queue Storage → Queue Trigger → Table Storage

# Fonction 1 : HTTP Trigger

## Rôle

- Recevoir une requête HTTP
- Extraire les données
- Envoyer un message dans une Queue Storage

# Fonction 2 : Queue Trigger

## Rôle

- Déclenchée automatiquement par un message dans la queue
- Lire le message reçu
- Stocker les données dans Table Storage

# Prérequis

- Node.js (>= 18)
- Azure Functions Core Tools v4
- Azurite (émulateur Azure Storage)

# Installation

```bash
npm install
```

# Lancement

## 1. Lancer Azurite

```bash
azurite --skipApiVersionCheck
```

## 2. Lancer Azure Functions

```bash
func start
```

## 3. Tester l’API

```bash
curl "http://localhost:7071/api/HttpTriggerFunction?name=testuser"
```

# Résultat attendu

- La requête HTTP déclenche l’envoi d’un message dans la queue
- La Queue Trigger récupère automatiquement le message
- Les données sont stockées dans Table Storage

# Technologies utilisées

- Azure Functions (Node.js v4)
- Azure Queue Storage (Azurite)
- Azure Table Storage (Azurite)
- Architecture event-driven serverless
