/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('./../../models');
const { createSlug } = require('./../../utils/requestHandler');
const { testMaxLength, testUniqueness } = require('./../../utils/testHandler');

// Disconnect prisma after all of the tests
afterAll(async () => {
  await Models.$disconnect();
});

// Initialize a user_type object
const userTypeDefault = {
  name: 'User type',
  nameSlug: createSlug('User type'),
};

/*
 * Init the user_type test group
 */
describe('User_type unit testing', () => {
  testMaxLength('ContactType', userTypeDefault, 'name', 50);
  testUniqueness('ContactType', userTypeDefault, 'nameSlug');
});
