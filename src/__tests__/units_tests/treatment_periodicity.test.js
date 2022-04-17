/**
 * Link for the errors reference of prisma:
 * - https://www.prisma.io/docs/reference/api-reference/error-reference
*/

const Models = require('../../models');
const { createSlug } = require('../../utils/requestHandler');
const { testMaxLength, testUniqueness } = require('../../utils/testHandler');

// disconnect client after all of the tests
afterAll(async () => {
    await Models.$disconnect();
});

// create a default object
const treatmentPeriodicityDefault = {
    name: 'Treatment Periodicity',
    nameSlug: createSlug('Treatment Periodicity'),
};

/*  Init the treatment_periodicity test group */
describe("treatment_periodicity unit testing", () => {
    testMaxLength('TreatmentPeriodicity', treatmentPeriodicityDefault, 'name', 255);
    testUniqueness('TreatmentPeriodicity', treatmentPeriodicityDefault, 'nameSlug');
});