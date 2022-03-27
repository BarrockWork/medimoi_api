/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require('./../server_test');
const Models = require('./../../models');
const R = require('ramda');
const { AddressRoadTypeSchemaObject } = require('../objectSchema_test');

// Delete all record before starting the tests
beforeAll(async () => {
  await Models.AddressRoadType.deleteMany({});
});

// Disconnect prisma after all of the tests
afterAll(async () => {
  await Models.$disconnect();
});

// Initialize express server
const appTest = createServerTest();

/*
 * Init the Address Road Type group
 */
describe('address_road_type functional testing', () => {
  test('POST - /api/address_road_type/new', async () => {
    // Clone the schemaObject in order to avoid to modify the original
    let cloneSchemaObject = R.clone(AddressRoadTypeSchemaObject);

    await supertest(appTest)
      .post('/api/address_road_type/new/')
      .send(cloneSchemaObject)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.nameSlug).toBe('address-road-type-test');

        // Check the data in the database
        const address_road_type = await Models.AddressRoadType.findUnique({
          where: {
            nameSlug: 'address-road-type-test',
          },
        });
        expect(address_road_type).toBeTruthy();
        expect(address_road_type.nameSlug).toBe('address-road-type-test');
      });
  });

  test('GET - /api/address_road_type/:nameSlug', async () => {
    // Clone the schemaObjects in order to avoid to modify the original
    await supertest(appTest)
      .get('/api/address_road_type/address-road-type-test')
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.nameSlug).toBe('address-road-type-test');
      });
  });

  test('GET - /api/address_road_type/', async () => {
    // Clone the schemaObjects in order to avoid to modify the original
    await supertest(appTest)
      .get('/api/address_road_type/')
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.length).toBe(1);
      });
  });

  test('PUT - /api/address_road_type/:nameSlug/edit', async () => {
    // Clone the schemaObject in order to avoid to modify the original
    let cloneSchemaObject = R.clone(AddressRoadTypeSchemaObject);
    cloneSchemaObject.name = 'address_road_type Edition';

    await supertest(appTest)
      .put('/api/address_road_type/address-road-type-test/edit')
      .send(cloneSchemaObject)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.nameSlug).toBe('address_road_type-edition');

        // Check the data in the database
        const address_road_type = await Models.AddressRoadType.findUnique({
          where: {
            nameSlug: 'address_road_type-edition',
          },
        });
        expect(address_road_type.nameSlug).toBe('address_road_type-edition');
      });
  });

  test('DELETE - /api/address_road_type/:nameSlug/delete', async () => {
    await supertest(appTest)
      .delete('/api/address_road_type/address_road_type-edition/delete')
      .expect(200)
      .then(async (response) => {
        // Check the response (prisma return the deleted object datas
        expect(response.body.nameSlug).toBe('address_road_type-edition');

        // Check the data in the database
        const address_road_type = await Models.AddressRoadType.findUnique({
          where: {
            nameSlug: 'address_road_type-edition',
          },
        });
        expect(address_road_type).toBeNull();
      });
  });
});
