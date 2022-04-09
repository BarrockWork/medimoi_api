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
const drugDefault = {
    name: 'Drug Test',
    nameSlug: createSlug('Drug Test'),
    description: 'ceci est une description',
    isPrescription: false,
    drug_level_id: 1,
    drug_type_id: 1,
    medical_administration_id: 1,
}

/*
 * Init the Drug test group
 */
describe("Drug unit testing", () => {
    testMaxLength('Drug', drugDefault, 'name', 255);
    testUniqueness('Drug', drugDefault, 'nameSlug');
})