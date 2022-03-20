/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('./../../models');
const { createSlug } = require('./../../utils/requestHandler')
const {testMaxLength, testUniqueness} = require('./../../utils/testHandler')

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialise a NotificationType object
const notificationTypeDefault = {
    name: 'Notif type',
    nameSlug: createSlug('Notif type'),
}

/*
 * Init the NotificationType test group
 */
describe("NotificationType unit testing", () => {
    testMaxLength('NotificationType', notificationTypeDefault, 'name', 50);
    testUniqueness('NotificationType', notificationTypeDefault, 'nameSlug');

})