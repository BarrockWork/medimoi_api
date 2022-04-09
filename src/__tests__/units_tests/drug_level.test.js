/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('./../../models');
const {testMaxLength, testUniqueness} = require('./../../utils/testHandler')

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialise a Drug object
const drugLevelDefault = {
    level: 1,
    description: 'ceci est le niveau 1',
}

/*
 * Init the Drug test group
 */
describe("drugLevel unit testing", () => {
    testMaxLength('drugLevel', drugLevelDefault, 'description');
})