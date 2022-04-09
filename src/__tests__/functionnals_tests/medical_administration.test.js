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
    await Models.medicalAdministration.deleteMany({});
});


// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.medicalAdministration.deleteMany({});
    await Models.$disconnect();
});

const appTest = createServerTest();

// Initialise a list of company object
const schemaObject = [
    {
        name: 'Medical Administration Test Functional',
    },
    {
        name: 'Medical Administration Test Functional medimoi',
    },
    {
        name: 'Medical Administration Test Functional medimoi 2',
    }
];

/**
 * Init the company test group
 */
describe("Medical Administration functional testing", () => {
    test('POST - /api/medical_administrations/new', async () => {
        // clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        await supertest(appTest)
        .post("/api/medical_administrations/new")
        .send(cloneSchemaObject)
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.nameSlug).toBe("medical-administration-test-functional");

            // Check the data in the database
            const medicalAdministration = await Models.medicalAdministration.findUnique({
                where: {
                    nameSlug: "medical-administration-test-functional"
                }
            });
            expect(medicalAdministration).toBeTruthy();
            expect(medicalAdministration.name).toBe("Medical Administration Test Functional");
        });
    });

    test('POST - /api/medical_administrations/news', async () => {
        // clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        const req = await supertest(appTest)
        .post("/api/medical_administrations/news")
        .send(cloneSchemaObjects)
        .expect(200)
        .then(async (response) => {
            // check the response
            expect(response.body.count).toBe(2);

            const medicalAdministrations = await Models.medicalAdministration.findMany({});
            expect(medicalAdministrations.length).toBe(3);
        });
    });

    test('GET - /api/medical_administrations/slug/:nameSlug', async () => {
        await supertest(appTest)
        .get('/api/medical_administrations/slug/medical-administration-test-functional')
        .expect(200)
        .then(async (response) => {
            // check the response
            expect(response.body.name).toBe("Medical Administration Test Functional");
        });
    });

    test('GET - /api/medical_administrations/all', async () => {
        await supertest(appTest)
        .get('/api/medical_administrations/all')
        .expect(200)
        .then(async (response) => {
            // check the response
            expect(response.body.length).toBe(3);
        });
    });

    test('PUT - /api/medical_administrations/slug/nameSlug', async () => {
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.name = "Medical updated";

        await supertest(appTest)
        .put('/api/medical_administrations/slug/medical-administration-test-functional')
        .send(cloneSchemaObject)
        .expect(200)
        .then(async (response) => {
            // check the response
            expect(response.body.name).toBe("Medical updated");

            // check the data in the database
            const medicalAdministration = await Models.medicalAdministration.findUnique({
                where: {
                    nameSlug: "medical-updated"
                }
            });
            expect(medicalAdministration).toBeTruthy();
            expect(medicalAdministration.name).toBe("Medical updated");
            expect(medicalAdministration.nameSlug).toBe("medical-updated");
        })
    });

    test('DELETE - /api/medical_administrations/slug/:nameSlug', async () => {
        await supertest(appTest)
        .delete('/api/medical_administrations/slug/medical-administration-test-functional-medimoi-2')
        .expect(200)
        .then(async (response) => {
            // check the response 
            expect(response.body.name).toBe("Medical Administration Test Functional medimoi 2");
            const medicalAdministrations = await Models.medicalAdministration.findMany({});
            expect(medicalAdministrations.length).toBe(2);
        });
        await supertest(appTest)
        .delete('/api/medical_administrations/slug/medical-administration-test-functional-medimoi')
        .expect(200)
        .then(async (response) => {
            // check the response 
            expect(response.body.name).toBe("Medical Administration Test Functional medimoi");
            const medicalAdministrations = await Models.medicalAdministration.findMany({});
            expect(medicalAdministrations.length).toBe(1);
        });
    });
});