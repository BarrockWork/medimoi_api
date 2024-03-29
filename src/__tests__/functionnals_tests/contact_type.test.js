/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require("./../server_test");
const Models = require('./../../models');
const R = require('ramda');

// Delete all record before starting the tests
beforeAll( async () =>{
    await Models.Contact.deleteMany({});
    await Models.ContactType.deleteMany({
        where: {
            nameSlug: {
                contains: 'uniquect'
            }
        }
    });
})

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialize express server
const appTest = createServerTest()

// Initialise a list of contact_type object
const schemaObject = [
    {
        name: 'Contact type uniqueCT 0'
    },
    {
        name: 'Contact type uniqueCT 1 medimoi'
    },
    {
        name: 'Contact type uniqueCT 2 medimoi'
    },
]

/*
 * Init the contact_type test group
 */
describe("Contact_type functional testing", () => {

    test("POST - /api/contact_type/new", async () => {
        // Clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);

        await supertest(appTest)
            .post("/api/contact_type/new")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("contact-type-uniquect-0")

                // Check the data in the database
                const contact_type = await Models.ContactType.findUnique({
                    where: {
                        nameSlug: "contact-type-uniquect-0"
                    }
                });
                expect(contact_type).toBeTruthy()
                expect(contact_type.nameSlug).toBe("contact-type-uniquect-0")
            })
    })

    test("POST - /api/contact_type/news", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        await supertest(appTest)
            .post("/api/contact_type/news")
            .send(cloneSchemaObjects)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.count).toEqual(2);

                // Check the data in the database
                const contact_types = await Models.ContactType.findMany({
                    where: {
                        nameSlug: {
                            contains: 'medimoi'
                        }
                    }
                });
                expect(contact_types).toHaveLength(2);
            })
    })

    test("GET - /api/contact_type/slug/:nameSlug", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/contact_type/slug/contact-type-uniquect-0")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("contact-type-uniquect-0")
            })
    })

    test("GET - /api/contact_type/all", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/contact_type/all")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.length).toBeGreaterThan(1)
            })
    })

    test("PUT - /api/contact_type/slug/:nameSlug", async () => {
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.name = "Contact type uniqueCT Edition"

        await supertest(appTest)
            .put("/api/contact_type/slug/contact-type-uniquect-0")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("contact-type-uniquect-edition");

                // Check the data in the database
                const contact_type = await Models.ContactType.findUnique({
                    where: {
                        nameSlug: "contact-type-uniquect-edition"
                    }
                });
                expect(contact_type.nameSlug).toBe("contact-type-uniquect-edition");
            })
    })

    test("DELETE - /api/contact_type/slug/:nameSlug", async () => {
        await supertest(appTest)
            .delete("/api/contact_type/slug/contact-type-uniquect-2-medimoi")
            .expect(200)
            .then(async (response) => {
                // Check the response (prisma return the deleted object datas
                expect(response.body.nameSlug).toBe("contact-type-uniquect-2-medimoi");

                // Check the data in the database
                const contact_type = await Models.NotificationType.findUnique({
                    where: {
                        nameSlug: "contact-type-uniquect-2-medimoi"
                    }
                });
                expect(contact_type).toBeNull();
            })
    })

})