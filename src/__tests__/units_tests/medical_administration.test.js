/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const Models = require('../../models');
const { createSlug } = require('../../utils/requestHandler')
const {testMaxLength, testUniqueness} = require('../../utils/testHandler')

// disconnect client after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// create a default object
const medicalAdministrationDefault = {
    name: 'Medical Administration',
    nameSlug: createSlug('Medical Administration'),
};

describe('medical_administration unit testing', () => {
    testMaxLength('MedicalAdministration', medicalAdministrationDefault, 'name', 255);
    testUniqueness('MedicalAdministration', medicalAdministrationDefault, 'nameSlug');
});