/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require("./../server_test");
const Models = require('./../../models');
const R = require('ramda');

// Delete all record before starting the tests
/*beforeAll(async () => {
    await Models.DrugType.deleteMany({});
})*/

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialize express server
const appTest = createServerTest()

// Initialise a list of drug object
const schemaObject = [
    {
        name: 'Drug-type Test',
        description: 'ceci est un test',

    },
    {
        name: 'Drug-type Test Functional medimoi',
        description: 'ceci est un test',
    },
    {
        name: 'Drug-type Test Functional medimoi 2',
        description: 'ceci est un test',
    },
]

/*
 * Init the contact_type test group
 */
describe("Drug_type functional testing", () => {

    test("POST - /api/drug_types/new", async () => {
        // Clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);

        await supertest(appTest)
            .post("/api/drug_types/new")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("drug-type-test")

                // Check the data in the database
                const Drug_type = await Models.DrugType.findUnique({
                    where: {
                        nameSlug: "drug-type-test"
                    }
                });
                expect(Drug_type).toBeTruthy()
                expect(Drug_type.nameSlug).toBe("drug-type-test")
            })
    })

/*    test("POST - /api/drug_types/news", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        await supertest(appTest)
            .post("/api/drug_types/news")
            .send(cloneSchemaObjects)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.count).toEqual(2);

                // Check the data in the database
                const drug_types = await Models.DrugType.findMany({
                    where: {
                        nameSlug: {
                            contains: 'medimoi'
                        }
                    }
                });
                expect(drug_types).toHaveLength(2);
            })
    })
    test("GET - /api/drug_types/slug/:nameSlug", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/drug_types/slug/drug-type-test")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("drug-type-test")
            })
    })

    test("GET - /api/drug_types/all", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/drug_types/all")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.length).toBeGreaterThan(1)
            })
    })

    test("PUT - /api/drug_types/slug/:nameSlug", async () => {
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.name = "Drug-type Test Edition"

        await supertest(appTest)
            .put("/api/drug_types/slug/drug-type-test")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("drug-type-test-edition");

                // Check the data in the database
                const Drug_type = await Models.DrugType.findUnique({
                    where: {
                        nameSlug: "drug-type-test-edition"
                    }
                });
                expect(Drug_type.nameSlug).toBe("drug-type-test-edition");
            })
    })

    test("DELETE - /api/drug_types/slug/:nameSlug/", async () => {
        await supertest(appTest)
            .delete("/api/drug_types/slug/drug-type-test-functional-medimoi-2")
            .expect(200)
            .then(async (response) => {
                // Check the response (prisma return the deleted object datas
                expect(response.body.nameSlug).toBe("drug-type-test-functional-medimoi-2");

                // Check the data in the database
                const Drug_type = await Models.DrugType.findUnique({
                    where: {
                        nameSlug: "drug-type-test-functional-medimoi-2"
                    }
                });
                expect(Drug_type).toBeNull();
            })
    })*/


})