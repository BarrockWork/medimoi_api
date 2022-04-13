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

        /** User type */
        let user_type = await Models.userType.findFirst({
            where: {
                nameSlug: "treatment-media-user-type"
            }
        })
        if(R.isNil(user_type)){
            user_type = await Models.userType.create({
                data: {
                    name:"treatment media user type",
                    nameSlug: "treatment-media-user-type"
                }
            })
        }
        /** End User type */

        /** User */
        let user = await Models.user.findFirst({
            where:{
                email: "jd@medimoi.com"
            }
        })
        if(R.isNil(user)){
            user = await Models.user.create({
                data:{
                    firstName: 'john',
                    lastName: 'doe',
                    age: 30,
                    email: 'jd@medimoi.com',
                    password: 'password',
                    cellphone: '0123456789',
                    homephone: '0123456789',
                    role: 'user',
                    user_type_id: user_type.id,
                }
            })
        }
        /** End User */

        /** Treatment Periodicity */
        let treatment_periodicity = await Models.treatmentPeriodicity.findFirst({
            where:{
                nameSlug: "treatment-media-post-treatment-periodicity"
            }
        })
        if(R.isNil(treatment_periodicity)){
            treatment_periodicity = await Models.treatmentPeriodicity.create({
                data:{
                    name: "treatment media post treatment periodicity",
                    nameSlug: "treatment-media-post-treatment-periodicity"
                }
            })
        }
        // console.log(treatment_periodicity, "treatment_periodicity")
        /** End Treatment Periodicity */
        
        // console.log("user_type", user_type);
        // console.log("user", user);
        // console.log("treatmentPeriodicity", treatmentPeriodicity);
        
        const cloneTreatment = R.clone(schemaObject[0]);
        cloneTreatment.user_id = user.id;
        cloneTreatment.treatment_periodicity_id = treatment_periodicity.id;
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
        // await Models.treatmentPeriodicity.delete({where:{id: treatment_periodicity.id}});
        // await Models.user.delete({where:{id: user.id}});
        // await Models.userType.delete({where:{id: user_type.id}});
    });

    test('POST - /api/treatments/news', async () => {
        /** User type */
        let user_type = await Models.userType.findFirst({
            where: {
                nameSlug: "treatment-media-user-type"
            }
        })
        if(R.isNil(user_type)){
            user_type = await Models.userType.create({
                data: {
                    name:"treatment media user type",
                    nameSlug: "treatment-media-user-type"
                }
            })
        }
        /** End User type */

        /** User */
        let user = await Models.user.findFirst({
            where:{
                email: "jd@medimoi.com"
            }
        })
        if(R.isNil(user)){
            user = await Models.user.create({
                data:{
                    firstName: 'john',
                    lastName: 'doe',
                    age: 30,
                    email: 'jd@medimoi.com',
                    password: 'password',
                    cellphone: '0123456789',
                    homephone: '0123456789',
                    role: 'user',
                    user_type_id: user_type.id,
                }
            })
        }
        /** End User */

        /** Treatment Periodicity */
        let treatment_periodicity = await Models.treatmentPeriodicity.findFirst({
            where:{
                nameSlug: "treatment-media-post-treatment-periodicity"
            }
        })
        if(R.isNil(treatment_periodicity)){
            treatment_periodicity = await Models.treatmentPeriodicity.create({
                data:{
                    name: "treatment media post treatment periodicity",
                    nameSlug: "treatment-media-post-treatment-periodicity"
                }
            })
        }
        const cloneTreatment = R.clone(schemaObject[1]);
        const cloneTreatment_2 = R.clone(schemaObject[2]);
        
        cloneTreatment.user_id = user.id; cloneTreatment.treatment_periodicity_id = treatment_periodicity.id;
        cloneTreatment_2.user_id = user.id; cloneTreatment_2.treatment_periodicity_id = treatment_periodicity.id;

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
        // await Models.treatmentPeriodicity.delete({where:{id: treatment_periodicity.id}});
        // await Models.user.delete({where:{id: user.id}});
        // await Models.userType.delete({where:{id: user_type.id}});
    });

    test('GET - /api/treatments/all', async () => {
        /** User type */
        let user_type = await Models.userType.findFirst({
            where: {
                nameSlug: "treatment-media-user-type"
            }
        })
        if(R.isNil(user_type)){
            user_type = await Models.userType.create({
                data: {
                    name:"treatment media user type",
                    nameSlug: "treatment-media-user-type"
                }
            })
        }
        /** End User type */

        /** User */
        let user = await Models.user.findFirst({
            where:{
                email: "jd@medimoi.com"
            }
        })
        if(R.isNil(user)){
            user = await Models.user.create({
                data:{
                    firstName: 'john',
                    lastName: 'doe',
                    age: 30,
                    email: 'jd@medimoi.com',
                    password: 'password',
                    cellphone: '0123456789',
                    homephone: '0123456789',
                    role: 'user',
                    user_type_id: user_type.id,
                }
            })
        }
        /** End User */

        /** Treatment Periodicity */
        let treatment_periodicity = await Models.treatmentPeriodicity.findFirst({
            where:{
                nameSlug: "treatment-media-post-treatment-periodicity"
            }
        })
        if(R.isNil(treatment_periodicity)){
            treatment_periodicity = await Models.treatmentPeriodicity.create({
                data:{
                    name: "treatment media post treatment periodicity",
                    nameSlug: "treatment-media-post-treatment-periodicity"
                }
            })
        }
        const cloneTreatment = R.clone(schemaObject[1]);
        const cloneTreatment_2 = R.clone(schemaObject[2]);
        
        cloneTreatment.user_id = user.id; cloneTreatment.treatment_periodicity_id = treatment_periodicity.id;
        cloneTreatment_2.user_id = user.id; cloneTreatment_2.treatment_periodicity_id = treatment_periodicity.id;

        await Models.treatment.createMany({
            data: [cloneTreatment, cloneTreatment_2]
        });
        await supertest(appTest)
        .get("/api/treatments/all")
        .expect(200)
        .then(async (response) => {
            const treatments = response.body;
            // console.log("treatments", treatments);
            expect(treatments.length).toBeGreaterThanOrEqual(2);

            // delete all treatments
            await Models.treatment.deleteMany({
                where:{
                    name:{
                        contains: "Treatment Test functional"
                    }
                }
            });
        })
        // await Models.treatmentPeriodicity.delete({where:{id: treatment_periodicity.id}});
        // await Models.user.delete({where:{id: user.id}});
        // await Models.userType.delete({where:{id: user_type.id}});
    });

    test('PUT - /api/treatments/:id', async () => {
        /** User type */
        let user_type = await Models.userType.findFirst({
            where: {
                nameSlug: "treatment-media-user-type"
            }
        })
        if(R.isNil(user_type)){
            user_type = await Models.userType.create({
                data: {
                    name:"treatment media user type",
                    nameSlug: "treatment-media-user-type"
                }
            })
        }
        /** End User type */

        /** User */
        let user = await Models.user.findFirst({
            where:{
                email: "jd@medimoi.com"
            }
        })
        if(R.isNil(user)){
            user = await Models.user.create({
                data:{
                    firstName: 'john',
                    lastName: 'doe',
                    age: 30,
                    email: 'jd@medimoi.com',
                    password: 'password',
                    cellphone: '0123456789',
                    homephone: '0123456789',
                    role: 'user',
                    user_type_id: user_type.id,
                }
            })
        }
        /** End User */

        /** Treatment Periodicity */
        let treatment_periodicity = await Models.treatmentPeriodicity.findFirst({
            where:{
                nameSlug: "treatment-media-post-treatment-periodicity"
            }
        })
        if(R.isNil(treatment_periodicity)){
            treatment_periodicity = await Models.treatmentPeriodicity.create({
                data:{
                    name: "treatment media post treatment periodicity",
                    nameSlug: "treatment-media-post-treatment-periodicity"
                }
            })
        }
        const cloneTreatment = R.clone(schemaObject[1]);
        cloneTreatment.user_id = user.id; cloneTreatment.treatment_periodicity_id = treatment_periodicity.id;
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
        // await Models.treatmentPeriodicity.delete({where:{id: treatment_periodicity.id}});
        // await Models.user.delete({where:{id: user.id}});
        // await Models.userType.delete({where:{id: user_type.id}});
    })

    test('DELETE - /api/treatments/:id', async () => {
        /** User type */
        let user_type = await Models.userType.findFirst({
            where: {
                nameSlug: "treatment-media-user-type"
            }
        })
        if(R.isNil(user_type)){
            user_type = await Models.userType.create({
                data: {
                    name:"treatment media user type",
                    nameSlug: "treatment-media-user-type"
                }
            })
        }
        /** End User type */

        /** User */
        let user = await Models.user.findFirst({
            where:{
                email: "jd@medimoi.com"
            }
        })
        if(R.isNil(user)){
            user = await Models.user.create({
                data:{
                    firstName: 'john',
                    lastName: 'doe',
                    age: 30,
                    email: 'jd@medimoi.com',
                    password: 'password',
                    cellphone: '0123456789',
                    homephone: '0123456789',
                    role: 'user',
                    user_type_id: user_type.id,
                }
            })
        }
        /** End User */

        /** Treatment Periodicity */
        let treatment_periodicity = await Models.treatmentPeriodicity.findFirst({
            where:{
                nameSlug: "treatment-media-post-treatment-periodicity"
            }
        })
        if(R.isNil(treatment_periodicity)){
            treatment_periodicity = await Models.treatmentPeriodicity.create({
                data:{
                    name: "treatment media post treatment periodicity",
                    nameSlug: "treatment-media-post-treatment-periodicity"
                }
            })
        }
        const cloneTreatment = R.clone(schemaObject[1]);
        cloneTreatment.name = "Treatment Test - DELETE";
        cloneTreatment.user_id = user.id; cloneTreatment.treatment_periodicity_id = treatment_periodicity.id;
        const treatment = await Models.treatment.create({
            data: cloneTreatment
        });
        const id = treatment.id;
        // console.log("treatment to delete", treatment);
        await supertest(appTest)
        .delete("/api/treatments/" + treatment.id)
        .expect(200)
        // await Models.treatmentPeriodicity.delete({where:{id: treatment_periodicity.id}});
        // await Models.user.delete({where:{id: user.id}});
        // await Models.userType.delete({where:{id: user_type.id}});
    });
});



