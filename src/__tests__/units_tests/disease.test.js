/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('./../../models');
const {createSlug} = require('./../../utils/requestHandler')
const {testMaxLength, testUniqueness} = require('./../../utils/testHandler')

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialise a Disease object
const DiseaseDefault = {
    name: 'Disease Unit Test',
    nameSlug: createSlug('Disease Unit Test'),
    description: 'ceci est une description unitaire',
    incubationPeriod: 'ceci est une incubation unitaire',
    transmitting: 'transmission',
    disease_type_id: 2,
}

/*
 * Init the Disease test group
 */
describe("Disease unit testing", () => {
    testMaxLength('Disease', DiseaseDefault, 'name', 255);
    testMaxLength('Disease', DiseaseDefault, 'transmitting', 255);
    testUniqueness('Disease', DiseaseDefault, 'nameSlug');
})