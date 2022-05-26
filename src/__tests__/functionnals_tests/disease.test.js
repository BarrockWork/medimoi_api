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
    // Insert a disease type
    const diseaseType = await Models.DiseaseType.create({
        data: {
            name: 'disease-type Test Relation',
            nameSlug: createSlug('disease-type-test relation'),
            description: 'ceci est un test',
        }
    })

    // Initialize a list of contact_type object
    schemaObject = [
        {
            name: 'disease test',
            description: 'ceci est un test',
            incubationPeriod: '5 days',
            transmitting: 'orale',
            disease_type_id: diseaseType.id,
        },
        {
            name: 'disease Test Functional medimoi',
            description: 'ceci est un test',
            incubationPeriod: '10 days',
            transmitting: 'orale',
            disease_type_id: diseaseType.id,
        },
        {
            name: 'disease Test Functional medimoi 2',
            description: 'ceci est un test',
            incubationPeriod: '9 days',
            transmitting: 'nasale',
            disease_type_id: diseaseType.id,
        },
    ]
}

// Delete all record before starting the tests
beforeAll(async () => {
    await Models.Disease.deleteMany({
        where: {
            name: {
                contains: "disease-test"
            }
        }
    });
    await Models.DiseaseType.deleteMany({
        where: {
            nameSlug: {
                contains: 'disease-type-test-relation'
            }
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
 * Init the disease test group
 */

describe("Disease functional testing", () => {

    test("POST - /api/diseases/new", async () => {
        // Clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);

        await supertest(appTest)
            .post("/api/diseases/new")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("disease-test")

                // Check the data in the database
                const disease = await Models.Disease.findUnique({
                    where: {
                        nameSlug: "disease-test"
                    }
                });
                expect(disease).toBeTruthy()
                expect(disease.nameSlug).toBe("disease-test")
            })
    })

    test("POST - /api/diseases/news", async () => {

        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        await supertest(appTest)
            .post("/api/diseases/news")
            .send(cloneSchemaObjects)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.count).toEqual(2);

                // Check the data in the database
                const diseases = await Models.Disease.findMany({
                    where: {
                        nameSlug: {
                            contains: 'medimoi'
                        }
                    }
                });
                expect(diseases).toHaveLength(2);
            })
    })

    test("GET - /api/diseases/slug/:nameSlug", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/diseases/slug/disease-test")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("disease-test")
            })
    })

    test("GET - /api/diseases/all", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/diseases/all")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.length).toBeGreaterThan(1)
            })
    })

    test("PUT - /api/diseases/slug/:nameSlug", async () => {
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.name = "Disease Test Edition"

        await supertest(appTest)
            .put("/api/diseases/slug/disease-test")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("disease-test-edition");

                // Check the data in the database
                const disease = await Models.Disease.findUnique({
                    where: {
                        nameSlug: "disease-test-edition"
                    }
                });
                expect(disease.nameSlug).toBe("disease-test-edition");
            })
    })

    test("DELETE - /api/diseases/slug/:nameSlug", async () => {
        await supertest(appTest)
            .delete("/api/diseases/slug/disease-test-functional-medimoi")
            .expect(200)
            .then(async (response) => {
                // Check the response (prisma return the deleted object datas
                expect(response.body.nameSlug).toBe("disease-test-functional-medimoi");

                // Check the data in the database
                const disease = await Models.Disease.findUnique({
                    where: {
                        nameSlug: "disease-test-functional-medimoi"
                    }
                });
                expect(disease).toBeNull();
            })
    })
})
