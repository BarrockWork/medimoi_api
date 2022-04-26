/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('./../../models');
const { testMaxLength } = require('./../../utils/testHandler');

// Disconnect prisma after all of the tests
afterAll(async () => {
  await Models.Address.deleteMany({});
  await Models.$disconnect();
});

// Initialize an address object
const addressDefault = {
  numberRoad: 1,
  streetName: 'madame',
  user_id: 1,
  address_road_type_id: 1,
  zipcode: '12345',
  city: 'bouillante',
  region: 'test',
  country: 'France',
  title: 'PC',
};

/*
 * Init the Address test group
 */
describe('Address_type unit testing', () => {
  testMaxLength('Address', addressDefault, 'streetName', 50);
  testMaxLength('Address', addressDefault, 'zipcode', 50);
  testMaxLength('Address', addressDefault, 'city', 50);
  testMaxLength('Address', addressDefault, 'region', 255);
  testMaxLength('Address', addressDefault, 'country', 50);
  testMaxLength('Address', addressDefault, 'title', 50);
});
