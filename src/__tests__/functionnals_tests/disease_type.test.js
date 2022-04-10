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
    await Models.DiseaseType.deleteMany({});
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
        name: 'Disease-type Test',
        description: 'ceci est un test',

    },
    {
        name: 'Disease-type Test Functional medimoi',
        description: 'ceci est un test',
    },
    {
        name: 'Disease-type Test Functional medimoi 2',
        description: 'ceci est un test',
    },
]

/*
 * Init the contact_type test group
 */
describe("Disease_type functional testing", () => {

    test("POST - /api/disease_type/new", async () => {
        // Clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);

        await supertest(appTest)
            .post("/api/disease_type/new")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("disease-type-test")

                // Check the data in the database
                const disease_type = await Models.DiseaseType.findUnique({
                    where: {
                        nameSlug: "disease-type-test"
                    }
                });
                expect(disease_type).toBeTruthy()
                expect(disease_type.nameSlug).toBe("disease-type-test")
            })
    })

    test("POST - /api/disease_type/news", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        await supertest(appTest)
            .post("/api/disease_type/news")
            .send(cloneSchemaObjects)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.count).toEqual(2);

                // Check the data in the database
                const contact_types = await Models.DiseaseType.findMany({
                    where: {
                        nameSlug: {
                            contains: 'medimoi'
                        }
                    }
                });
                expect(contact_types).toHaveLength(2);
            })
    })

    test("GET - /api/disease_type/:nameSlug", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/disease_type/disease-type-test")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("disease-type-test")
            })
    })

    test("GET - /api/disease_type/", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/disease_type/")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.length).toBeGreaterThan(1)
            })
    })

    test("PUT - /api/disease_type/:nameSlug/edit", async () => {
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.name = "Disease-type Test Edition"

        await supertest(appTest)
            .put("/api/disease_type/disease-type-test/edit")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("disease-type-test-edition");

                // Check the data in the database
                const disease_type = await Models.DiseaseType.findUnique({
                    where: {
                        nameSlug: "disease-type-test-edition"
                    }
                });
                expect(disease_type.nameSlug).toBe("disease-type-test-edition");
            })
    })

    test("DELETE - /api/disease_type/:nameSlug/delete", async () => {
        await supertest(appTest)
            .delete("/api/disease_type/disease-type-test-functional-medimoi-2/delete")
            .expect(200)
            .then(async (response) => {
                // Check the response (prisma return the deleted object datas
                expect(response.body.nameSlug).toBe("disease-type-test-functional-medimoi-2");

                // Check the data in the database
                const disease_type = await Models.DiseaseType.findUnique({
                    where: {
                        nameSlug: "disease-type-test-functional-medimoi-2"
                    }
                });
                expect(disease_type).toBeNull();
            })
    })


})