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

### 1/ Configurer la base de données
 Créer son fichier ".env.local" qui contiendra les informations de connexion avec sa base de données. Sinon les commandes suivantes ne pourront pas fonctionner ! Vous pouvez copier coller le ".env" existant.
> Exemple avec MariaDB: DATABASE_URL="mysql://root:@localhost:3306/medimoi"

### 2/ La liste des commandes à exécuter
```
1. Installer les modules nodes: yarn install ou npm install 
2. 

Créer la BDD: php bin/console doctrine:database:create ou symfony console doctrine:database:create
3. Mettre à jours la BDD: php bin/console doctrine:migrations:migrate ou symfony console doctrine:migrations:migrate
5. Compiler les assets: yarn encore dev npm run dev (Plus d'infos sur https://symfony.com/doc/current/frontend/encore/simple-example.html)
6. Lancer le sereur web local: symfony console server:start ou php/bin console server:start
7. Lancer les fixtures: symfony console doctrine:fixtures:load ou php bin/console doctrine:fixtures:load
```

