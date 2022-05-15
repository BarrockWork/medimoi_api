/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('./../../models');
const { createSlug } = require('./../../utils/requestHandler')
const {testMaxLength} = require('./../../utils/testHandler')
const {testUniqueness} = require("../../utils/testHandler");

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialise a DiseaseType object
const DiseaseTypeDefault = {
    name: 'DiseaseType Unitaire Test',
    nameSlug: createSlug('DiseaseType Unitaire Test'),
    description: 'ceci est une description',
}

/*
 * Init the DiseaseType test group
 */
describe("Company unit testing", () => {
    testMaxLength('DiseaseType', DiseaseTypeDefault, 'name', 100);
    testUniqueness('DiseaseType', DiseaseTypeDefault, 'nameSlug');
})