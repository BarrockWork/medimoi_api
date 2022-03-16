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

// Initialise a Contact object
const contactDefault = {
    firstName: 'Test',
    lastName: createSlug('Test'),
    phoneNumber: '123456789',
    contact_type_id: 1,
    user_id: 2
}

/*
 * Init the contact test group
 */
describe("Company unit testing", () => {
    testMaxLength('Contact', contactDefault, 'firstName', 50);
    testMaxLength('Contact', contactDefault, 'lastName', 50);
    testMaxLength('Contact', contactDefault, 'phoneNumber', 50);
})