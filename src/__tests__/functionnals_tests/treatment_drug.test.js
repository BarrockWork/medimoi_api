/**
 * Link to the prisma docs
 * - https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/
 */

const supertest = require('supertest');
const createServerTest = require('../server_test');
const Models = require('../../models');
const R = require('ramda');

let user_type = null;
let user = null;
let treatment_periodicity = null;
let treatment = null;

let medical_administration = null;
let drug_level = null;
let drug_type = null;
let drug = null;

const appTest = createServerTest();

beforeEach(async () => {
    /** User type */
    user_type = await Models.userType.findFirst({
        where: {
            nameSlug: "treatment-media-post-user-type"
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
    user = await Models.user.findFirst({
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
    treatment_periodicity = await Models.treatmentPeriodicity.findFirst({
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
    treatment = await Models.treatment.findFirst({
        where:{
            name: {
                contains: "treatment media for treatment drug"
            }
        }
    })
    if(R.isNil(treatment)){
        treatment = await Models.treatment.create({
            data:{
                name: "treatment media for treatment drug",
                user_id: user.id,
                treatment_periodicity_id: treatment_periodicity.id,
                startedAt: new Date("2022-04-03 16:56:07.210Z")
            }
        })
    }
    // console.log(treatment, "treatment")
    /** End Treatment */

    /** Medical Administration */
    medical_administration = await Models.medicalAdministration.findFirst({
        where:{
            name: {
                contains: "medical administration from treatment media"
            }
        }
    });
    if(R.isNil(medical_administration)){
        medical_administration = await Models.medicalAdministration.create({
            data:{
                name: "medical administration from treatment media",
                nameSlug: "medical-administration-from-treatment-media",
            }
        })
    }

    /** Drug Level */
    drug_level = await Models.drugLevel.findFirst({
        where:{
            level:1
        }
    })
    if(R.isNil(drug_level)){
        drug_level = await Models.drugLevel.create({
            data:{
                level:1,
                description:"drug level 1"
            }
        })
    }
    /** End Drug Level */

    /** Drug Type */
    drug_type = await Models.drugType.findFirst({
        where:{
            name: {
                contains: "drug type for treatment drug"
            }
        }
    });
    if(R.isNil(drug_type)){
        drug_type = await Models.drugType.create({
            data:{
                name: "drug type for treatment drug",
                nameSlug: "drug-type-for-treatment-drug",
                description: "drug type for treatment drug"
            }
        })
    }
    /** End Drug Type */

    /** Drug */
    drug = await Models.drug.findFirst({
        where:{
            drug_level_id: drug_level.id,
        }
    })
    if(R.isNil(drug)){
        console.log("drug is null", drug_level.id)
        drug = await Models.drug.create({
            data:{
                name: "drug for treatment drug",
                nameSlug: "drug-for-treatment-drug",
                drug_type_id: drug_type.id,
                drug_level_id: drug_level.id,
                medical_administration_id: medical_administration.id,
                description: "drug for treatment drug"
            }
        });
    }
});        

beforeAll(async () => {
    await Models.treatmentDrug.deleteMany({});
    await Models.$disconnect();
});

afterAll(async () => {
    await Models.treatmentDrug.deleteMany({});
    await Models.$disconnect();
});


/**
 * Init the treatmentDrug test group
 */
describe('Treatment Drug ', () => {
    test('POST - /api/treatment_drugs/new', async () => {
        let drug = await Models.drug.findFirst({
            where:{
                name: {
                    contains: "drug for treatment drug"
                }
            }
        });
        let treatment = await Models.treatment.findFirst({
            where:{
                name: {
                    contains: "treatment media for treatment drug"
                }
            }
        });
        
        await supertest(appTest)
        .post('/api/treatment_drugs/new')
        .send({
            drug_id: drug.id,
            treatment_id: treatment.id,
        })
        .expect(200)
        .then(async (response) => {
            expect(response.body.drug_id).toBe(drug.id);
            expect(response.body.treatment_id).toBe(treatment.id);
        });
    });
    test('GET - /api/treatment_drugs/:id', async () => {
        let drug = await Models.drug.findFirst({
            where:{
                name: {
                    contains: "drug for treatment drug"
                }
            }
        });
        let treatment = await Models.treatment.findFirst({
            where:{
                name: {
                    contains: "treatment media for treatment drug"
                }
            }
        });
        let treatment_drug = await Models.treatmentDrug.create({
            data:{
                drug_id: drug.id,
                treatment_id: treatment.id,
            }
        });

        await supertest(appTest)
        .get(`/api/treatment_drugs/${treatment_drug.id}`)
        .expect(200)
        .then(async (response) => {
            expect(response.body.drug_id).toBe(drug.id);
            expect(response.body.treatment_id).toBe(treatment.id);
        })
    });
    test('GET - /api/treatment_drugs/all', async () => {
        let drug = await Models.drug.findFirst({
            where:{
                name: {
                    contains: "drug for treatment drug"
                }
            }
        });
        let treatment = await Models.treatment.findFirst({
            where:{
                name: {
                    contains: "treatment media for treatment drug"
                }
            }
        });
        let treatment_drugs = await Models.treatmentDrug.createMany({
            data:[
                {
                    drug_id: drug.id,
                    treatment_id: treatment.id,
                },
                {
                    drug_id: drug.id,
                    treatment_id: treatment.id,
                }
            ]
        });

        await supertest(appTest)
        .get('/api/treatment_drugs/all')
        .expect(200)
        .then(async (response) => {
            expect(response.body.length).toBeGreaterThanOrEqual(2);
        })
    });
    test('PUT - /api/treatment_drugs/:id', async () => {
        let drug = await Models.drug.findFirst({
            where:{
                name: {
                    contains: "drug for treatment drug"
                }
            }
        });
        let treatment = await Models.treatment.findFirst({
            where:{
                name: {
                    contains: "treatment media for treatment drug"
                }
            }
        });
        let treatment_drug = await Models.treatmentDrug.create({
            data:{
                drug_id: drug.id,
                treatment_id: treatment.id,
            }
        });

        await supertest(appTest)
        .put(`/api/treatment_drugs/${treatment_drug.id}`)
        .send({
            drug_id: drug.id,
            treatment_id: treatment.id,
        })
        .expect(200)
        .then(async (response) => {
            expect(response.body.drug_id).toBe(drug.id);
            expect(response.body.treatment_id).toBe(treatment.id);
        })
    });

    test('DELETE - /api/treatment_drugs/:id', async () => {
        let drug = await Models.drug.findFirst({
            where:{
                name: {
                    contains: "drug for treatment drug"
                }
            }
        });
        let treatment = await Models.treatment.findFirst({
            where:{
                name: {
                    contains: "treatment media for treatment drug"
                }
            }
        });
        let treatment_drug = await Models.treatmentDrug.create({
            data:{
                drug_id: drug.id,
                treatment_id: treatment.id,
            }
        });

        await supertest(appTest)
        .delete(`/api/treatment_drugs/${treatment_drug.id}`)
        .expect(200)
    });
});