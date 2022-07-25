// Initialize express server
const express = require("express");
const router = express.Router();

const { signUp, login, logout } = require('./../controllers/AuthentificationController');


/* Formulaire de connexion */
router.post('/login', login)

//inscription
router.post('/signup', signUp )

//deconnexion
router.delete('/logout', logout)


module.exports = router;

