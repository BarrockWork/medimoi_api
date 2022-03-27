/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require('./../server_test');
const Models = require('./../../models');
const R = require('ramda');

// Delete all record before starting the tests
beforeAll(async () => {
  await Models.UserType.deleteMany({});
});

// Disconnect prisma after all of the tests
afterAll(async () => {
  await Models.$disconnect();
});

// Initialize express server
const appTest = createServerTest();

// Initialise a list of user_type object
const schemaObject = [
  {
    name: 'User Type Test',
  },
  {
    name: 'User Type Test 2 medimoi',
  },
  {
    name: 'User Type Test 3 medimoi',
  },
];

/*
 * Init the User Type test group
 */
describe('user_type functional testing', () => {
  test('POST - /api/user_type/new', async () => {
    // Clone the schemaObject[0] in order to avoid to modify the original
    let cloneSchemaObject = R.clone(schemaObject[0]);

    await supertest(appTest)
      .post('/api/user_type/new/')
      .send(cloneSchemaObject)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.nameSlug).toBe('user-type-test');

        // Check the data in the database
        const user_type = await Models.UserType.findUnique({
          where: {
            nameSlug: 'user-type-test',
          },
        });
        expect(user_type).toBeTruthy();
        expect(user_type.nameSlug).toBe('user-type-test');
      });
  });

  test('POST - /api/user_type/news', async () => {
    // Clone the schemaObjects in order to avoid to modify the original
    let cloneSchemaObjects = {
      entries: [R.clone(schemaObject[1]), R.clone(schemaObject[2])],
    };
    await supertest(appTest)
      .post('/api/user_type/news')
      .send(cloneSchemaObjects)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.count).toEqual(2);

        // Check the data in the database
        const user_types = await Models.UserType.findMany({
          where: {
            nameSlug: {
              contains: 'medimoi',
            },
          },
        });
        expect(user_types).toHaveLength(2);
      });
  });

  test('GET - /api/user_type/:nameSlug', async () => {
    // Clone the schemaObjects in order to avoid to modify the original
    await supertest(appTest)
      .get('/api/user_type/user-type-test')
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.nameSlug).toBe('user-type-test');
      });
  });

  test('GET - /api/user_type/', async () => {
    // Clone the schemaObjects in order to avoid to modify the original
    await supertest(appTest)
      .get('/api/user_type/')
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.length).toBeGreaterThan(1);
      });
  });

  test('PUT - /api/user_type/:nameSlug/edit', async () => {
    // Clone the schemaObject in order to avoid to modify the original
    let cloneSchemaObject = R.clone(schemaObject[0]);
    cloneSchemaObject.name = 'user_type Edition';

    await supertest(appTest)
      .put('/api/user_type/user-type-test/edit')
      .send(cloneSchemaObject)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.nameSlug).toBe('user_type-edition');

        // Check the data in the database
        const user_type = await Models.UserType.findUnique({
          where: {
            nameSlug: 'user_type-edition',
          },
        });
        expect(user_type.nameSlug).toBe('user_type-edition');
      });
  });

  test('DELETE - /api/user_type/:nameSlug/delete', async () => {
    await supertest(appTest)
      .delete('/api/user_type/user-type-test-2-medimoi/delete')
      .expect(200)
      .then(async (response) => {
        // Check the response (prisma return the deleted object datas
        expect(response.body.nameSlug).toBe('user-type-test-2-medimoi');

        // Check the data in the database
        const user_type = await Models.UserType.findUnique({
          where: {
            nameSlug: 'user-type-test-2-medimoi',
          },
        });
        expect(user_type).toBeNull();
      });
  });
});
