const Models = require("./../models");

// Function to test the maxLength of a field
const testMaxLength = (schema, schemaObject, field, maxLength) => {
    test(`Check max length of ${field} = ${maxLength}`, async () => {
        // In order to check the assertions with async/await
        expect.assertions(1);
        try{
            let fieldValue = '';
            for(let i = 0; i <= maxLength; i++) {
                fieldValue += i.toString()
            }
            schemaObject[field]  = fieldValue;

            await Models[schema].create({
                data: schemaObject
            })
        } catch(e) {
            // e = PrismaClientKnownRequestError
            expect(e.code).toEqual('P2000');
        }
    })
}

module.exports = {
    testMaxLength
}