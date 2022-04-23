/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require("./../server_test");
const Models = require('./../../models');
const R = require('ramda');

// Delete all record before starting the tests
/*
beforeAll(async () => {
    await Models.DrugLevel.deleteMany({});
})
*/

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialize express server
const appTest = createServerTest()

// Initialise a list of drug object
const schemaObject = [
    {
        level: 1,
        description: 'ceci est un test',

    },
    {
        level: 2,
        description: 'ceci est un test',
    },
    {
        level: 3,
        description: 'ceci est un test',
    },
]

/*
 * Init the contact_type test group
 */
describe("Drug_Level functional testing", () => {

    test("POST - /api/drugLevels/new", async () => {
        // Clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);

        await supertest(appTest)
            .post("/api/drugLevels/new")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response

                // Check the data in the database
                const Drug_level = await Models.DrugLevel.findFirst({
                    where: {
                        level: 1
                    }
                });
                expect(Drug_level).toBeTruthy()
                expect(Drug_level.level).toBe(1);
            })
    })

    test("POST - /api/drugLevels/news", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        await supertest(appTest)
            .post("/api/drugLevels/news")
            .send(cloneSchemaObjects)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.count).toEqual(2);

                // Check the data in the database
                const drug_levels = await Models.DrugLevel.findMany({
                    where: {
                        description: {
                            contains: 'test'
                        }
                    }
                });
                expect(drug_levels).toHaveLength(3);
            })
    })

    test("GET - /api/drugLevels/:id", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/drugLevels/1")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.length).toBe(1)
            })
    })

    test("GET - /api/drugLevels/", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/drugLevels/")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.length).toBeGreaterThan(1)
            })
    })

    test("PUT - /api/drugLevels/:id/edit", async () => {
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.description = "ceci est un ancien test"

        await supertest(appTest)
            .put("/api/drugLevels/1/edit")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.description).toBe("ceci est un ancien test");

                // Check the data in the database
                const Drug_level = await Models.DrugLevel.findUnique({
                    where: {
                        id: 1,
                    }
                });
                expect(Drug_level.description).toBe("ceci est un ancien test");
            })
    })

    test("DELETE - /api/drugLevels/:id/delete", async () => {
        await supertest(appTest)
            .delete("/api/drugLevels/2/delete")
            .expect(200)
            .then(async (response) => {
                // Check the response (prisma return the deleted object datas
                expect(response.body.level).toBe(2);

                // Check the data in the database
                const Drug_level = await Models.DrugLevel.findUnique({
                    where: {
                        id: 2
                    }
                });
                expect(Drug_level).toBeNull();
            })
    })

})