require('dotenv').config()


// Initialize express server
const express = require("express");
const jwt = require("jsonwebtoken");
const Models = require('./../models');

const app = express();

let refreshTokens = []

const users = await Models.User.findAll();

/* Formulaire de connexion */
app.post('/login', (req, res) => {
    // Pas d'information à traiter
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Erreur. Veuillez entrer l\'email et le mot de passe corrects' })
    }

    // Checking
    const user = users.find(u => u.email === req.body.email && u.password === req.body.password)

    // Pas bon
    if (!user) {
        return res.status(400).json({ message: 'Erreur. Identifiant ou mot de passe erroné' })
    }

    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, SECRET, { expiresIn: '3 hours' })

    return res.json({ access_token: token })
})

//deconnexion
app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

//inscription
app.post('/register', (req, res) => {
    // Aucune information à traiter
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Erreur. Veuillez entrer l\'email et le mot de passe' })
    }

    // Checking
    const userExisting = users.find(u => u.email === req.body.email)

    // Pas bon
    if (userExisting) {
        return res.status(400).json({ message: `Error. L\'utlisateur ${req.body.username} existe déjà` })
    }

    // Données du nouvel utilisateur
    const id = users[users.length - 1].id + 1
    const newUser = {
        id: id,
        email: req.body.email,
        password: req.body.password
    }

    // Insertion dans le tableau des utilisateurs
    users.push(newUser)

    return res.status(201).json({ message: `User ${id} created` })
})