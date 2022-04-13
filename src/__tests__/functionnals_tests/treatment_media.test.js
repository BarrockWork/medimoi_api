/**
 * Link for the errors reference of prisma:
 * - https://www.prisma.io/docs/reference/api-reference/error-reference
 */

const supertest = require('supertest');
const createServerTest = require("../server_test");
const Models = require('../../models');
const R = require('ramda');

// Delete all record before starting the tests
beforeAll( async () =>{
    await Models.treatmentMedia.deleteMany({
        where:{
            name:{
                contains:"Treatment Media Test Functional"
            }
        }
    });
    await Models.$disconnect();
});

afterAll(async () => {
    await Models.treatmentMedia.deleteMany({
        where:{
            name:{
                contains:"Treatment Media Test Functional"
            }
        }
    });
    await Models.$disconnect();
});

const appTest = createServerTest();

const schemaObject = [
    {
        name: 'Treatment Media Test Functional',
        mimeType: 'image/jpeg',
    },
    {
        name: 'Treatment Media Test Functional medimoi',
        mimeType: 'image/jpeg',
    },
    {
        name: 'Treatment Media Test Functional medimoi 2',
        mimeType: 'image/jpeg',
    }
];

/**
 * Init the company test group
 */
describe("Treatment Media functional testing", () => {
    test('POST - /api/treatment_medias/new create treatment media', async () => {
        
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
        // console.log(user_type, "user_type")

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
        // console.log(user, "user")
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

        /** Treatment */
        let treatment = await Models.treatment.findFirst({
            where:{
                name: {
                    contains: "treatment media treatment"
                }
            }
        })
        if(R.isNil(treatment)){
            treatment = await Models.treatment.create({
                data:{
                    name: "treatment media treatment",
                    user_id: user.id,
                    treatment_periodicity_id: treatment_periodicity.id,
                    startedAt: new Date("2022-04-03 16:56:07.210Z")
                }
            })
        }
        // console.log(treatment, "treatment")
        /** End Treatment */

        const treatment_media = R.clone(schemaObject[1]);
        treatment_media.treatment_id = treatment.id;
        await supertest(appTest)
        .post("/api/treatment_medias/new")
        .send(treatment_media)
        .expect(200)
        .then(async (response) => {
            console.log(response.body, "response.body")
            expect(response.body.name).toBe("Treatment Media Test Functional medimoi");
            await Models.treatmentMedia.deleteMany({
                where:{
                    name:{
                        contains:"Treatment Media Test Functional medimoi"
                    }
                }
            });
        });
    });

    test('GET - /api/treatment_medias/:id', async () => {

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
        // console.log(user_type, "user_type")

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
        // console.log(user, "user")
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

        /** Treatment */
        let treatment = await Models.treatment.findFirst({
            where:{
                name: {
                    contains: "treatment media treatment"
                }
            }
        })
        if(R.isNil(treatment)){
            treatment = await Models.treatment.create({
                data:{
                    name: "treatment media treatment",
                    user_id: user.id,
                    treatment_periodicity_id: treatment_periodicity.id,
                    startedAt: new Date("2022-04-03 16:56:07.210Z")
                }
            })
        }
        // console.log(treatment, "treatment")
        /** End Treatment */
        
        const cloneTreatmentMedia = R.clone(schemaObject[0]);
        cloneTreatmentMedia.treatment_id = treatment.id;
        const treatment_media = await Models.treatmentMedia.create({
            data: cloneTreatmentMedia
        });

        await supertest(appTest)
        .get(`/api/treatment_medias/${treatment_media.id}`)
        .expect(200)
        .then(async (response) => {
            const treatment_media = response.body;
            // console.log("treatment_media", treatment_media);
            expect(treatment_media.name).toBe("Treatment Media Test Functional");

            await Models.treatmentMedia.delete({
                where:{
                    id: treatment_media.id
                }
            });
        });
    });

    test('GET - /api/treatment_medias/all, should return all treatment medias', async () => {

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
        // console.log(user_type, "user_type")

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
        // console.log(user, "user")
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

        /** Treatment */
        let treatment = await Models.treatment.findFirst({
            where:{
                name: {
                    contains: "treatment media treatment"
                }
            }
        })
        if(R.isNil(treatment)){
            treatment = await Models.treatment.create({
                data:{
                    name: "treatment media treatment",
                    user_id: user.id,
                    treatment_periodicity_id: treatment_periodicity.id,
                    startedAt: new Date("2022-04-03 16:56:07.210Z")
                }
            })
        }
        // console.log(treatment, "treatment")
        /** End Treatment */
        
        const cloneTreatmentMedias = [R.clone(schemaObject[1]),R.clone(schemaObject[2])];
        cloneTreatmentMedias[0].treatment_id = treatment.id;
        cloneTreatmentMedias[1].treatment_id = treatment.id;
        await Models.treatmentMedia.createMany({
            data: cloneTreatmentMedias
        })

        await supertest(appTest)
        .get("/api/treatment_medias/all")
        .expect(200)
        .then(async (response) => {
            const treatment_medias = response.body;
            // console.log("treatment_medias", treatment_medias);
            expect(treatment_medias.length).toBeGreaterThanOrEqual(2);

            await Models.treatmentMedia.deleteMany({
                where:{
                    name:{
                        contains: "medimoi"
                    }
                }
            });
        });
    });

    test('GET - /api/treatment_medias/treatment/id, should return all treatment medias by treatment id', async () => {
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
        // console.log(user_type, "user_type")

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
        // console.log(user, "user")
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

        /** Treatment */
        let treatment = await Models.treatment.findFirst({
            where:{
                name: {
                    contains: "treatment media treatment"
                }
            }
        })
        if(R.isNil(treatment)){
            treatment = await Models.treatment.create({
                data:{
                    name: "treatment media treatment",
                    user_id: user.id,
                    treatment_periodicity_id: treatment_periodicity.id,
                    startedAt: new Date("2022-04-03 16:56:07.210Z")
                }
            })
        }
        // console.log(treatment, "treatment")
        /** End Treatment */
        
        const cloneTreatmentMedia = R.clone(schemaObject[0]);
        cloneTreatmentMedia.treatment_id = treatment.id;
        await Models.treatmentMedia.create({
            data: cloneTreatmentMedia
        })
        
        await supertest(appTest)
        .get(`/api/treatment_medias/treatment/${treatment.id}`)
        .expect(200)
        .then(async (response) => {
            const treatment_medias = response.body;
            // console.log("treatment_medias", treatment_medias);
            expect(treatment_medias.length).toBeGreaterThanOrEqual(1);
            await Models.treatmentMedia.deleteMany({
                where:{
                    name:{
                        contains: "Treatment Media Test Functional"
                    }
                }
            });
        });
    });

    test('PUT - /api/treatment_medias/:id, should update treatment media', async () => {
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
        // console.log(user_type, "user_type")

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
        // console.log(user, "user")
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

        /** Treatment */
        let treatment = await Models.treatment.findFirst({
            where:{
                name: {
                    contains: "treatment media treatment"
                }
            }
        })
        if(R.isNil(treatment)){
            treatment = await Models.treatment.create({
                data:{
                    name: "treatment media treatment",
                    user_id: user.id,
                    treatment_periodicity_id: treatment_periodicity.id,
                    startedAt: new Date("2022-04-03 16:56:07.210Z")
                }
            })
        }
        // console.log(treatment, "treatment")
        /** End Treatment */

        const cloneTreatmentMedia = R.clone(schemaObject[0]);
        cloneTreatmentMedia.treatment_id = treatment.id;
        const treatment_media = await Models.treatmentMedia.create({
            data: cloneTreatmentMedia
        });
        // console.log(treatment_media, "treatment_media")
        await supertest(appTest)
        .put(`/api/treatment_medias/${treatment_media.id}`)
        .send({
            name: 'Treatment Media Test Functional updated',
            mimeType: 'image/jpeg',
            treatment_id: treatment.id,
        })
        .expect(200)
        .then(async (response) => {
            const treatment_media = response.body;
            // console.log("treatment_media", treatment_media);
            expect(treatment_media.name).toBe("Treatment Media Test Functional updated");
            await Models.treatmentMedia.deleteMany({
                where:{
                    name:{
                        contains: "Treatment Media Test Functional updated"
                    }
                }
            });
        });
    });

    test('DELETE - /api/treatment_medias/:id, should delete treatment media', async () => {
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
        // console.log(user_type, "user_type")

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
        // console.log(user, "user")
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

        /** Treatment */
        let treatment = await Models.treatment.findFirst({
            where:{
                name: {
                    contains: "treatment media treatment"
                }
            }
        })
        if(R.isNil(treatment)){
            treatment = await Models.treatment.create({
                data:{
                    name: "treatment media treatment",
                    user_id: user.id,
                    treatment_periodicity_id: treatment_periodicity.id,
                    startedAt: new Date("2022-04-03 16:56:07.210Z")
                }
            })
        }
        // console.log(treatment, "treatment")
        /** End Treatment */

        const cloneTreatmentMedia = R.clone(schemaObject[2]);
        cloneTreatmentMedia.treatment_id = treatment.id;
        await Models.treatmentMedia.createMany({
            data: cloneTreatmentMedia
        })
        const treatment_media = await Models.treatmentMedia.findFirst({
            where:{
                name: {
                    contains: "medimoi 2"
                }
            }
        })
        console.log(treatment_media, "treatment_media")

        await supertest(appTest)
        .delete(`/api/treatment_medias/${treatment_media.id}`)
        .expect(200)
    });

});