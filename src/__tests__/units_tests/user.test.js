/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('../../models');
const { createSlug } = require('../../utils/requestHandler');
const {
  testMaxLength,
  testUniquenessWithDependency,
} = require('../../utils/testHandler');

// Disconnect prisma after all of the tests
afterAll(async () => {
  await Models.$disconnect();
  await Models.User.deleteMany({});
});

const userTypeDefault = {
  name: 'User type',
  nameSlug: createSlug('User type'),
};
// Initialize a user object
const userDefault = {
  firstName: 'john',
  lastName: 'doe',
  age: 30,
  email: 'jdoe@medimoi.com',
  password: 'password',
  cellphone: '0123456789',
  homephone: '0123456789',
  role: 'user',
  user_type_id: 1,
};

/*
 * Init the user test group
 */
describe('User unit testing', () => {
  testMaxLength('User', userDefault, 'firstName', 50);
  testMaxLength('User', userDefault, 'lastName', 50);
  testMaxLength('User', userDefault, 'email', 50);
  testMaxLength('User', userDefault, 'password', 255);
  testMaxLength('User', userDefault, 'cellphone', 50);
  testMaxLength('User', userDefault, 'homephone', 50);
  testUniquenessWithDependency(
    'UserType',
    'User',
    userTypeDefault,
    userDefault,
    'email'
  );
});
