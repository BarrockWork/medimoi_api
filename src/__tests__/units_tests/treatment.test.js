/**
 * Link for the errors reference of prisma:
 * - https://www.prisma.io/docs/reference/api-reference/error-reference
*/

const Models = require('../../models');
const { testMaxLength} = require('../../utils/testHandler');

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
});

// create a default object
const treatment = {
    name: 'Treatment',
    treatment_periodicity_id: 1,
    user_id: 1
};


/*  Init the treatment test group */
describe("treatment unit testing", () => {
    testMaxLength('Treatment', treatment, 'name', 255);
});
