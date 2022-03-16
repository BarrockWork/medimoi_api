/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('./../../models');
const { createSlug } = require('./../../utils/requestHandler')
const {testMaxLength} = require('./../../utils/testHandler')

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
    testMaxLength(companyDefault, 'name', 50);
    testMaxLength(companyDefault, 'siret', 50);
    testMaxLength(companyDefault, 'tva', 50);

    test('Check nameSlug is unique', async () => {
        // In order to check the assertions with async/await
        expect.assertions(1);
        try{
            let fieldValue = '';
            for(let i = 0; i <= maxLength; i++) {
                fieldValue += i.toString()
            }
            schemaObject[field]  = fieldValue;

            await Models.Company.create({
                data: schemaObject
            })
        } catch(e) {
            // e = PrismaClientKnownRequestError
            expect(e.code).toEqual('P2000');
        }
    })
})