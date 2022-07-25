require('dotenv').config()

const Models = require('./../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const login = async (req, res) => {
    try {
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
            return res.status(401).json({message: 'Aucun identifiant ou mot de passe correspond. Veuillez réessayer !!!'})
        }
        let token;
        if (user && (await bcrypt.compare(req.body.password, user.password))) {
            // Create token
            // save user token
            token = jwt.sign(
                {user_id: user.id, email: user.email},
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "3 hours",
                }
            );
            const infoUser = {
                id: user.id,
                email: user.email,
                lastName: user.lastName,
                firstName: user.firstName,
                user_type_id: user.UserType,
                role: user.role,
                isActive: user.isActive
            }
            // user
            res.status(200).json({infoUser, token});
        } else {
            res.status(401).send("Invalid Credentials");
        }
    } catch (err) {
        console.log(err);
    }
}


const signUp = async (req, res) => {
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
    try {
        const newUser = await Models.User.create({
            data: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: parseInt(req.body.age),
                cellphone: req.body.cellphone,
                homephone: req.body.homephone,
                email: req.body.email,
                password: cryptoPassword,
                user_type_id: parseInt(req.body.user_type_id),
                role: "USER",
            },
        })
        return res.status(201).json({newUser, message: `Vous venez de vous inscrire sur MediMoi !!!`})
    } catch (error) {
        res.send(error)
    }

}

// Verify route
const verify = async (req, res) => {

    // Get token value to the json body
    const token = req.body.token;

    // If the token is present
    if (token) {

        // Verify the token using jwt.verify method
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        //  Return response with decode data
        res.json({
            login: true,
            data: decode
        });
    } else {

        // Return response weith error
        res.json({
            login: false,
            data: 'error'
        });
    }
};


function authenticateToken(req, res, next) {
    let accesstokensecret = process.env.ACCESS_TOKEN_SECRET;
    let refreshtokensecret = process.env.REFRESH_TOKEN_SECRET;

    try {
        const token = req.header(refreshtokensecret);

        const verified = jwt.verify(token, accesstokensecret);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
    /*    const authHeader = req.headers['authorization']

        // Récupération du token
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.sendStatus(401)

        // Véracité du token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            console.log(err)
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })*/
}


module.exports = {
    login,
    signUp,
    authenticateToken,
    verify
};
