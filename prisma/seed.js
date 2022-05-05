const fixtures = require('./fixtures/fixtures.js');
const Model = require('../src/models');

async function main() {

    for (let fixture of fixtures.userTypes) {
        await Model.userType.create({
            data: {
                name: fixture.name,
                nameSlug: fixture.nameSlug,
                createdAt: fixture.createdAt,
                updatedAt: fixture.updatedAt
            }
        });
    }

  /*  for (let fixture of fixtures.diseaseTypes) {
        await Models.diseaseType.create({
            data: {
                name: fixture.name,
                nameSlug: fixture.nameSlug,
                description: fixture.description,
                createdAt: new Date(),
                updatedAt: null,
                isActive: fixture.isActive
            }
        });
    }

    for (let fixture of fixtures.drugTypes) {
        await Models.drugType.create({
            data: {
                "name": fixture.name,
                "nameSlug": fixture.nameSlug,
                "description": fixture.description,
                "createdAt": fixture.createdAt,
                "updatedAt": fixture.updatedAt,
                'isActive': fixture.isActive,
            }
        });
    }

    for (let fixture of fixtures.drugLevels) {
        await Models.drugLevel.create({
            data: {
                "level": fixture.level,
                "description": fixture.description,
                "createdAt": fixture.createdAt,
                "updatedAt": fixture.updatedAt,
                'isActive': fixture.isActive,
            }
        });
    }

    for (let fixture of fixtures.diseases) {
        await Models.diseaseType.create({
            data: {
                name: fixture.name,
                nameSlug: fixture.nameSlug,
                description: fixture.description,
                createdAt: new Date(),
                updatedAt: null,
                isActive: fixture.isActive
            }
        });
        await Models.disease.create({
            data: {
                name: fixture.name,
                nameSlug: fixture.nameSlug,
                description: fixture.description,
                incubationPeriod: fixture.incubationPeriod,
                transmitting: fixture.transmitting,
                createdAt: new Date(),
                updatedAt: null,
                isActive: true,
                disease_type_id: fixture.disease_type_id
            }
        });
    }*/


    /*  await Models.userTypes.createMany({
          data: fixtures.userTypes
      })

      await Models.user.createMany({
          data: fixtures.users
      });*/
}


main().catch(e => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await Models.disconnect();
});