# Mettre mon portfolio en ligne (gratuitement) + backoffice

Ce guide te fait passer de « j'ai un dossier de site » à « mon site est en ligne
et je peux ajouter mes projets moi-même ». Tout est **gratuit**.

Le chemin : **GitHub** (stocke le site) → **Netlify** (le met en ligne) →
**Pages CMS** (le backoffice pour ajouter du contenu).
Compte ~30 min la première fois. Après, ajouter un projet prend 2 min.

---

## Avant de commencer
Tu as un dossier `site/` contenant notamment :
- les pages : `index.html`, `apropos.html`, `projets.html`, `creations.html`, `contact.html`
- `assets/` (le design, le code, tes images)
- `content/` (tes projets et créations — c'est ce que le backoffice modifiera)
- `.pages.yml` (la configuration du backoffice)

⚠️ Garde le dossier **tel quel** : ne renomme pas les fichiers, ne déplace rien.

---

## Étape 1 — Créer un compte GitHub (5 min)
GitHub, c'est l'endroit où « vit » ton site. C'est ce qui rend le backoffice possible.

1. Va sur **https://github.com** → **Sign up**.
2. Renseigne email, mot de passe, un nom d'utilisateur (ex. `maurine-roulleau`).
3. Valide ton email.
4. Choisis le plan **Free** (gratuit).

## Étape 2 — Déposer le site sur GitHub (5 min)
1. En haut à droite, clique **+** → **New repository**.
2. **Repository name** : `portfolio` (par exemple).
3. Laisse **Public**, ne coche rien d'autre, clique **Create repository**.
4. Sur la page qui s'affiche, clique le lien **« uploading an existing file »**.
5. **Glisse-dépose tout le contenu du dossier `site/`** (pas le dossier lui-même :
   son *contenu* — les fichiers et sous-dossiers `assets`, `content`, etc.).
6. En bas, clique **Commit changes**.

> 💡 Si le fichier `.pages.yml` n'apparaît pas après le glisser-dépose (certains
> navigateurs masquent les fichiers commençant par un point), ouvre-le depuis le
> dossier et glisse-le seul, ou dis-le-moi, je t'aide.

## Étape 3 — Mettre en ligne avec Netlify (10 min)
1. Va sur **https://www.netlify.com** → **Sign up** → **Sign up with GitHub**
   (connecte ton compte GitHub, c'est plus simple).
2. **Add new site** → **Import an existing project** → **GitHub**.
3. Autorise Netlify à voir tes dépôts, puis choisis **`portfolio`**.
4. Ne touche à **aucun** réglage de build (le site n'a pas besoin d'être « compilé »).
   Laisse les champs vides et clique **Deploy**.
5. Au bout d'une minute, ton site est en ligne à une adresse du type
   `https://un-nom-aleatoire.netlify.app`.
6. Tu peux renommer cette adresse : **Site configuration → Change site name**
   (ex. `maurine-roulleau.netlify.app`).

✅ **Ton site est en ligne.** Tu peux déjà le partager.

## Étape 4 — Activer le backoffice (Pages CMS) (10 min)
C'est l'interface où tu ajoutes tes projets **sans toucher au code**.

1. Va sur **https://pagescms.org** → **Sign in with GitHub**.
2. Autorise l'accès à ton dépôt **`portfolio`**.
3. Pages CMS détecte automatiquement le fichier `.pages.yml` et t'affiche deux
   sections : **Projets** et **Créations**.
4. Pour **ajouter un projet** : clique **Projets → Add an entry**, remplis le titre,
   la description, choisis les catégories, téléverse une image, coche
   « Mettre en avant » si tu veux qu'il apparaisse sur l'accueil → **Save**.
5. En arrière-plan : Pages CMS enregistre dans GitHub, et **Netlify remet le site
   à jour tout seul** en ~1 min.

> 📌 Ajoute `https://app.pagescms.org` à tes favoris : c'est ta « console d'admin ».

---

## Ton formulaire de contact
Il est déjà prêt pour **Netlify Forms** (gratuit, 100 messages/mois). Les messages
reçus s'affichent dans Netlify → onglet **Forms**. Rien à configurer de plus.

## Ajouter / modifier du contenu plus tard
Deux façons, au choix :
- **Via le backoffice** (recommandé) : Pages CMS, comme à l'étape 4.
- **À la main** : éditer les fichiers `content/projets.json` et
  `content/creations.json` directement sur GitHub (bouton crayon ✏️).

Les **catégories possibles** pour un projet (champ *tags*) :
`web`, `comm`, `social`, `branding`, `video`, `recherche`, `event`.

## Un vrai nom de domaine (optionnel, plus tard)
`.netlify.app` est gratuit et suffisant pour commencer. Si un jour tu veux
`maurineroulleau.fr`, il faudra acheter le domaine (~10 €/an chez un registrar) —
c'est la **seule** dépense possible, et elle reste facultative. L'hébergement, lui,
reste gratuit.

---

## Récap' des comptes à créer (tous gratuits)
1. **GitHub** — stocke le site
2. **Netlify** — met le site en ligne
3. **Pages CMS** — le backoffice (connexion via GitHub, rien à installer)

Besoin d'aide sur une étape ? Dis-moi laquelle, je te guide écran par écran.
