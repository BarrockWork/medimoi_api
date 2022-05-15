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
* [ApiDoc](https://apidocjs.com/)
* [Prisma](https://www.prisma.io/docs/)
* [Prismix](https://github.com/jamiepine/prismix)
* [Axios](https://axios-http.com/)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Ramda](https://ramdajs.com/)
* [Stripe-node](https://github.com/stripe/stripe-node)
* [Mailjet](https://fr.mailjet.com/)
* [Slugify](https://www.npmjs.com/package/slugify)
* [Jest](https://jestjs.io/fr/docs/getting-started)
* [Supertest](https://github.com/visionmedia/supertest)
* [Multer](https://github.com/expressjs/multer)
* [Uuid](https://github.com/uuidjs/uuid)
## Pour initialiser le projet

### 1/ Configurer les variables d'environnements
 Créer son fichier ".env.local" à partir du .env qui contiendra les variable d'environnement du projet. 
 Exemple pour la connexion avec sa base de données :
> Exemple avec MariaDB: DATABASE_URL="mysql://root:password@localhost:3306/medimoi"

### 2/ Les commandes à exécuter pour le développement
```
1. Installer les modules nodes:
  a) Sans mettre à jour les packages (Recommandé ): yarn install --frozen-lockfile ou npm ci 
  b) En mettant les package (Uniquement si necessaire car cela impacte l'équipe): yarn install ou npm install 
2. Fusionner et générer le fichier schema pour prisma: npx prismix ou yarn prixmix
3. Initialiser la base de données:
    - yarn create-migration ou npm run create-migration
    - yarn execute-migration ou npm run execute-migration
4. Exécuter l'application: yarn start ou npm run start
```

## Pour les tests

### 1/ Configuration des tests
 Créer son fichier de test dans le dossier /src/__tests__
 Exemple de nom de fichier de test :
> example.test.js

### 2/ Les commandes à exécuter pour les test
```
1. yarn
    - yarn test : exécute tous les tests.
    - yarn test-watch : exécute tous les tests avec le flag '--watch' qui permettra de relancer les tests à chaque modification des tests.
2. npm 
    - npm run test : exécute tous les tests.
    - npm run test-watch : exécute tous les tests avec le flag '--watch' qui permettra de relancer les tests à chaque modification des tests.
```