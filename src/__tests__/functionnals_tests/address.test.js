/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require('./../server_test');
const Models = require('./../../models');
const R = require('ramda');
const { AddressSchemaObject } = require('./../objectSchema_test');
const { createSlug } = require('./../../utils/requestHandler');

//Initialize Dependency for Address Creation
var createAddressRT = {
  name: 'Address Func Test',
};
createAddressRT.nameSlug = createSlug(createAddressRT.name);
var createType = {
  name: 'Address Func Test',
};
createType.nameSlug = createSlug(createType.name);
var createUser = {
  firstName: 'john',
  lastName: 'test',
  age: 30,
  email: 'jtest@medimoi.com',
  password: 'password',
  cellphone: '0123456789',
  homephone: '0123456789',
  role: 'user',
};

// Delete all record before starting the tests
beforeAll(async () => {
  await Models.Address.deleteMany({});
  await Models.AddressRoadType.deleteMany({
    where: {
      nameSlug: {
        contains: 'address-func-test',
      },
    },
  });
  await Models.User.deleteMany({
    where: {
      email: {
        contains: 'jtest@medimoi.com',
      },
    },
  });
  await Models.UserType.deleteMany({
    where: {
      nameSlug: {
        contains: 'address-func-test',
      },
    },
  });
});

// Disconnect prisma after all of the tests
afterAll(async () => {
  await Models.Address.deleteMany({});
  await Models.AddressRoadType.delete({
    where: {
      nameSlug: 'address-func-test',
    },
  });
  await Models.User.delete({
    where: {
      email: 'jtest@medimoi.com',
    },
  });
  await Models.UserType.delete({
    where: {
      nameSlug: 'address-func-test',
    },
  });
  await Models.$disconnect();
});

// Initialize express server
const appTest = createServerTest();

//Initialize User Type Creation
const userTypeCreation = Models.UserType.create({
  data: createType,
});

//Initialize Address Road Type Creation
const ARTCreation = Models.AddressRoadType.create({
  data: createAddressRT,
});

// Initialize User Creation

const UserCreation = Models.User.create({
  data: createUser,
});

/*
 * Init the User Type test group
 */
describe('Address functional testing', () => {
  test('POST - /api/address/new', async () => {
    // Clone the schemaObject[0] in order to avoid to modify the original
    let cloneSchemaObject = R.clone(AddressSchemaObject);
    const newUserType = await userTypeCreation;
    createUser.user_type_id = newUserType.id;
    const newUser = await UserCreation;
    const newART = await ARTCreation;
    cloneSchemaObject.user_id = newUser.id;
    cloneSchemaObject.address_road_type_id = newART.id;

    await supertest(appTest)
      .post('/api/address/new/')
      .send(cloneSchemaObject)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.country).toBe('France');

        // Check the data in the database
        const address = await Models.Address.findFirst({
          where: {
            country: 'France',
          },
        });
        expect(address).toBeTruthy();
        expect(address.streetName).toBe('madame');
      });
  });

  test('GET - /api/address/:id', async () => {
    // get the actual Id of the address in case if we run many tests
    const address = await Models.Address.findFirst({
      where: {
        country: 'France',
      },
    });
    const id = address.id;

    await supertest(appTest)
      .get(`/api/address/${id}`)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.country).toBe('France');
      });
  });

  test('GET - /api/address/', async () => {
    // Clone the schemaObjects in order to avoid to modify the original
    await supertest(appTest)
      .get('/api/address/')
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.length).toBe(1);
      });
  });

  test('PUT - /api/address/:id/edit', async () => {
    // Clone the schemaObject in order to avoid to modify the original
    let cloneSchemaObject = R.clone(AddressSchemaObject);
    cloneSchemaObject.country = 'Madagascar';

    const address = await Models.Address.findFirst({
      where: {
        country: 'France',
      },
    });
    const id = address.id;

    await supertest(appTest)
      .put(`/api/address/${id}/edit`)
      .send(cloneSchemaObject)
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.country).toBe('Madagascar');

        // Check the data in the database
        const testAddress = await Models.Address.findFirst({
          where: {
            country: 'Madagascar',
          },
        });
        expect(testAddress.country).toBe('Madagascar');
      });
  });

  test('DELETE - /api/user_type/:email/delete', async () => {
    const address = await Models.Address.findFirst({
      where: {
        country: 'Madagascar',
      },
    });
    const id = address.id;

    await supertest(appTest)
      .delete(`/api/address/${id}/delete`)
      .expect(200)
      .then(async (response) => {
        // Check the response (prisma return the deleted object datas
        expect(response.body.country).toBe('Madagascar');

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
