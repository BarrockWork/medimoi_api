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

// Initialise a Disease object
const DiseaseDefault = {
    name: 'Disease Test',
    nameSlug: createSlug('Disease Test'),
    description: 'ceci est une description',
    incubationPeriod: 'ceci est une incubation',
    transmitting: 'transmission',
    disease_type_id: 3,
}

/*
 * Init the Disease test group
 */
describe("Disease unit testing", () => {
    testMaxLength('Disease', DiseaseDefault, 'name', 255);
    testMaxLength('Disease', DiseaseDefault, 'transmitting', 255);
    testUniqueness('Disease', DiseaseDefault, 'nameSlug');
})