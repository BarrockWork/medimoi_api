const Models = require('../src/models');

// importation des fixtures
const medical_administrations = require('./fixtures/medical_administration');
const user_types = require('./fixtures/user_type');
const users = require('./fixtures/user');



async function main(){
    // console.log('Seeding...')
    // lorsqu'on le fait depuis le fichier actuel
    // const mediacal = await Models.medicalAdministration.create({
    //     data: {
    //         name: "Medical seeding",
    //         nameSlug: "medical-seeding"
    //     }
    // })
    // console.log(mediacal)


    // lors de l'import des datas depuis un autre fichier avec un create many
    // try {
    //     await Models.medicalAdministration.createMany({
    //         data: medical_administrations
    //     })
    // } catch (error) {
    //     console.error(error)
    // }

    // Avec une boucle
    // try {
    //     medical_administrations.map( async (data) => {
    //         await Models.medicalAdministration.create({
    //             data
    //         })
    //         await Models.$disconnect();
    //     })
    // } catch (error) {
    //     console.log(error)
    // }
    
    // creation des user types
    try {
        const user_type_saved = await Models.userType.create({
            data: user_types[0],
        })

        try {
            users.map( async (data) => {
                await Models.user.create({
                    data:{
                        firstName: data.firstName,
                        lastName: data.lastName,
                        age: data.age,
                        email: data.email,
                        password: data.password,
                        role: data.role,
                        cellphone: data.cellphone,
                        homephone: data.homephone,
                        workphone: data.workphone,
                        user_type_id: user_type_saved.id
                    }
                });

                await Models.$disconnect();
            })
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }


}

main()
.catch((e)=>{
    console.log(e)
    process.exit(1)
})
.finally(async ()=>{
    await Models.$disconnect();
})

