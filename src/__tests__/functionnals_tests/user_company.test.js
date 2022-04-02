/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require("./../server_test");
const Models = require('./../../models')
const R = require('ramda');
const {createSlug} = require("./../../utils/requestHandler");

let schemaObject, users, company, idFirstUserCompany;

// Function to initiate the datas for the tests
const initSchemaObjects = async () => {
    // Insert company
    company = await Models.Company.create({
        data: {
            name: 'Company For UserCompany',
            nameSlug: createSlug('Company For UserCompany'),
            siret: '123456789',
            tva: 'FR123456789'
        }
    });
    // Insert a user_type
    const userType = await Models.UserType.create({
        data: {
            name: 'UserType For UserCompany',
            nameSlug: createSlug('UserType For UserCompany')
        }
    });
    // Insert and retrive a list of users
    await Models.User.createMany({
        data: [
            {
                firstName: 'User1 for UserCompany',
                lastName: 'doe',
                age: 30,
                email: 'user1forcompany@medimoi.com',
                password: 'password',
                cellphone: '0123456789',
                homephone: '0123456789',
                role: 'user',
                user_type_id: userType.id,
            },
            {
                firstName: 'User2 for UserCompany',
                lastName: 'doe',
                age: 30,
                email: 'user2forcompany@medimoi.com',
                password: 'password',
                cellphone: '0123456789',
                homephone: '0123456789',
                role: 'user',
                user_type_id: userType.id,
            },
            {
                firstName: 'User3 for UserCompany',
                lastName: 'doe',
                age: 30,
                email: 'user3forcompany@medimoi.com',
                password: 'password',
                cellphone: '0123456789',
                homephone: '0123456789',
                role: 'user',
                user_type_id: userType.id,
            }
        ]
    });
    users = await Models.User.findMany({
        where: {
            email: {
                contains: 'forcompany'
            }
        }
    });

    // Initialise a list of user_company object
    schemaObject = [
        {
            company_id: company.id,
            user_id: users[0].id
        },
        {
            company_id: company.id,
            user_id: users[1].id
        },
        {
            company_id: company.id,
            user_id: users[2].id
        }
    ]
}

// Delete all record before starting the tests and initiate the datas
beforeAll( async () => {
    await Models.UserCompany.deleteMany({});
    await Models.Company.deleteMany({
        where: {
            nameSlug: {
                contains: 'company-for-usercompany'
            }
        }
    });

    await Models.User.deleteMany({
        where: {
            email: {
                contains: 'forcompany'
            }
        }
    });
    await Models.UserType.deleteMany({
        where: {
            nameSlug: {
                contains: 'usertype-for-usercompany'
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
 * Init the user_company test group
 */
describe("UserCompany functional testing", () => {

    test("POST - /api/user_company/new", async () => {
        // Clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);

        await supertest(appTest)
            .post("/api/user_company/new")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.company_id).toBe(company.id)

                // Save the id of the first user_company
                idFirstUserCompany = response.body.id;

                // Check the data in the database
                const user_company = await Models.UserCompany.findFirst({
                    where: {
                        company_id: {
                           equals: company.id
                        }
                    }
                });
                expect(user_company).toBeTruthy()
                expect(user_company.company_id).toBe(company.id)
            })
    })

    test("POST - /api/user_company/news", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        await supertest(appTest)
            .post("/api/user_company/news")
            .send(cloneSchemaObjects)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.count).toEqual(2);

                // Check the data in the database
                const user_companies = await Models.UserCompany.findMany({
                    where: {
                        company_id: {
                            equals: company.id
                        }
                    }
                });
                expect(user_companies).toHaveLength(3);
            })
    })

    test("GET - /api/user_company/user/:id", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get(`/api/user_company/user/${users[1].id}`)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.user_id).toBe(users[1].id)
            })
    })

    test("GET - /api/user_company/all", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/user_company/all")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.length).toBeGreaterThan(1)
            })
    })

    test("PUT - /api/user_company/:id", async () => {
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.isActive = false;

        await supertest(appTest)
            .put(`/api/user_company/${idFirstUserCompany}`)
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.isActive).toBeFalsy();

                // Check the data in the database
                const user_company = await Models.UserCompany.findFirst({
                    where: {
                        isActive: {
                            equals: false
                        }
                    }
                });
                expect(user_company.isActive).toBeFalsy();
            })
    })

    test("DELETE - /api/user_company/:id", async () => {
        await supertest(appTest)
            .delete(`/api/user_company/${idFirstUserCompany}`)
            .expect(200)
            .then(async (response) => {
                // Check the response (prisma return the deleted object datas
                expect(response.body.isActive).toBeFalsy();

                // Check the data in the database
                const user_company = await Models.UserCompany.findFirst({
                    where: {
                        isActive: {
                            equals: false
                        }
                    }
                });
                expect(user_company).toBeNull();
            })
    })

})