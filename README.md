# Médi'Moi

## Introduction
Partie API de l'application.

Médi'Moi est une application web pour aider à vérifier la santé tous les jours et suivre des traitements périodique.

## Pré-requis
Pour lancer le projet vous aurez besoin de la configuration suivante :
* [MariaDB](https://mariadb.com/kb/en/where-to-download-mariadb/#the-latest-packages) >= v10.2
* [Nodejs >= v14](https://nodejs.org/en/download/) + [Yarn >= v1.22 (préférence)](https://yarnpkg.com/getting-started/install) ou [Npm >= v6.14](https://www.npmjs.com/)
* [Nodemon](https://www.npmjs.com/package/nodemon)

## Stack technique
* [Express v4.16](https://expressjs.com/fr/)
* [Prisma](https://www.prisma.io/docs/)
* [Axios](https://axios-http.com/)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Ramda](https://ramdajs.com/)
* [Stripe-node](https://github.com/stripe/stripe-node)
* [Mailjet](https://fr.mailjet.com/)

## Pour initialiser le projet

### 1/ Configurer les variables d'environnements
 Créer son fichier ".env.local" à partir du .env qui contiendra les variable d'environnement du projet. 
 Exemple pour la connexion avec sa base de données :
> Exemple avec MariaDB: DATABASE_URL="mysql://root:password@localhost:3306/medimoi"

### 2/ Les commandes à exécuter pour le développement
```
1. Installer les modules nodes: yarn install ou npm install 
2. Initialiser la base de données: yarn execute-migration ou npm run execute-migration
3. Exécuter l'application: yarn start ou npm run start
```

