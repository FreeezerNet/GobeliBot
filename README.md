# 🧌 GobeliBot — Le repaire des Gobelins

Bot Discord pour le serveur **Le repaire des Gobelins**. Il gère les arrivées et
départs des membres, et propose quelques commandes utiles de base.

## ✨ Fonctionnalités

- **Message de bienvenue** quand un membre rejoint (embed + mention + compteur)
- **Message de départ** quand un membre quitte
- **Rôle automatique** (optionnel) donné aux nouveaux arrivants
- **Commandes slash** :
  - `/ping` — latence du bot
  - `/help` — liste des commandes
  - `/serverinfo` — infos sur le serveur
  - `/membercount` — nombre de membres

---

## 🚀 Installation

### 1. Créer l'application et le bot

1. Va sur le [Discord Developer Portal](https://discord.com/developers/applications).
2. **New Application** → donne-lui un nom (ex: GobeliBot).
3. Onglet **Bot** → **Reset Token** → copie le token (tu en auras besoin).
4. Toujours dans **Bot**, active les **Privileged Gateway Intents** :
   - ✅ **Server Members Intent** (indispensable pour les arrivées/départs)

### 2. Inviter le bot sur le serveur

1. Onglet **OAuth2 → URL Generator**.
2. Scopes : coche **`bot`** et **`applications.commands`**.
3. Bot Permissions : coche au minimum **Send Messages**, **Embed Links**,
   et **Manage Roles** (si tu utilises le rôle automatique).
4. Copie l'URL générée, ouvre-la et invite le bot sur ton serveur.

### 3. Configurer le projet

Copie le fichier d'exemple et remplis-le :

```bash
copy .env.example .env
```

Ouvre `.env` et renseigne :

- `DISCORD_TOKEN` — le token du bot (étape 1.3)
- `CLIENT_ID` — l'Application ID (Developer Portal → General Information)
- `GUILD_ID` — l'ID de ton serveur (active le Mode développeur dans Discord :
  Paramètres → Avancés → Mode développeur, puis clic droit sur le serveur →
  « Copier l'identifiant du serveur »)

Optionnel : `WELCOME_CHANNEL_ID`, `GOODBYE_CHANNEL_ID`, `AUTO_ROLE_ID`
(clic droit sur un salon / rôle → « Copier l'identifiant »).

### 4. Enregistrer les commandes slash

À faire une fois (et à chaque ajout/modification de commande) :

```bash
npm run deploy
```

### 5. Lancer le bot

```bash
npm start
```

Tu devrais voir `✅ Connecté en tant que ...` dans la console. 🎉

> 🚀 **Pour héberger le bot en ligne 24h/24** (sans laisser ton PC allumé) et
> le mettre à jour facilement ensuite, suis le guide **[DEPLOIEMENT.md](DEPLOIEMENT.md)**.

---

## 📁 Structure du projet

```
GobeliBot/
├── .env.example          # Modèle de configuration (à copier en .env)
├── package.json
└── src/
    ├── index.js          # Point d'entrée : charge commandes + évènements
    ├── config.js         # Lecture du .env et couleurs
    ├── deploy-commands.js # Enregistre les commandes slash
    ├── commands/         # Une commande = un fichier
    │   ├── ping.js
    │   ├── help.js
    │   ├── serverinfo.js
    │   └── membercount.js
    └── events/           # Un évènement = un fichier
        ├── ready.js
        ├── guildMemberAdd.js    # Arrivées
        ├── guildMemberRemove.js # Départs
        └── interactionCreate.js # Exécute les commandes slash
```

## ➕ Ajouter une commande

Crée un fichier dans `src/commands/` sur ce modèle :

```js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('macommande')
    .setDescription('Ce que fait ma commande.'),
  async execute(interaction) {
    await interaction.reply('Coucou 🧌');
  },
};
```

Puis relance `npm run deploy` pour l'enregistrer.

## 🔒 Sécurité

Ne partage **jamais** ton token et ne le mets pas sur GitHub. Le fichier `.env`
est déjà ignoré par Git (`.gitignore`). Si ton token fuite, va le réinitialiser
dans le Developer Portal.
