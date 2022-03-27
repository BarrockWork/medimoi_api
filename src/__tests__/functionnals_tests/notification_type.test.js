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
    await Models.NotificationType.deleteMany({});
})

// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.$disconnect();
})

// Initialize express server
const appTest = createServerTest()

// Initialise a list of company object
const schemaObject = [
    {
        name: 'Notification type 0'
    },
    {
        name: 'Notification type  1 medimoi'
    },
    {
        name: 'Notification type  2 medimoi'
    },
]

/*
 * Init the company test group
 */
describe("Notification_type functional testing", () => {

    test("POST - /api/notification_type/new", async () => {
        // Clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);

        await supertest(appTest)
            .post("/api/notification_type/new")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("notification-type-0")

                // Check the data in the database
                const notificationType = await Models.NotificationType.findUnique({
                    where: {
                        nameSlug: "notification-type-0"
                    }
                });
                expect(notificationType).toBeTruthy()
                expect(notificationType.nameSlug).toBe("notification-type-0")
            })
    })

    test("POST - /api/notification_type/news", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        await supertest(appTest)
            .post("/api/notification_type/news")
            .send(cloneSchemaObjects)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.count).toEqual(2);

                // Check the data in the database
                const companies = await Models.NotificationType.findMany({
                    where: {
                        nameSlug: {
                            contains: 'medimoi'
                        }
                    }
                });
                expect(companies).toHaveLength(2);
            })
    })

    test("GET - /api/notification_type/slug/:nameSlug", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/notification_type/slug/notification-type-0")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("notification-type-0")
            })
    })

    test("GET - /api/notification_type/all", async () => {
        // Clone the schemaObjects in order to avoid to modify the original
        await supertest(appTest)
            .get("/api/notification_type/all")
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.length).toBeGreaterThan(1)
            })
    })

    test("PUT - /api/notification_type/slug/:nameSlug", async () => {
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.name = "Notif Edition"

        await supertest(appTest)
            .put("/api/notification_type/slug/notification-type-0")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("notif-edition");

                // Check the data in the database
                const company = await Models.NotificationType.findUnique({
                    where: {
                        nameSlug: "notif-edition"
                    }
                });
                expect(company.nameSlug).toBe("notif-edition");
            })
    })

    test("DELETE - /api/notification_type/slug/:nameSlug", async () => {
        await supertest(appTest)
            .delete("/api/notification_type/slug/notification-type-2-medimoi")
            .expect(200)
            .then(async (response) => {
                // Check the response (prisma return the deleted object datas
                expect(response.body.nameSlug).toBe("notification-type-2-medimoi");

                // Check the data in the database
                const company = await Models.NotificationType.findUnique({
                    where: {
                        nameSlug: "notification-type-2-medimoi"
                    }
                });
                expect(company).toBeNull();
            })
    })

})