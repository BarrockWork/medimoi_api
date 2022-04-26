/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('./../../models');
const { createSlug } = require('./../../utils/requestHandler');
const { testMaxLength, testUniqueness } = require('./../../utils/testHandler');

// Disconnect prisma after all of the tests
afterAll(async () => {
  await Models.UserType.deleteMany({
    where: {
      nameSlug: 'user-type-for-unit-test',
    },
  });
  await Models.$disconnect();
});

// Initialise a user_Type object
const userTypeDefault = {
  name: 'user type for unit test',
  nameSlug: createSlug('user type for unit test'),
};

/*
 * Init the company test group
 */
describe('User_Type unit testing', () => {
  testMaxLength('UserType', userTypeDefault, 'name', 50);
  testUniqueness('UserType', userTypeDefault, 'nameSlug');
});
