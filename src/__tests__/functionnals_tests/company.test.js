/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('./../../models');
const { createSlug } = require('./../../utils/requestHandler')
const {testMaxLength} = require('./../../utils/testHandler')

// jest.mock('@prisma/client', () => {
//     return {
//         PrismaClient: function() {
//             return {
//                 performance: {
//                     create: jest.fn()
//                 },
//             };
//         },
//     };
// })


// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialise a company object
const companyDefault = {
    name: 'Test',
    nameSlug: createSlug('Test'),
    siret: '123456789',
    tva: 'FR123456789'
}

/*
 * Init the company test group
 */
describe("Company unit testing", () => {
    testMaxLength('Company', companyDefault, 'name', 50);
    testMaxLength('Company', companyDefault, 'siret', 50);
    testMaxLength('Company', companyDefault, 'tva', 50);
})