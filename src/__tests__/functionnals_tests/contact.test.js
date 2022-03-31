/*
 *   Link for the errors reference of prisma:
 *   - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require("./../server_test");
const Models = require('./../../models');
const R = require('ramda');
const {createSlug} = require("./../../utils/requestHandler");

let idFirstContact, schemaObject, user;

// Function to initiate the datas for the tests
const initSchemaObjects = async () => {
    // Insert a contact_type
    const contactType = await Models.ContactType.create({
        data: {
            name: 'Contact type for contact',
            nameSlug: createSlug('Contact type for contact')
        }
    })

    // Insert a user_type
    const userType = await Models.UserType.create({
        data: {
            name: 'UserType For Contact',
            nameSlug: 'UserType For Contact'
        },
    });

    // Insert a user
    user = await Models.User.create({
        data: {
            firstName: 'User for Contact',
            lastName: 'doe',
            age: 30,
            email: 'userforcontact@medimoi.com',
            password: 'password',
            cellphone: '0123456789',
            homephone: '0123456789',
            role: 'user',
            user_type_id: userType.id,
        },
    });

    // Initialise a list of contact_type object
    schemaObject = [
        {
            firstName: 'Luffy Contact',
            lastName: 'Monkey D',
            phoneNumber: '123456789',
            contact_type_id: contactType.id,
            user_id: user.id
        },
        {
            firstName: 'Dragon Contact',
            lastName: 'Monkey D medimoi',
            phoneNumber: '123456789',
            contact_type_id: contactType.id,
            user_id: user.id
        },
        {
            firstName: 'Garp Contact',
            lastName: 'Monkey D medimoi',
            phoneNumber: '123456789',
            contact_type_id: contactType.id,
            user_id: user.id
        },
    ]
}

// Delete all record before starting the tests and initiate the datas
beforeAll( async () =>{
    await Models.Contact.deleteMany({});
    await Models.ContactType.deleteMany({});
    await Models.User.deleteMany({});
    await Models.UserType.deleteMany({});
    await initSchemaObjects();
})

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialize express server
const appTest = createServerTest()

/*
 * Init the contact test group
 */
describe("Contact functional testing", () => {

    test("POST - /api/contact/new", async () => {
        // Clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);

        await supertest(appTest)
            .post("/api/contact/new")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.firstName).toBe("Luffy Contact")

                // Save the id of the first contact
                idFirstContact = response.body.id;

                // Check the data in the database
                const contact = await Models.Contact.findFirst({
                    where: {
                        firstName: {
                           equals: "Luffy Contact"
                        }
                    }
                });
                expect(contact).toBeTruthy()
                expect(contact.firstName).toBe("Luffy Contact")
            })
    })

    test("POST - /api/contact/news", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        await supertest(appTest)
            .post("/api/contact/news")
            .send(cloneSchemaObjects)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.count).toEqual(2);

                // Check the data in the database
                const contacts = await Models.Contact.findMany({
                    where: {
                        lastName: {
                            contains: 'medimoi'
                        }
                    }
                });
                expect(contacts).toHaveLength(2);
            })
    })

    test("GET - /api/contact/user/:id", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get(`/api/contact/user/${user.id}`)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body).toHaveLength(3)
            })
    })

    test("GET - /api/contact/all", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/contact/all")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.length).toBeGreaterThan(1)
            })
    })

    test("PUT - /api/contact/:id", async () => {
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.firstName = "LuffyContact Edition"

        await supertest(appTest)
            .put(`/api/contact/${idFirstContact}`)
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.firstName).toBe("LuffyContact Edition");

                // Check the data in the database
                const contact = await Models.Contact.findFirst({
                    where: {
                        firstName: {
                            equals: "LuffyContact Edition"
                        }
                    }
                });
                expect(contact.firstName).toBe("LuffyContact Edition");
            })
    })

    test("DELETE - /api/contact/:id", async () => {
        await supertest(appTest)
            .delete(`/api/contact/${idFirstContact}`)
            .expect(200)
            .then(async (response) => {
                // Check the response (prisma return the deleted object datas
                expect(response.body.firstName).toBe("LuffyContact Edition");

                // Check the data in the database
                const contact = await Models.NotificationType.findFirst({
                    where: {
                        firstName: {
                            equals: "LuffyContact Edition"
                        }
                    }
                });
                expect(contact).toBeNull();
            })
    })

})