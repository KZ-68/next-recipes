
# Projet Recettes Next.js

Ce fichier vous présente le projet Next.js "Recettes" pour ELAN Formation.

* Authentication par Email avec mot de passe.
* Utilisation du gestionnaire Clerk pour l'authentification et les restrictions sur les routes
* Gestion du compte - Mise à jour des détails du profil et de la suppression du compte
* Système de commentaires protéger par authentification.
* Sécurisation des Sessions à l'aide des jetons JWT
* Composant Tailwind 3.4.1 pour React
* Utilisation du composant Lucide-React pour l'affichage des icônes
* Le gestionnaire de paquets npm est utilisé pour l'installation, la mise à jour, la vérification des vulnérabilités et la désinstallation des dépendances.

## A propos 

Le projet Next.js Recettes à pour objectif de regrouper un ensemble de recettes de cuisine et d'articles de blog en lien avec des plats cuisinés, contenants ces différentes recettes.

Les pages de recettes contiennent différentes sections qui apportent un contenu enrichi à la page :
* Une section instructions, afin de pouvoir connaître la marche à suivre pour réaliser la recette
* Une section étapes, pour suivre un ordre de tâches pour réaliser la recette.
* Une section d'onglets pour les ingrédients et les ustensiles utilisées.
* Une section suggestions, qui propose aléatoirement un nombre de recette à chaque affichage de la page.

Les différentes pages de recettes et d'articles comportent une zone de commentaires, pour les utilisateurs connectés. 
Les pages de recettes affichent également de nombreuses informations relatives à la composition et à l'apport Energie/Fibre/Graisse des ingrédients utilisés.

Dans ce projet, nous utilisons Tailwind, CSS, ChartJS pour le graphique en Donut des valeurs macronutritionnelles, et la librairie Lucide-Reac pour l'affichage des icônes. 

Pour gérer les détails des Recettes, des articles du blog, et les plannifications de menus inscrits par les utilisateurs, les données sont affichées et traitées au travers de requêtes vers une API REST, relié à une base de données MongoDB et à un accès aux données utilisateur connecté. 

Le projet comporte un système d'authentification qui supporte les connexions via Email, avec utilisation d'un mot de passe.

## Lancer localement le projet en mode développement

Pour commencer, clôner le repository et lancez la commande `npm install && npm run dev`:

    git clone https://github.com/iaincollins/nextjs-starter.git
    npm install
    npm run dev

## Construire et deployer en production

Si vous voulez lancer le site en production, vous devez installer les modules puis construire le site avec `npm run build` et lancez-là avec `npm start`:

    npm install
    npm run build 
    npm start

Vous devez lancer `npm run build` à nouveau à chaque fois que vous effectuez des changements sur le site.

Note: Si vous utlilisez déjà un webservice sur le port 80 (ex: Les Macs utilisent habituellement un webservice sur le port 80) vous pouvez quand même lancer l'exemple en mode production en passant un port différent comme Variable d'Environnement lors du lancement (ex: `PORT=3000 npm start`).

## Configurer

Afin d'utiliser pleinement les fonctionnalités du site, vous devez créer un fichier .env et .env.local et les compléter avec vos informations de connexions. 

Pour le fichier ".env", récupérez les lignes présentes dans le fichier [.env.example](https://github.com/iaincollins/next-recipes/blob/master/.env.example) jusqu'à la fin de la ligne "NEXT_PUBLIC_EDAMAM_KEY". Et pour le fichier ".env.local", récupérez les deux dernières lignes.

