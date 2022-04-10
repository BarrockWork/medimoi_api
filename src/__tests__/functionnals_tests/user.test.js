/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require('./../server_test');
const Models = require('./../../models');
const R = require('ramda');
const {
  UserSchemaObject,
  UserTypeSchemaObject,
} = require('./../objectSchema_test');
const { createSlug } = require('./../../utils/requestHandler');

// Delete all record before starting the tests
beforeAll(async () => {
  await Models.User.deleteMany({});
  await Models.UserType.deleteMany({
    where: {
      nameSlug: {
        contains: 'user-type-test',
      },
    },
  });
});

// Disconnect prisma after all of the tests
afterAll(async () => {
  await Models.User.deleteMany({});
  await Models.UserType.deleteMany({
    where: {
      nameSlug: {
        contains: 'user-type-test',
      },
    },
  });
  await Models.$disconnect();
});

// Initialize express server
const appTest = createServerTest();

//Initialize User Type Creation
let createType = UserTypeSchemaObject[0];
createType.nameSlug = createSlug(createType.name);
const userType = Models.UserType.create({
  data: createType,
});
/*
 * Init the User Type test group
 */
describe('user functional testing', () => {
  test('POST - /api/users/new', async () => {
    createType.nameSlug = createSlug(createType.name);
    const newUserType = await userType;

    // Clone the schemaObject[0] in order to avoid to modify the original
    let cloneSchemaObject = R.clone(UserSchemaObject[0]);
    cloneSchemaObject.user_type_id = newUserType.id;

    await supertest(appTest)
      .post('/api/users/new/')
      .send(cloneSchemaObject)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.newUser.email).toBe('jd@medimoi.com');

        // Check the data in the database
        const user = await Models.User.findUnique({
          where: {
            email: 'jd@medimoi.com',
          },
        });
        expect(user).toBeTruthy();
        expect(user.email).toBe('jd@medimoi.com');
      });
  });

  test('POST - /api/users/news', async () => {
    // Clone the schemaObjects in order to avoid to modify the original
    let cloneSchemaObjects = {
      entries: [R.clone(UserSchemaObject[1]), R.clone(UserSchemaObject[2])],
    };

    //create a new user type for creating a User
    const userType = await Models.UserType.findUnique({
      where: {
        nameSlug: 'user-type-test',
      },
    });

    cloneSchemaObjects.entries.forEach((entry) => {
      entry.user_type_id = userType.id;
    });

    await supertest(appTest)
      .post('/api/users/news')
      .send(cloneSchemaObjects)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.count).toBe(2);

        // Check the data in the database
        const users = await Models.User.findMany({
          where: {
            firstName: {
              contains: 'john',
            },
          },
        });
        expect(users).toHaveLength(3);
      });
  });

  test('GET - /api/users/:email', async () => {
    // Clone the schemaObjects in order to avoid to modify the original
    await supertest(appTest)
      .get('/api/users/jd@medimoi.com')
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body[0].email).toBe('jd@medimoi.com');
      });
  });

  test('GET - /api/users/', async () => {
    // Clone the schemaObjects in order to avoid to modify the original
    await supertest(appTest)
      .get('/api/users/')
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.length).toBeGreaterThan(1);
      });
  });

  test('PUT - /api/users/:email/edit', async () => {
    // Clone the schemaObject in order to avoid to modify the original
    let cloneSchemaObject = R.clone(UserSchemaObject[0]);
    cloneSchemaObject.firstName = 'johnnie';

    const userType = await Models.UserType.findUnique({
      where: {
        nameSlug: 'user-type-test',
      },
    });

    cloneSchemaObject.user_type_id = userType.id;

    await supertest(appTest)
      .put('/api/users/jd@medimoi.com/edit')
      .send(cloneSchemaObject)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.firstName).toBe('johnnie');

        // Check the data in the database
        const user = await Models.User.findUnique({
          where: {
            email: 'jd@medimoi.com',
          },
        });
        expect(user.firstName).toBe('johnnie');
      });
  });

  test('DELETE - /api/users/:email/delete', async () => {
    await supertest(appTest)
      .delete('/api/users/jdoeeee@medimoi.com/delete')
      .expect(200)
      .then(async (response) => {
        // Check the response (prisma return the deleted object datas
        expect(response.body.email).toBe('jdoeeee@medimoi.com');

        // Check the data in the database
        const user = await Models.User.findUnique({
          where: {
            email: 'jdoeeee@medimoi.com',
          },
        });
        expect(user).toBeNull();
      });
  });
});
