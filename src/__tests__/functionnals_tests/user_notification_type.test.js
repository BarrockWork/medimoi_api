/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require('./../server_test');
const Models = require('./../../models');
const { createSlug } = require('./../../utils/requestHandler');

//Initialize Dependency for user_notification_type Creation
var createType = {
  name: 'UNT Func Test',
};
createType.nameSlug = createSlug(createType.name);

var createNotifType = [
  {
    name: 'UNT Func Test',
  },
  {
    name: 'UNT Func Test 2',
  },
];
createNotifType.forEach((item) => {
  item.nameSlug = createSlug(item.name);
});
var createUser = {
  firstName: 'user',
  lastName: 'test',
  age: 30,
  email: 'futest@medimoi.com',
  password: 'password',
  cellphone: '0123456789',
  homephone: '0123456789',
  role: 'user',
};

// Delete all record before starting the tests
beforeAll(async () => {});

// Disconnect prisma after all of the tests
afterAll(async () => {
  await Models.NotificationType.deleteMany({
    where: {
      nameSlug: { contains: 'unt-func-test' },
    },
  });
  await Models.User.delete({
    where: {
      email: 'futest@medimoi.com',
    },
  });
  await Models.UserType.deleteMany({
    where: {
      nameSlug: 'unt-func-test',
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

// Initialize User Creation
const UserCreation = Models.User.create({
  data: createUser,
});

// Initialize User Notification Type Creation
const NTCreation = (test) => {
  return Models.NotificationType.create({
    data: test,
  });
};
var ID = null;
/*
 * Init the User Type test group
 */
describe('user_notification_type functional testing', () => {
  test('POST - /api/user_notification_type/new', async () => {
    // Clone the schemaObject[0] in order to avoid to modify the original
    let cloneSchemaObject = {};
    const newUserType = await userTypeCreation;
    createUser.user_type_id = newUserType.id;
    const newUser = await UserCreation;
    const newNT = await NTCreation(createNotifType[0]);
    cloneSchemaObject.user_id = newUser.id;
    cloneSchemaObject.notification_type_id = newNT.id;
    await supertest(appTest)
      .post('/api/user_notification_type/new/')
      .send(cloneSchemaObject)
      .expect(200)
      .then(async (response) => {
        ID = response.body.id;
      });
  });

  test('GET - /api/user_notification_type/', async () => {
    // Clone the schemaObjects in order to avoid to modify the original
    await supertest(appTest)
      .get('/api/user_notification_type/')
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.length).toBeGreaterThanOrEqual(1);
      });
  });

  test('PUT - /api/user_notification_type/:id/edit', async () => {
    // Clone the schemaObject in order to avoid to modify the original
    const newNT = await NTCreation(createNotifType[1]);
    const GetUserUNT = await Models.User.findFirst({
      where: {
        email: 'futest@medimoi.com',
      },
    });
    const newObject = {
      notification_type_id: newNT.id,
      user_id: GetUserUNT.id,
    };

    await supertest(appTest)
      .put(`/api/user_notification_type/${ID}/edit`)
      .send(newObject)
      .expect(200);
  });

  test('DELETE - /api/user_notification_type/:email/delete', async () => {
    await supertest(appTest)
      .delete(`/api/user_notification_type/${ID}/delete`)
      .expect(200);
  });
});
