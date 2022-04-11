/**
 *  Link for the errors reference of prisma:
 * - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require("./../server_test");
const Models = require('./../../models');
const R = require('ramda');

// Delete all record before starting the tests
beforeAll( async () =>{
    await Models.medicalAdministration.deleteMany({
        where:{
            name:{
                contains: "Medical Administration Functional"
            }
        }
    });
});


// Disconnect prisma after all of the tests
afterAll(async () => {
    await Models.medicalAdministration.deleteMany({
        where:{
            name:{
                contains: "Medical Administration Functional"
            }
        }
    });
    await Models.$disconnect();
});

const appTest = createServerTest();

// Initialise a list of company object
const schemaObject = [
    {
        name: 'Medical Administration Functional',
    },
    {
        name: 'Medical Administration Functional medimoi',
    },
    {
        name: 'Medical Administration Functional medimoi 2',
    }
];

/**
 * Init the company test group
 */
describe("Medical Administration functional testing", () => {
    test('POST - /api/medical_administrations/new', async () => {
        // clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        await supertest(appTest)
        .post("/api/medical_administrations/new")
        .send(cloneSchemaObject)
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.nameSlug).toBe("medical-administration-functional");

            // Check the data in the database
            const medicalAdministration = await Models.medicalAdministration.findUnique({
                where: {
                    nameSlug: "medical-administration-functional"
                }
            });
            expect(medicalAdministration).toBeTruthy();
            expect(medicalAdministration.name).toBe("Medical Administration Functional");
        });
    });

    test('POST - /api/medical_administrations/news', async () => {
        // clone the schemaObject[0] in order to avoid to modify the original
        let cloneSchemaObjects = {
            "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
        };
        const req = await supertest(appTest)
        .post("/api/medical_administrations/news")
        .send(cloneSchemaObjects)
        .expect(200)
        .then(async (response) => {
            // check the response
            expect(response.body.count).toBe(2);

            const medicalAdministrations = await Models.medicalAdministration.findMany({
                where:{
                    name:{
                        contains: "Functional medimoi"
                    }
                }
            });
            expect(medicalAdministrations.length).toBe(2);
        });
    });

    test('GET - /api/medical_administrations/slug/:nameSlug', async () => {
        await Models.medicalAdministration.create({
            data:{
                name: 'Medical Administration Functional Get',
                nameSlug: 'medical-administration-functional-get'
            }
        })
        await Models.$disconnect();
        await supertest(appTest)
        .get('/api/medical_administrations/slug/medical-administration-functional-get')
        .expect(200)
        .then(async (response) => {
            // check the response
            expect(response.body.name).toBe("Medical Administration Functional Get");
        })
        .then(async () => {
            await Models.medicalAdministration.delete({
                where:{
                    nameSlug: 'medical-administration-functional-get'
                }
            })
        });
    });

    test('GET - /api/medical_administrations/all', async () => {
        await Models.medicalAdministration.createMany({
            data:[
                {
                    name: 'Medical Administration Functional Get Many 1',
                    nameSlug: 'medical-administration-functional-get-many-1'
                },
                {
                    name: 'Medical Administration Functional Get Many 2',
                    nameSlug: 'medical-administration-functional-get-many-2'
                },
                {
                    name: 'Medical Administration Functional Get Many 3',
                    nameSlug: 'medical-administration-functional-get-many-3'
                },
            ]
        });
        await Models.$disconnect();
        await supertest(appTest)
        .get('/api/medical_administrations/all')
        .expect(200)
        .then(async (response) => {
            // check the response
            console.log(response.body);
            expect(response.body.length).toBeGreaterThan(2);
        })
        .then(async ()=>{
            await Models.medicalAdministration.deleteMany({
                where:{
                    name:{
                        contains: "Medical Administration Functional Get Many"
                    }
                }
            });
            const medicalAdministrations = await Models.medicalAdministration.findMany({
                where:{
                    name:{
                        contains: "Medical Administration Functional"
                    }
                }
            });
            console.log(medicalAdministrations);
        })
    });

    test('PUT - /api/medical_administrations/slug/nameSlug', async () => {

        await Models.medicalAdministration.create({
            data:{
                name: 'Medical Administration Functional To Update',
                nameSlug: 'medical-administration-functional-to-update'
            }
        });
        await Models.$disconnect();
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.name = "Medical Administration Functional updated";

        await supertest(appTest)
        .put('/api/medical_administrations/slug/medical-administration-functional-to-update')
        .send(cloneSchemaObject)
        .expect(200)
        .then(async (response) => {
            // check the response
            console.log(response.body);
            expect(response.body.name).toBe("Medical Administration Functional updated");
        })
        .then(async () => {
            await Models.medicalAdministration.delete({
                where:{
                    nameSlug: 'medical-administration-functional-updated'
                }
            });
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(Models.$disconnect());
    });

    test('DELETE - /api/medical_administrations/slug/:nameSlug', async () => {
        await Models.medicalAdministration.createMany({
            data:[
                {
                    name: 'Medical Administration Functional Medimoi To Delete',
                    nameSlug: 'medical-administration-functional-medimoi-to-delete'
                },
                {
                    name: 'Medical Administration Functional Medimoi To Delete 2',
                    nameSlug: 'medical-administration-functional-medimoi-to-delete-2'
                }
            ]
        });
        await Models.$disconnect();
        await supertest(appTest)
        .delete('/api/medical_administrations/slug/medical-administration-functional-medimoi-to-delete')
        .expect(200)
        .then(async (response) => {
            // check the response 
            expect(response.body.name).toBe("Medical Administration Functional Medimoi To Delete");
            const medicalAdministrations = await Models.medicalAdministration.findMany({
                where:{
                    name:{
                        contains: "Medical Administration Functional Medimoi To Delete"
                    }
                }
            });
            console.log(medicalAdministrations);
            // test que l'élément à bien été supprimé
            expect(medicalAdministrations.length).toBe(1);
        })
    });
});