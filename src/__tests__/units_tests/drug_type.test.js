/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('./../../models');
const { createSlug } = require('./../../utils/requestHandler')
const {testMaxLength, testUniqueness} = require('./../../utils/testHandler')

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialise a Drug object
const drugTypeDefault = {
    name: 'Drug_Type Test',
    nameSlug: createSlug('Drug_Type Test'),
    description: 'ceci est une description',
}

/*
 * Init the Drug test group
 */
describe("DrugType unit testing", () => {
    testMaxLength('DrugType', drugTypeDefault, 'name', 50);
    testUniqueness('DrugType', drugTypeDefault, 'nameSlug');
})