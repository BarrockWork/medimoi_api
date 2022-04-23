/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require("./../server_test");
const Models = require('./../../models');
const R = require('ramda');

// Delete all record before starting the tests
beforeAll(async () => {
    await Models.Disease.deleteMany({});
})

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialize express server
const appTest = createServerTest()

// Initialise a list of drug object
const schemaObject = [
    {
        name: 'Disease Test',
        description: 'ceci est un test',
        incubationPeriod: '10 days',
        transmitting: 'orale',
        disease_type_id: 4
    },
    {
        name: 'Disease Test Functional medimoi',
        description: 'ceci est un test',
        incubationPeriod: '10 days',
        transmitting: 'orale',
        disease_type_id: 4
    },
    {
        name: 'Disease Test Functional medimoi 2',
        description: 'ceci est un test',
        incubationPeriod: '10 days',
        transmitting: 'orale',
        disease_type_id: 4
    },
]

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
                const disease_type = await Models.Disease.findUnique({
                    where: {
                        nameSlug: "disease-test"
                    }
                });
                expect(disease_type).toBeTruthy()
                expect(disease_type.nameSlug).toBe("disease-test")
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

    test("GET - /api/diseases/:nameSlug", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/diseases/disease-test")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("disease-test")
            })
    })

    test("GET - /api/diseases/", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/disease_type/")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.length).toBeGreaterThan(1)
            })
    })

    test("PUT - /api/diseases/:nameSlug/edit", async () => {
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.name = "Disease Test Edition"

        await supertest(appTest)
            .put("/api/diseases/disease-test/edit")
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

    test("DELETE - /api/diseases/:nameSlug/delete", async () => {
        await supertest(appTest)
            .delete("/api/diseases/disease-test-functional-medimoi-2/delete")
            .expect(200)
            .then(async (response) => {
                // Check the response (prisma return the deleted object datas
                expect(response.body.nameSlug).toBe("disease-test-functional-medimoi-2");

                // Check the data in the database
                const disease = await Models.Disease.findUnique({
                    where: {
                        nameSlug: "disease-test-functional-medimoi-2"
                    }
                });
                expect(disease).toBeNull();
            })
    })
})