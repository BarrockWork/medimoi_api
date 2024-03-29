require('dotenv').config()

const Models = require('./../models');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const login = async (req, res) => {
    try {
        // Pas d'information à traiter
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({message: 'Erreur, veuillez entrer l\'email et le mot de passe corrects'})
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
        return res.status(400).json({message: 'Veuillez renseignez l\'email et le mot de passe'})
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

//middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    // Récupération du token
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    // Véracité du token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(401);
        }
        req.user = user;
        next();
    })
}


module.exports = {
    login,
    signUp,
    authenticateToken,
};
