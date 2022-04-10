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

var createNotifType = {
  name: 'UNT Func Test',
};
createNotifType.nameSlug = createSlug(createNotifType.name);

var createUser = {
  firstName: 'user',
  lastName: 'test',
  age: 30,
  email: 'utest@medimoi.com',
  password: 'password',
  cellphone: '0123456789',
  homephone: '0123456789',
  role: 'user',
};

// Delete all record before starting the tests
beforeAll(async () => {
  // await Models.user_notification_type.deleteMany({});
  // await Models.User.deleteMany({
  //   where: {
  //     email: {
  //       contains: 'utest@medimoi.com',
  //     },
  //   },
  // });
  // await Models.UserType.deleteMany({
  //   where: {
  //     nameSlug: {
  //       contains: 'user_notification_type-func-test',
  //     },
  //   },
  // });
});

// Disconnect prisma after all of the tests
afterAll(async () => {
  await Models.NotificationHistory.deleteMany({});
  await Models.UserNotificationType.deleteMany({});
  await Models.User.delete({
    where: {
      email: 'utest@medimoi.com',
    },
  });
  await Models.UserType.delete({
    where: {
      nameSlug: 'UNT-func-test',
    },
  });
  await Models.NotificationType.delete({
    where: {
      nameSlug: 'UNT-func-test',
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

const NTCreation = Models.NotificationType.create({
  data: createNotifType,
});

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
    const newNT = await NTCreation;
    cloneSchemaObject.user_id = newUser.id;
    cloneSchemaObject.notification_type_id = newNT.id;

    await supertest(appTest)
      .post('/api/user_notification_type/new/')
      .send(cloneSchemaObject)
      .expect(200);
  });

  test('GET - /api/user_notification_type/', async () => {
    // Clone the schemaObjects in order to avoid to modify the original
    await supertest(appTest)
      .get('/api/user_notification_type/')
      .expect(200)
      .then(async (response) => {
        // Check the response
        expect(response.body.length).toBe(1);
      });
  });

  // test('PUT - /api/user_notification_type/:id/edit', async () => {
  //   // Clone the schemaObject in order to avoid to modify the original
  //   let cloneSchemaObject = R.clone(user_notification_typeSchemaObject);
  //   cloneSchemaObject.country = 'Madagascar';

  //   const user_notification_type = await Models.user_notification_type.findFirst({
  //     where: {
  //       country: 'France',
  //     },
  //   });
  //   const id = user_notification_type.id;

  //   await supertest(appTest)
  //     .put(`/api/user_notification_type/${id}/edit`)
  //     .send(cloneSchemaObject)
  //     .expect(200)
  //     .then(async (response) => {
  //       // Check the response
  //       expect(response.body.country).toBe('Madagascar');

  //       // Check the data in the database
  //       const testuser_notification_type = await Models.user_notification_type.findFirst({
  //         where: {
  //           country: 'Madagascar',
  //         },
  //       });
  //       expect(testuser_notification_type.country).toBe('Madagascar');
  //     });
  // });

  // test('DELETE - /api/user_type/:email/delete', async () => {
  //   const user_notification_type = await Models.user_notification_type.findMany(
  //     {
  //       orderBy: {
  //         id: 'asc',
  //       },
  //     }
  //   );
  //   const id = user_notification_type.id;

  //   console.log(user_notification_type);

  //   await supertest(appTest)
  //     .delete(`/api/user_notification_type/${id}/delete`)
  //     .expect(200)
  //     .then(async (response) => {
  //       // Check the response (prisma return the deleted object datas
  //       expect(response.body.country).toBe('Madagascar');

  //       // Check the data in the database
  //       const user = await Models.User.findUnique({
  //         where: {
  //           email: 'jdoeeee@medimoi.com',
  //         },
  //       });
  //       expect(user).toBeNull();
  //     });
  // });
});
