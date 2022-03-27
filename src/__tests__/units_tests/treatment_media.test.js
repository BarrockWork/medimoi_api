/**
 * Link for the errors reference of prisma:
 * - https://www.prisma.io/docs/reference/api-reference/error-reference
*/

const Models = require('../../models');
const { testMaxLength } = require('../../utils/testHandler');

//disconnect client after all of the tests
afterAll(async () => {
    await Models.$disconnect();
});

//initialise a default object
const treatmentMediaDefault = {
    name: 'Treatment Media',
    treatment_id: 1,
    mimeType: 'image/jpeg'
};

/*  Init the treatment_media test group */
describe("treatment_media unit testing", () => {
    testMaxLength('TreatmentMedia', treatmentMediaDefault, 'name', 255);
    testMaxLength('TreatmentMedia', treatmentMediaDefault, 'mimeType', 50);
});