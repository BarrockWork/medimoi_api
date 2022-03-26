/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require("./../server_test");
const Models = require('./../../models');
const {createSlug} = require("./../../utils/requestHandler");
const {testMaxLength} = require('./../../utils/testHandler');
const R = require('ramda');

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialize express server
const appTest = createServerTest()

// Initialise a list of company object
const schemaObject = [
    {
        name: 'Company Test Functional',
        siret: '123456789',
        tva: 'FR123456789'
    },
    {
        name: 'Company Test Functional medimoi',
        siret: '123456789',
        tva: 'FR123456789'
    },
    {
        name: 'Company Test Functional medimoi 2',
        siret: '123456789',
        tva: 'FR123456789'
    },
]

/*
 * Init the company test group
 */
describe("Company functional testing", () => {

    test("POST - Company - createOne()", async () => {
        // Clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);

        await supertest(appTest)
            .post("/api/company/new")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("company-test-functional")

                // Check the data in the database
                const company = await Models.Company.findUnique({
                    where: {
                        nameSlug: "company-test-functional"
                    }
                });
                expect(company).toBeTruthy()
                expect(company.nameSlug).toBe("company-test-functional")
            })
    })

    test("POST - Company - createMany()", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        await supertest(appTest)
            .post("/api/company/news")
            .send(cloneSchemaObjects)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.count).toEqual(2);

                // Check the data in the database
                const companies = await Models.Company.findMany({
                    where: {
                        nameSlug: {
                            contains: 'medimoi'
                        }
                    }
                });
                expect(companies).toHaveLength(2);
            })
    })
})