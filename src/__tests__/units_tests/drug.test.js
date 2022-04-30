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
    name: 'Drug Unit Test',
    nameSlug: createSlug('Drug Unit Test'),
    description: 'ceci est une description unitaire',
    isPrescription: false,
    drug_level_id: 3,
    drug_type_id: 3,
    medical_administration_id: 12,
}

/*
 * Init the Drug test group
 */
describe("Drug unit testing", () => {
    testMaxLength('Drug', drugDefault, 'name', 255);
    testUniqueness('Drug', drugDefault, 'nameSlug');
})