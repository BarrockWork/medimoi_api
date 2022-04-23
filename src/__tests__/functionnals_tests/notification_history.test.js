/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require('../server_test');
const Models = require('../../models');
const { createSlug } = require('../../utils/requestHandler');

//Initialize Dependency for notification_history Creation
var createNotifType = [
  {
    name: 'NH Func Test',
  },
  {
    name: 'NH Func Test 2',
  },
];

createNotifType.forEach((item) => {
  item.nameSlug = createSlug(item.name);
});

var createType = {
  name: 'NH Func Test',
};
createType.nameSlug = createSlug(createType.name);

var createUser = {
  firstName: 'user',
  lastName: 'test',
  age: 30,
  email: 'nhtest@medimoi.com',
  password: 'password',
  cellphone: '0123456789',
  homephone: '0123456789',
  role: 'user',
};

// Delete all record before starting the tests
beforeAll(async () => {});

// Disconnect prisma after all of the tests
afterAll(async () => {
  await Models.NotificationHistory.deleteMany({});
  await Models.UserNotificationType.deleteMany({
    where: {
      id: {
        in: [UNT1, UNT2],
      },
    },
  });
  await Models.NotificationType.deleteMany({
    where: {
      nameSlug: { contains: 'nh-func-test' },
    },
  });
  await Models.User.delete({
    where: {
      email: 'nhtest@medimoi.com',
    },
  });
  await Models.UserType.deleteMany({
    where: {
      nameSlug: 'nh-func-test',
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

const NTCreation = (test) => {
  return Models.notificationType.create({
    data: test,
  });
};
var cloneSchemaObject = {};
var UNT1 = null;
var UNT2 = null;

/*
 ** Init the User Type test group
 */
describe('notification_history functional testing', () => {
  test('POST - /api/notification_history/new', async () => {
    // Clone the schemaObject[0] in order to avoid to modify the original

    const newUserType = await userTypeCreation;
    createUser.user_type_id = newUserType.id;
    const newUser = await UserCreation;
    const newNT = await NTCreation(createNotifType[0]);
    cloneSchemaObject.user_id = newUser.id;
    cloneSchemaObject.notification_type_id = newNT.id;

    const UNTCreation = await Models.UserNotificationType.create({
      data: cloneSchemaObject,
    });
    UNT1 = UNTCreation.id;
    let NHObject = {};
    NHObject.user_notification_type_id = UNT1;

    await supertest(appTest)
      .post('/api/notification_history/new/')
      .send(NHObject)
      .expect(200);
  });

  test('GET - /api/notification_history/', async () => {
    // Clone the schemaObjects in order to avoid to modify the original
    await supertest(appTest)
      .get('/api/notification_history/')
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.length).toBe(1);
      });
  });

  test('PUT - /api/notification_history/:id/edit', async () => {
    // Clone the schemaObject in order to avoid to modify the original
    await NTCreation(createNotifType[1]);

    // NHObject.user_notification_type_id = UNTCreation.id;
    const UGet = await Models.User.findUnique({
      where: {
        email: 'nhtest@medimoi.com',
      },
    });
    const NTGet = await Models.NotificationType.findUnique({
      where: {
        nameSlug: 'nh-func-test',
      },
    });
    cloneSchemaObject.user_id = UGet.id;
    cloneSchemaObject.notification_type_id = NTGet.id;
    const UNTCreation = await Models.UserNotificationType.create({
      data: cloneSchemaObject,
    });
    UNT2 = UNTCreation.id;

    let NHObject = {};
    NHObject.user_notification_type_id = UNTCreation.id;
    const notification_history = await Models.NotificationHistory.findMany({});
    const id = notification_history[0].id;
    await supertest(appTest)
      .put(`/api/notification_history/${id}/edit`)
      .send(NHObject)
      .expect(200);
  });

  test('DELETE - /api/notification_history/:id/delete', async () => {
    const notification_history = await Models.NotificationHistory.findMany({});
    const DeleteId = notification_history[0].id;

    await supertest(appTest)
      .delete(`/api/notification_history/${DeleteId}/delete`)
      .expect(200);
  });
});
