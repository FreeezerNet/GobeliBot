# 🚀 Héberger GobeliBot en ligne (et le mettre à jour)

Ton PC n'a pas besoin de rester allumé : on va faire tourner le bot sur un
**hébergeur cloud gratuit**. Pour pouvoir le **mettre à jour facilement plus
tard**, on passe d'abord par **GitHub** — ensuite, mettre à jour le bot = un
simple `git push`.

> 🧭 **Le plan en 3 temps**
> 1. Mettre le code sur **GitHub** (une fois)
> 2. Le **déployer** sur un hébergeur gratuit (une fois)
> 3. **Mettre à jour** : `git push`, puis redéploiement (à chaque changement)

---

## ✅ Avant de commencer

- Un compte **GitHub** (gratuit) : <https://github.com/signup>
- **Git** installé sur ton PC : <https://git-scm.com/download/win>
  (vérifie avec `git --version` dans un terminal)
- Le bot déjà créé sur le [Developer Portal](https://discord.com/developers/applications)
  avec son **token**, son **CLIENT_ID** et le **Server Members Intent** activé
  (voir [README.md](README.md)).

> 🔐 **Règle d'or :** ton fichier `.env` (qui contient le token) ne doit
> **JAMAIS** aller sur GitHub. Il est déjà protégé par le `.gitignore` du projet.
> Sur l'hébergeur, on renseignera le token autrement (voir Étape 3).

---

## 1️⃣ Mettre le code sur GitHub

Dans un terminal, place-toi dans le dossier du projet :

```bash
cd C:\Users\Remi\Desktop\GobeliBot
```

Initialise le dépôt et fais un premier commit :

```bash
git init
git add .
git commit -m "Premier commit : GobeliBot"
```

> ℹ️ Vérifie que `.env` n'apparaît **pas** dans `git status`. S'il apparaît,
> arrête-toi : le `.gitignore` est mal placé.

Crée ensuite un dépôt **privé** sur GitHub :

- **Au clic** : va sur <https://github.com/new>, nomme-le `GobeliBot`,
  coche **Private**, ne coche rien d'autre, puis **Create repository**.
- GitHub t'affiche alors les commandes à copier. Elles ressemblent à :

```bash
git remote add origin https://github.com/TON-PSEUDO/GobeliBot.git
git branch -M main
git push -u origin main
```

✅ Ton code est maintenant sur GitHub. C'est la base pour les deux hébergeurs
ci-dessous **et** pour les mises à jour futures.

---

## 2️⃣ Déployer sur un hébergeur gratuit

Deux options. **A** est 100 % gratuite et sans carte bancaire — recommandée pour
un serveur entre amis. **B** offre le confort du « déploiement automatique au
push », mais son offre gratuite est limitée dans le temps.

### Option A — bot-hosting.net (gratuit, sans carte) ⭐ recommandé

[bot-hosting.net](https://bot-hosting.net) héberge gratuitement les bots Discord
Node.js, 24h/24, via un panneau de contrôle.

1. Va sur <https://bot-hosting.net> et **connecte-toi avec Discord**.
2. Crée un nouveau serveur/bot et choisis l'environnement **Node.js**
   (version **20** ou plus récente — requis par discord.js v14).
3. **Importe ton code** depuis ton dépôt GitHub (option « Pull from GitHub » /
   dépôt Git) **ou** en envoyant les fichiers via le gestionnaire de fichiers.
   > Ne copie pas ton `.env` : on règle le token à l'étape suivante.
4. Définis la **commande de démarrage** sur :
   ```
   npm start
   ```
5. Renseigne le token et les IDs (Étape 3), puis **démarre** le serveur.

Doc officielle : [wiki.bot-hosting.net](https://wiki.bot-hosting.net).

### Option B — Railway (déploiement auto au push)

[Railway](https://railway.app) redéploie ton bot automatiquement à chaque
`git push`. Très pratique, mais ⚠️ **l'offre gratuite est un crédit d'essai**
(~5 $, puis ~1 $/mois) qu'un bot allumé en permanence peut épuiser en quelques
semaines. Vérifie toujours la page *Pricing* avant de compter dessus.

1. Va sur <https://railway.app>, connecte-toi avec GitHub.
2. **New Project → Deploy from GitHub repo → GobeliBot**.
3. Railway détecte Node.js et lance `npm start` tout seul.
4. Renseigne les variables (Étape 3) dans l'onglet **Variables**.

---

## 3️⃣ Renseigner le token et les IDs (variables d'environnement)

Le bot a besoin des mêmes valeurs que dans ton `.env` local, mais côté
hébergeur. **Ne mets jamais ces valeurs dans GitHub.**

Renseigne ces variables dans le panneau de l'hébergeur (section *Variables* /
*Startup* / *Environment*) :

| Variable             | Obligatoire | Valeur                                   |
| -------------------- | ----------- | ---------------------------------------- |
| `DISCORD_TOKEN`      | ✅          | le token du bot                          |
| `CLIENT_ID`          | ✅          | l'Application ID                         |
| `GUILD_ID`           | ✅          | l'ID de ton serveur                      |
| `WELCOME_CHANNEL_ID` | ⬜          | salon de bienvenue (optionnel)           |
| `GOODBYE_CHANNEL_ID` | ⬜          | salon de départ (optionnel)              |
| `AUTO_ROLE_ID`       | ⬜          | rôle automatique (optionnel)             |

> 💡 Sur bot-hosting.net, si le panneau ne propose pas de champ pour chaque
> variable, tu peux aussi **téléverser ton fichier `.env`** directement via le
> gestionnaire de fichiers (il reste privé, il n'est pas sur GitHub).

---

## 4️⃣ Enregistrer les commandes slash (une fois)

Les commandes `/ping`, `/help`, etc. doivent être enregistrées auprès de Discord.
Sur l'hébergeur, ouvre la **console** de ton bot et lance **une fois** :

```bash
npm run deploy
```

Tu dois voir `✅ X commande(s) enregistrée(s) sur le serveur !`.
À refaire uniquement quand tu **ajoutes ou modifies** une commande.

Ton bot est en ligne ! 🎉

---

## 🔄 Mettre à jour le bot plus tard

Tu as modifié le code sur ton PC (nouveau message de bienvenue, nouvelle
commande...). Voici comment déployer la nouvelle version :

### Sur ton PC — envoyer les changements sur GitHub

```bash
git add .
git commit -m "Décris ton changement ici"
git push
```

### Côté hébergeur — récupérer la nouvelle version

- **Railway :** rien à faire ✨ — le `git push` déclenche automatiquement un
  redéploiement.
- **bot-hosting.net :** dans le panneau, clique sur **Pull** (plugin Git) pour
  récupérer la dernière version depuis GitHub, puis **redémarre** le bot.
  (Si tu avais envoyé les fichiers à la main, renvoie les fichiers modifiés.)

### ⚠️ À ne pas oublier

- Si tu as **ajouté ou modifié une commande slash**, relance `npm run deploy`
  dans la console de l'hébergeur après la mise à jour.
- Si tu as ajouté une **dépendance** (`npm install ...`), l'hébergeur relance
  normalement `npm install` au démarrage ; sinon, lance-le à la main.

---

## 🩺 Dépannage rapide

| Symptôme                                   | Piste                                                                    |
| ------------------------------------------ | ------------------------------------------------------------------------ |
| Le bot se connecte mais reste hors ligne   | Vérifie `DISCORD_TOKEN` (pas d'espace, pas de guillemets).               |
| Les arrivées/départs ne déclenchent rien   | Active le **Server Members Intent** dans le Developer Portal.            |
| Les commandes `/` n'apparaissent pas       | Lance `npm run deploy` ; vérifie `CLIENT_ID` et `GUILD_ID`.              |
| « Used disallowed intents »                | Un intent privilégié n'est pas activé dans le Developer Portal.          |
| Le bot redémarre en boucle                 | Regarde les logs de la console : souvent un token manquant ou erroné.    |

---

### Sources (hébergement gratuit, vérifié le 15/11/2026)

- [bot-hosting.net](https://bot-hosting.net/) · [Wiki bot-hosting.net](https://wiki.bot-hosting.net/)
- [Best Discord Bot Hosting 2026 (discorder.tools)](https://discorder.tools/blog/best-discord-bot-hosting/)
- [Free Discord Bot Hosting: The Honest 2026 Truth (hostingbuff.com)](https://hostingbuff.com/guides/free-discord-bot-hosting)
- [How to Deploy Discord Bot to Railway (wisechecker.com)](https://wisechecker.com/deploy-discord-bot-railway-no-charges/)
