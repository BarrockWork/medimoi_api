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

// Initialise a contact_type object
const contactTypeDefault = {
    name: 'Contact type',
    nameSlug: createSlug('Contact type'),
}

/*
 * Init the company test group
 */
describe("Contact_type unit testing", () => {
    testMaxLength('ContactType', contactTypeDefault, 'name', 50);
    testUniqueness('ContactType', contactTypeDefault, 'nameSlug');
})