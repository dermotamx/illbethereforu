# mAirList TCP Server

Serveur Node.js pour recevoir les informations de titre depuis mAirList via TCP et les diffuser via WebSocket et HTTP.

## Prérequis

- Node.js (version 12 ou supérieure)
- mAirList 

## Installation

```bash
npm install
```

## Configuration mAirList

### 1. Activer la journalisation TCP

1. Ouvrir mAirList
2. **Panneau de contrôle** → **Journalisation**
3. Ajouter **TCP**
4. Configurer :
   - **Host** : `localhost`
   - **Port** : `3000` - port à configurer dans le serv.js
   - **Template** : %a - %b


## Lancement

```bash
node serv.js
```

ou

```bash
npm start
```

## Utilisation

- **Interface web** : http://localhost:8080
- **API REST** : http://localhost:8080/titrage

## Ports

- **3000** : TCP (mAirList)
- **8080** : HTTP/WebSocket

