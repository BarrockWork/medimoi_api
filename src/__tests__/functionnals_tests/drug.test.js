/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require("./../server_test");
const Models = require('./../../models');
const R = require('ramda');
const {createSlug} = require("../../utils/requestHandler");

const initSchemaObjects = async () => {
    // Insert a drug_type
    const drugType = await Models.DrugType.create({
        data: {
            name: 'Drug-type Test',
            nameSlug: createSlug('Drug-type Test'),
            description: 'ceci est un test',
        }
    })

    // Insert a druglevel
    const drugLevel = await Models.DrugLevel.create({
        data: {
            level: 1,
            description: 'ceci est un test',
        },
    });

    // Insert a medical_administration
    const medical_administration = await Models.medicalAdministration.create({
        data: {
            name: 'Medical Administration Test',
            nameSlug: createSlug('Medical Administration Test'),
        },
    });
    // Initialize a list of contact_type object
    schemaObject = [
        {
            name: 'doliprane 500mg',
            description: 'ceci est un doliprane',
            isPrescription: true,
            drug_level_id: drugLevel.id,
            drug_type_id: drugType.id,
            medical_administration_id: medical_administration.id,
        },
        {
            name: 'doliprane 1000mg',
            description: 'ceci est un test',
            isPrescription: true,
            drug_level_id: drugLevel.id,
            drug_type_id: drugType.id,
            medical_administration_id: medical_administration.id,
        },
        {
            name: 'doliprane 250mg',
            description: 'ceci est un test',
            isPrescription: true,
            drug_level_id: drugLevel.id,
            drug_type_id: drugType.id,
            medical_administration_id: medical_administration.id,
        },
    ]
}

// Delete all record before starting the tests
beforeAll(async () => {
    await Models.Drug.deleteMany({
        where: {
            name: {
                contains: "doliprane 500mg"
            }
        }
    });
    await Models.DrugType.deleteMany({
        where: {
            nameSlug: {
                contains: 'drug-type-test'
            }
        }
    });
    await Models.DrugLevel.deleteMany({
        where: {
            id: 4
        }
    });
    await Models.medicalAdministration.deleteMany({
        where: {
            nameSlug: 'medical-administration-test'
        }
    });
    await initSchemaObjects();
})

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialize express server
const appTest = createServerTest()


/*
 * Init the contact_type test group
 */
describe("Drug functional testing", () => {

    test("POST - /api/drugs/new", async () => {
        // Clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);

        await supertest(appTest)
            .post("/api/drugs/new")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("doliprane-500mg")
                // Check the data in the database
                const Drug = await Models.Drug.findFirst({
                    where: {
                        nameSlug: 'doliprane-500mg'
                    }
                });
                expect(Drug).toBeTruthy()
                expect(Drug.nameSlug).toBe('doliprane-500mg')
            })
    }, 9000)
    test("POST - /api/drugs/news", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        await supertest(appTest)
            .post("/api/drugs/news")
            .send(cloneSchemaObjects)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.count).toEqual(2);

                // Check the data in the database
                const drug = await Models.Drug.findMany({
                    where: {
                        description: {
                            contains: 'test'
                        }
                    }
                });
                expect(drug).toHaveLength(2);
            })
    })

    test("GET - /api/drugs/slug/:nameSlug", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/drugs/slug/doliprane-500mg")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe('doliprane-500mg')
            })
    })

    test("GET - /api/drugs/all", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/drugs/all")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.length).toBeGreaterThan(1)
            })
    })

    test("PUT - /api/drugs/slug/:nameSlug", async () => {
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.isPrescription = false

        await supertest(appTest)
            .put("/api/drugs/slug/doliprane-500mg")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.isPrescription).toBe(false);

                // Check the data in the database
                const Drug = await Models.Drug.findUnique({
                    where: {
                        nameSlug: 'doliprane-500mg',
                    }
                });
                expect(Drug.isPrescription).toBe(false);
            })
    })

    test("DELETE - /api/drugs/slug/:nameSlug", async () => {
        await supertest(appTest)
            .delete("/api/drugs/slug/doliprane-250mg")
            .expect(200)
            .then(async (response) => {
                // Check the response (prisma return the deleted object datas
                expect(response.body.nameSlug).toBe('doliprane-250mg');

                // Check the data in the database
                const drug = await Models.Drug.findUnique({
                    where: {
                        nameSlug: 'doliprane-250mg',
                    }
                });
                expect(drug).toBeNull();
            })
    })

})