/**
 *  Link for the errors reference of prisma:
 * - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require("../server_test");
const Models = require('../../models');
const R = require('ramda');

// // Delete all record before starting the tests
beforeAll( async () =>{
    await Models.treatmentPeriodicity.deleteMany({
        where:{
            name:{
                contains: "Treatment Periodicity Functional"
            }
        }
    });
    await Models.$disconnect();
});

// // Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.treatmentPeriodicity.deleteMany({
        where:{
            name:{
                contains: "Treatment Periodicity Functional"
            }
        }
    });
    await Models.$disconnect();
});

const appTest = createServerTest();

// // Initialise a list of company object
const schemaObject = [
    {
        name: 'Treatment Periodicity Functional',
    },
    {
        name: 'Treatment Periodicity Functional medimoi',
    },
    {
        name: 'Treatment Periodicity Functional medimoi 2',
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
            expect(response.body.nameSlug).toBe("treatment-periodicity-functional");

            // Check the data in the database
            await Models.treatmentPeriodicity.delete({
                where:{
                    id: response.body.id
                }
            })
        });
    });

    test('POST - /api/treatment_periodicities/news', async () => {
        // Clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        await supertest(appTest)
        .post('/api/treatment_periodicities/news')
        .send(cloneSchemaObjects)
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.count).toBe(2);

            await Models.treatmentPeriodicity.deleteMany({
                where:{
                    name:{
                        contains: "Treatment Periodicity Functional"
                    }
                }
            });
        })
    });

    test('GET - /api/treatment_periodicities/all', async () => {
        let cloneSchemaObjects = [R.clone(schemaObject[1]), R.clone(schemaObject[2])];
        cloneSchemaObjects[0].nameSlug = "treatment-periodicity-functional-medimoi";
        cloneSchemaObjects[1].nameSlug = "treatment-periodicity-functional-medimoi-2";
        await Models.treatmentPeriodicity.createMany({
            data: cloneSchemaObjects
        });

        await supertest(appTest)
        .get('/api/treatment_periodicities/all')
        .expect(200)
        .then(async (response) => {
            // Check the response
            const treatmentPeriodicities = response.body;
            // console.log(treatmentPeriodicities, "treatmentPeriodicities");
            expect(response.body.length).toBeGreaterThanOrEqual(2);
            await Models.treatmentPeriodicity.deleteMany({
                where:{
                    name:{
                        contains: "medimoi"
                    }
                }
            });
        });
    });

    test('GET - /api/treatment_periodicities/slug/:nameSlug', async () => {
        let cloneSchemaObjects = R.clone(schemaObject[0]);
        cloneSchemaObjects.nameSlug = "treatment-periodicity-functional";
        await Models.treatmentPeriodicity.create({
            data: cloneSchemaObjects
        });
        await supertest(appTest)
        .get('/api/treatment_periodicities/slug/treatment-periodicity-functional')
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.nameSlug).toBe("treatment-periodicity-functional")
            await Models.treatmentPeriodicity.deleteMany({
                where:{
                    name:{
                        contains: "Treatment Periodicity Functional"
                    }
                }
            });
        });
    });

    test('PUT - /api/treatment_periodicities/slug/nameSlug', async () => {

        let cloneSchemaObjects = R.clone(schemaObject[0]);
        cloneSchemaObjects.nameSlug = "treatment-periodicity-functional";
        await Models.treatmentPeriodicity.create({
            data: cloneSchemaObjects
        });

        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.name = "Treatment updated";

        await supertest(appTest)
        .put('/api/treatment_periodicities/slug/treatment-periodicity-functional')
        .send(cloneSchemaObject)
        .expect(200)
        .then(async (response) => {
            // check the response)
            expect(response.body.name).toBe("Treatment updated");
            // console.log(response.body, "response.body");
            await Models.treatmentPeriodicity.deleteMany({
                where:{
                    name:{
                        contains: "Treatment updated"
                    }
                }
            });
        });
    });

    test('DELETE - /api/treatment_periodicities/slug/nameSlug', async () => {
        let cloneSchemaObjects = [R.clone(schemaObject[1]), R.clone(schemaObject[2])];
        cloneSchemaObjects[0].name = "Treatment Periodicity Functional to delete";
        cloneSchemaObjects[0].nameSlug = "treatment-periodicity-functional-to-delete";

        cloneSchemaObjects[1].name = "Treatment Periodicity Functional to delete 2";
        cloneSchemaObjects[1].nameSlug = "treatment-periodicity-functional-to-delete-2";
        
        await Models.treatmentPeriodicity.createMany({
        data: cloneSchemaObjects
    });

        await supertest(appTest)
        .delete('/api/treatment_periodicities/slug/treatment-periodicity-functional-to-delete')
        .expect(200)
        .then(async () => {
            // Check the response
            const treatmentPeriodicities = await Models.treatmentPeriodicity.findMany({
                where: {
                    name:{
                        contains: "to delete"
                    }
                }
            });
            // console.log(treatmentPeriodicities, "treatmentPeriodicities rest");
            expect(treatmentPeriodicities.length).toBe(1);

            await Models.treatmentPeriodicity.deleteMany({
                where:{
                    name:{
                        contains: "to delete"
                    }
                }
            });
        })
    });
});