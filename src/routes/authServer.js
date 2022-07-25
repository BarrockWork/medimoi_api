require('dotenv').config()


// Initialize express server
const express = require("express");
const jwt = require("jsonwebtoken");
const Models = require('./../models');
const bcrypt = require("bcrypt");
const router = express.Router();

let refreshTokens = []


/* Formulaire de connexion */
router.post('/login', async (req, res) => {
    // Pas d'information à traiter
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({message: 'Erreur. Veuillez entrer l\'email et le mot de passe corrects'})
    }

    // Checking
    const user = await Models.User.findUnique({
        where: {
            email: req.body.email
        }
    });

    // Pas bon
    if (!user) {
        return res.status(400).json({message: 'Erreur. Identifiant ou mot de passe erroné'})
    }

    let token;
    try {
        //Creating jwt token
        token = jwt.sign(
            { userId: user.id, email: user.email },
            "secretkeyappearshere",
            { expiresIn: "3 hours" }
        );
    } catch (err) {
        console.log(err);
        const error = new Error("Error! Something went wrong.");
        return next(error);
    }
})

//inscription
router.post('/signup', async (req, res) => {
    const users = await Models.User.findMany();

    // Aucune information à traiter
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({message: 'Erreur. Veuillez entrer l\'email et le mot de passe'})
    }

    // Checking
    const userExisting = await Models.User.findUnique({
        where: {
            email: req.body.email,
        },
    })

    // Pas bon
    if (userExisting) {
        return res.status(400).json({message: `Error. Un utlisateur existe déjà avec cet adresse email`})
    }

    // Données du nouvel utilisateur
    const cryptoPassword = bcrypt.hashSync(req.body.password, 12)
    const newUser = await Models.User.create({
        data: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: parseInt(req.body.age),
            cellphone: req.body.cellphone,
            homephone: req.body.homephone,
            email: req.body.email,
            password: cryptoPassword,
            user_type_id: req.body.user_type_id,
            role: "USER",
        },
    })

    return res.status(201).json({newUser, message: `User  created`})
})

//deconnexion
router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})


module.exports = router;

