const bcrypt = require("bcrypt");
const user = [
    {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        email: "superuser@mail.com",
        password: bcrypt.hashSync("Azerty", 12),
        role: "SUPER_ADMIN",
        cellphone: "0123456789",
        homephone: "0123456789",
        workphone: "0123456789"
    },
    {
        firstName: "Jane",
        lastName: "Doe",
        age: 30,
        email: "admin@mail.com",
        password: bcrypt.hashSync("testPassword", 12),
        role: "ADMIN",
        cellphone: "0123456789",
        homephone: "0123456789",
        workphone: "0123456789"
    }
];

module.exports = user;
