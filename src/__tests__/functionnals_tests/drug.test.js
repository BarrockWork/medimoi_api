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
    await Models.Drug.deleteMany({});
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
        name: 'doliprane 500mg',
        description: 'ceci est un doliprane',
        isPrescription: true,
        drug_level_id: 2,
        drug_type_id: 3,
        medical_administration_id: 1,
    },
    {
        name: 'doliprane 1000mg',
        description: 'ceci est un test',
        isPrescription: true,
        drug_level_id: 2,
        drug_type_id: 3,
        medical_administration_id: 1,
    },
    {
        name: 'doliprane 250mg',
        description: 'ceci est un test',
        isPrescription: true,
        drug_level_id: 2,
        drug_type_id: 3,
        medical_administration_id: 1,
    },
]

/*
 * Init the contact_type test group
 */
describe("Drug functional testing", () => {

     test("POST - /api/drugs/new", async () => {
         // Clone the schemaObject[0] in order to avoid to modify the original
         let cloneSchemaObject = R.clone(schemaObject[0]);

         await supertest(appTest)
             .post("/api/drugs/new")
             .send(cloneSchemaObject)
             .expect(200)
             .then(async (response) => {
                 // Check the response
                 expect(response.body.nameSlug).toBe("doliprane-500mg")
                 // Check the data in the database
                 const Drug = await Models.Drug.findFirst({
                     where: {
                         nameSlug: 'doliprane-500mg'
                     }
                 });
                 expect(Drug).toBeTruthy()
                 expect(Drug.nameSlug).toBe('doliprane-500mg')
             })
     })

     test("POST - /api/drugs/news", async () => {
         // Clone the schemaObjects in order to avoid to modify the original
         let cloneSchemaObjects = {
             "entries": [R.clone(schemaObject[1]), R.clone(schemaObject[2])]
         };
         await supertest(appTest)
             .post("/api/drugs/news")
             .send(cloneSchemaObjects)
             .expect(200)
             .then(async (response) => {
                 // Check the response
                 expect(response.body.count).toEqual(2);

                 // Check the data in the database
                 const drug = await Models.Drug.findMany({
                     where: {
                         description: {
                             contains: 'test'
                         }
                     }
                 });
                 expect(drug).toHaveLength(2);
             })
     })

        test("GET - /api/drugs/:nameSlug", async () => {
            // Clone the schemaObjects in order to avoid to modify the original
            await supertest(appTest)
                .get("/api/drugs/doliprane-500mg")
                .expect(200)
                .then(async (response) => {
                    // Check the response
                    expect(response.body.nameSlug).toBe('doliprane-500mg')
                })
        })

      test("GET - /api/drugs/", async () => {
          // Clone the schemaObjects in order to avoid to modify the original
          await supertest(appTest)
              .get("/api/drugs/")
              .expect(200)
              .then(async (response) => {
                  // Check the response
                  expect(response.body.length).toBeGreaterThan(1)
              })
      })

    test("PUT - /api/drugs/:nameSlug/edit", async () => {
        // Clone the schemaObject in order to avoid to modify the original
        let cloneSchemaObject = R.clone(schemaObject[0]);
        cloneSchemaObject.name = "doliprane 800mg"

        await supertest(appTest)
            .put("/api/drugs/doliprane-250mg/edit")
            .send(cloneSchemaObject)
            .expect(200)
            .then(async (response) => {
                // Check the response
                expect(response.body.nameSlug).toBe("doliprane-800mg");

                // Check the data in the database
                const Drug = await Models.Drug.findUnique({
                    where: {
                        nameSlug: 'doliprane-800mg',
                    }
                });
                expect(Drug.nameSlug).toBe("doliprane-800mg");
            })
    })

    test("DELETE - /api/drugs/:nameSlug/delete", async () => {
        await supertest(appTest)
            .delete("/api/drugs/doliprane-800mg/delete")
            .expect(200)
            .then(async (response) => {
                // Check the response (prisma return the deleted object datas
                expect(response.body.nameSlug).toBe('doliprane-800mg');

                // Check the data in the database
                const Drug_level = await Models.Drug.findUnique({
                    where: {
                        nameSlug: 'doliprane-800mg',
                    }
                });
                expect(Drug_level).toBeNull();
            })
    })

})