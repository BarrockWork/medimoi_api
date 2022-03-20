/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('./../../models');
const { createSlug } = require('./../../utils/requestHandler');
const { testMaxLength } = require('./../../utils/testHandler');

// Disconnect prisma after all of the tests
afterAll(async () => {
  await Models.$disconnect();
});

// Initialize a address_road_type object
const addressRoadTypeDefault = {
  name: 'Address road type',
  nameSlug: createSlug('Address road type'),
};

/*
 * Init the address_road_type test group
 */
describe('Address_road_type unit testing', () => {
  testMaxLength('AddressRoadType', addressRoadTypeDefault, 'name', 50);
});
