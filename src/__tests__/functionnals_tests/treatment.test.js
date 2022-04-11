/**
 * Link to the documentation
 * - https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/mutations#create-a-user-type
 */

const supertest = require('supertest');
const createServerTest = require("./../server_test");
const Models = require('./../../models');
const R = require('ramda');


// Delete all record before starting the tests
beforeAll( async () =>{
    await Models.treatment.deleteMany({
        where:{
            name:{
                contains: "Treatment Test functional"
            }
        }
    });
    await Models.$disconnect();
});

afterAll(async () => {
    await Models.treatment.deleteMany({
        where:{
            name:{
                contains: "Treatment Test functional"
            }
        }
    })
    await Models.$disconnect();
});

const appTest = createServerTest();

const schemaObject = [
    {
        name: 'Treatment Test functional',
        startedAt: new Date("2022-04-03 16:56:07.210Z"),
    },
    {
        name: 'Treatment Test functional 2',
        startedAt: new Date("2022-04-03 16:56:07.210Z"),
    },
    {
        name: 'Treatment Test functional 3',
        startedAt: new Date("2022-04-03 16:56:07.210Z"),
    },
];

describe("Treatment functional testing", () => {

    test('POST - /api/treatments/new ', async () => {
        const user_type = await Models.userType.create({
            data:{
                name: 'User Type Test for treatment',
                nameSlug: 'user-type-test-for-treatment',
            }
        });
        const user = await Models.user.create({
            data:{
                firstName: 'john',
                lastName: 'doe',
                age: 30,
                email: 'test-mail@medimoi.com',
                password: 'password',
                cellphone: '0123456789',
                homephone: '0123456789',
                role: 'user',
                user_type_id: user_type.id,
            }
        });
        const treatmentPeriodicity = await Models.treatmentPeriodicity.create({
            data:{
                name: 'Treament Periodicity for treatment',
                nameSlug: 'treament-periodicity-for-treatment',
            }
        });
        // console.log("user_type", user_type);
        // console.log("user", user);
        // console.log("treatmentPeriodicity", treatmentPeriodicity);
        
        const cloneTreatment = R.clone(schemaObject[0]);
        cloneTreatment.user_id = user.id;
        cloneTreatment.treatment_periodicity_id = treatmentPeriodicity.id;
        await supertest(appTest)
        .post("/api/treatments/new")
        .send(cloneTreatment)
        .expect(200)
        .then(async (response) => {
            treatment = response.body;
            // console.log("treatment", treatment);
            expect(treatment.name).toBe("Treatment Test functional");
            await Models.treatment.delete({
                where:{
                    id: treatment.id
                }
            })
        })
        await Models.treatmentPeriodicity.delete({where:{id: treatmentPeriodicity.id}});
        await Models.user.delete({where:{id: user.id}});
        await Models.userType.delete({where:{id: user_type.id}});
    });

    test('POST - /api/treatments/news', async () => {
        const user_type = await Models.userType.create({
            data:{
                name: 'User Type Test for treatment',
                nameSlug: 'user-type-test-for-treatment',
            }
        });
        const user = await Models.user.create({
            data:{
                firstName: 'john',
                lastName: 'doe',
                age: 30,
                email: 'test-mail@medimoi.com',
                password: 'password',
                cellphone: '0123456789',
                homephone: '0123456789',
                role: 'user',
                user_type_id: user_type.id,
            }
        });
        const treatmentPeriodicity = await Models.treatmentPeriodicity.create({
            data:{
                name: 'Treament Periodicity for treatment',
                nameSlug: 'treament-periodicity-for-treatment',
            }
        });
        const cloneTreatment = R.clone(schemaObject[1]);
        const cloneTreatment_2 = R.clone(schemaObject[2]);
        
        cloneTreatment.user_id = user.id; cloneTreatment.treatment_periodicity_id = treatmentPeriodicity.id;
        cloneTreatment_2.user_id = user.id; cloneTreatment_2.treatment_periodicity_id = treatmentPeriodicity.id;

        const cloneObjects = {
            'entries':[cloneTreatment, cloneTreatment_2]
        };
        await supertest(appTest)
        .post("/api/treatments/news")
        .send(cloneObjects)
        .expect(200)
        .then(async (response) => {
            const treatments = response.body;
            // console.log("treatments", treatments);
            expect(treatments.count).toBe(2);
            await Models.treatment.deleteMany({
                where:{
                    name:{
                        contains: "Treatment Test functional"
                    }
                }
            });
        })
        await Models.treatmentPeriodicity.delete({where:{id: treatmentPeriodicity.id}});
        await Models.user.delete({where:{id: user.id}});
        await Models.userType.delete({where:{id: user_type.id}});
    });

    test('GET - /api/treatments/all', async () => {
        const user_type = await Models.userType.create({
            data:{
                name: 'User Type Test for treatment',
                nameSlug: 'user-type-test-for-treatment',
            }
        });
        const user = await Models.user.create({
            data:{
                firstName: 'john',
                lastName: 'doe',
                age: 30,
                email: 'test-mail@medimoi.com',
                password: 'password',
                cellphone: '0123456789',
                homephone: '0123456789',
                role: 'user',
                user_type_id: user_type.id,
            }
        });
        const treatmentPeriodicity = await Models.treatmentPeriodicity.create({
            data:{
                name: 'Treament Periodicity for treatment',
                nameSlug: 'treament-periodicity-for-treatment',
            }
        });
        const cloneTreatment = R.clone(schemaObject[1]);
        const cloneTreatment_2 = R.clone(schemaObject[2]);
        
        cloneTreatment.user_id = user.id; cloneTreatment.treatment_periodicity_id = treatmentPeriodicity.id;
        cloneTreatment_2.user_id = user.id; cloneTreatment_2.treatment_periodicity_id = treatmentPeriodicity.id;

        await Models.treatment.createMany({
            data: [cloneTreatment, cloneTreatment_2]
        });
        await supertest(appTest)
        .get("/api/treatments/all")
        .expect(200)
        .then(async (response) => {
            const treatments = response.body;
            // console.log("treatments", treatments);
            expect(treatments.length).toBe(2);
            expect(treatments[0].name).toBe("Treatment Test functional 2");
            expect(treatments[1].name).toBe("Treatment Test functional 3");

            // delete all treatments
            await Models.treatment.deleteMany({
                where:{
                    name:{
                        contains: "Treatment Test functional"
                    }
                }
            });
        })
        await Models.treatmentPeriodicity.delete({where:{id: treatmentPeriodicity.id}});
        await Models.user.delete({where:{id: user.id}});
        await Models.userType.delete({where:{id: user_type.id}});
    });

    test('PUT - /api/treatments/:id', async () => {
        const user_type = await Models.userType.create({
            data:{
                name: 'User Type Test for treatment',
                nameSlug: 'user-type-test-for-treatment',
            }
        });
        const user = await Models.user.create({
            data:{
                firstName: 'john',
                lastName: 'doe',
                age: 30,
                email: 'test-mail@medimoi.com',
                password: 'password',
                cellphone: '0123456789',
                homephone: '0123456789',
                role: 'user',
                user_type_id: user_type.id,
            }
        });
        const treatmentPeriodicity = await Models.treatmentPeriodicity.create({
            data:{
                name: 'Treament Periodicity for treatment',
                nameSlug: 'treament-periodicity-for-treatment',
            }
        });
        const cloneTreatment = R.clone(schemaObject[1]);
        cloneTreatment.user_id = user.id; cloneTreatment.treatment_periodicity_id = treatmentPeriodicity.id;
        const treatment = await Models.treatment.create({
            data: cloneTreatment
        });
        await supertest(appTest)
        .put("/api/treatments/" + treatment.id)
        .send({
            name: 'Treatment Test - Updated',
        })
        .expect(200)
        .then(async (response) => {
            const treatment = response.body;
            // console.log("treatment", treatment);
            expect(treatment.name).toBe("Treatment Test - Updated");
            // delete all treatments
            await Models.treatment.delete({
                where:{
                    id: treatment.id
                }
            });
        })
        await Models.treatmentPeriodicity.delete({where:{id: treatmentPeriodicity.id}});
        await Models.user.delete({where:{id: user.id}});
        await Models.userType.delete({where:{id: user_type.id}});
    })

    test('DELETE - /api/treatments/:id', async () => {
        const user_type = await Models.userType.create({
            data:{
                name: 'User Type Test for treatment deletion',
                nameSlug: 'user-type-test-for-treatment-deletion',
            }
        });
        const user = await Models.user.create({
            data:{
                firstName: 'john',
                lastName: 'doe',
                age: 30,
                email: 'test-mail@medimoi.com',
                password: 'password',
                cellphone: '0123456789',
                homephone: '0123456789',
                role: 'user',
                user_type_id: user_type.id,
            }
        });
        const treatmentPeriodicity = await Models.treatmentPeriodicity.create({
            data:{
                name: 'Treament Periodicity for treatment',
                nameSlug: 'treament-periodicity-for-treatment',
            }
        });
        const cloneTreatment = R.clone(schemaObject[1]);
        cloneTreatment.name = "Treatment Test - DELETE";
        cloneTreatment.user_id = user.id; cloneTreatment.treatment_periodicity_id = treatmentPeriodicity.id;
        const treatment = await Models.treatment.create({
            data: cloneTreatment
        });
        const id = treatment.id;
        // console.log("treatment to delete", treatment);
        await supertest(appTest)
        .delete("/api/treatments/" + treatment.id)
        .expect(200)
        await Models.treatmentPeriodicity.delete({where:{id: treatmentPeriodicity.id}});
        await Models.user.delete({where:{id: user.id}});
        await Models.userType.delete({where:{id: user_type.id}});
    });
});



