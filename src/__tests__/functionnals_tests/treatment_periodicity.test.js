/**
 *  Link for the errors reference of prisma:
 * - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require("./../server_test");
const Models = require('./../../models');
const R = require('ramda');

// Delete all record before starting the tests
beforeAll( async () =>{
    await Models.treatmentPeriodicity.deleteMany({});
});

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
});

const appTest = createServerTest();

// Initialise a list of company object
const schemaObject = [
    {
        name: 'Treatment Periodicity Test Functional',
    },
    {
        name: 'Treatment Periodicity Test Functional medimoi',
    },
    {
        name: 'Treatment Periodicity Test Functional medimoi 2',
    }
];

/**
 * Init the company test group
 */
describe("Treatment Periodicity functional testing", () => {
    test('POST - /api/treatment_periodicities/new', async () => {
        // Clone the schemaObject[0]
        let cloneSchemaObject = R.clone(schemaObject[0]);
        await supertest(appTest)
        .post('/api/treatment_periodicities/new')
        .send(cloneSchemaObject)
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.nameSlug).toBe("treatment-periodicity-test-functional")

            // Check the data in the database
            const treatmentPeriodicity = await Models.treatmentPeriodicity.findUnique({
                where: {
                    nameSlug: "treatment-periodicity-test-functional"
                }
            });
            expect(treatmentPeriodicity).toBeTruthy();
            expect(treatmentPeriodicity.name).toBe("Treatment Periodicity Test Functional");
        });
    });

    test('POST - /api/treatment_periodicities/news', async () => {
        // Clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        const req = await supertest(appTest)
        .post('/api/treatment_periodicities/news')
        .send(cloneSchemaObjects)
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.count).toBe(2);

            const treatmentPeriodicities = await Models.treatmentPeriodicity.findMany({});
            expect(treatmentPeriodicities.length).toBe(3);
        })
    });

    test('GET - /api/treatment_periodicities/all', async () => {
        await supertest(appTest)
        .get('/api/treatment_periodicities/all')
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.length).toBe(3);
        });
    });

    test('GET - /api/treatment_periodicities/slug/:nameSlug', async () => {
        await supertest(appTest)
        .get('/api/treatment_periodicities/slug/treatment-periodicity-test-functional')
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.nameSlug).toBe("treatment-periodicity-test-functional")

            // Check the data in the database
            const treatmentPeriodicity = await Models.treatmentPeriodicity.findUnique({
                where: {
                    nameSlug: "treatment-periodicity-test-functional"
                }
            });
            expect(treatmentPeriodicity).toBeTruthy();
            expect(treatmentPeriodicity.name).toBe("Treatment Periodicity Test Functional");
        });
    });

    test('PUT - /api/treatment_periodicities/slug/nameSlug', async () => {
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.name = "Treatment updated";

        await supertest(appTest)
        .put('/api/treatment_periodicities/slug/treatment-periodicity-test-functional')
        .send(cloneSchemaObject)
        .expect(200)
        .then(async (response) => {
            // check the response)
            expect(response.body.name).toBe("Treatment updated");

            const treatmentPeriodicity = await Models.treatmentPeriodicity.findUnique({
                where: {
                    nameSlug: "treatment-updated"
                }
            });

            expect(treatmentPeriodicity).toBeTruthy();
            expect(treatmentPeriodicity.name).toBe("Treatment updated");
            expect(treatmentPeriodicity.nameSlug).toBe("treatment-updated");
        });
    });

    test('DELETE - /api/treatment_periodicities/slug/nameSlug', async () => {
        await supertest(appTest)
        .delete('/api/treatment_periodicities/slug/treatment-periodicity-test-functional-medimoi-2')
        .expect(200)
        .then(async () => {
            // Check the response
            const treatmentPeriodicities = await Models.treatmentPeriodicity.findMany({});
            expect(treatmentPeriodicities.length).toBe(2);
        })
    });
});