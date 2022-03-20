/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('./../../models');
const { testMaxLength } = require('./../../utils/testHandler');

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})