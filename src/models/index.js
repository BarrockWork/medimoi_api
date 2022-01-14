const {PrismaClient} = require('@prisma/client');
const Models = new PrismaClient();
module.exports = Models;