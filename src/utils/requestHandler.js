const slugify = require('slugify');
const R = require('ramda');

/**
 * Check the required fields
 * @param req Object Request | Object Model
 * @param res Object Response
 * @param requiredFields Array
 * @param reqType String
 */
const checkRequiredFields = (req, res, requiredFields, reqType = 'POST') => {
    // Get missing required fields.
    let missingValues;

    if (reqType === "GET") {
        missingValues = requiredFields.filter(field => !req.params[field])
    }else {
        // req = An object (exemple NotificationType in createMany function)
        if(!req.body) {
            missingValues = requiredFields.filter(field => !req[field])
        }else{
            // req = Request object
            missingValues = requiredFields.filter(field => !req.body[field])
        }
    }

    // Dispatch an error for the try catch
    if(!R.isEmpty(missingValues)){
        throw `Required fields are missing : ${missingValues}`
    }
}

/**
 * Extract from req.body the only fields selected
 * @param req Object Request
 * @param res Object Response
 * @param fieldSelected Array
 * @returns {*}
 */
const extractFieldsToChange = (req, res, fieldSelected) => {
    const fieldsFiltered = {};
    fieldSelected.forEach(field => {
        if(req.body[field]) {
            fieldsFiltered[field] = req.body[field];
        }
    });

    // Dispatch an error for the try catch
    if(R.isEmpty(fieldsFiltered)){
        throw `A required field is missing : ${fieldSelected}`
    }

    return fieldsFiltered;
}

/**
 * Create a slug
 * @param textForSlug String
 */
const createSlug = (textForSlug) => {
    return slugify(textForSlug, {lower: true, remove: /[*+~.()'"!:@]/g});
}

/**
 * Check if slug already exists and returned an abject to the request
 *
 * @param Models Prisma Client
 * @param SchemaTarget Schema
 * @param currentSlug String
 * @param newSlug String
 * @param fieldsFiltered Array String
 * @returns {string}
 */
const verifySlugInDb = async (Models, SchemaTarget, currentSlug, newSlug, fieldsFiltered) => {
    try {
        // Check slug in DB
        const findData = await Models[SchemaTarget].findUnique({
            where: {
                nameSlug: newSlug
            }
        });

        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        Models.$disconnect();

        // If the slug exists
        if (findData && (newSlug !== currentSlug)) {
            let isResult = true;
            let i = 1;
            do {
                const checkSlug = newSlug +`-${i}`;
                const res = await Models[SchemaTarget].findUnique({
                    where: {
                        nameSlug: checkSlug
                    }
                });
                isResult = !!res;// isResult = res ? true : false
                if(isResult === false){
                    newSlug = checkSlug;
                }
                i++;
                // The prisma client can run only 10 instances simultaneously,
                // so it is better to stop the current instance before sending the response
                Models.$disconnect();
            } while (isResult === true);
        }

        // Initiate client params for the updating request
        if ((newSlug !== currentSlug)) {
            fieldsFiltered.nameSlug = newSlug;
        }
        return {
            where: {
                nameSlug: currentSlug
            },
            data: fieldsFiltered
        };
    } catch (error) {
        throw `An error is occurred: ${error}`;
    }
}

/**
 * TODO
 */
const errorHandler = () => {

}

module.exports =  {
    checkRequiredFields,
    createSlug,
    extractFieldsToChange,
    verifySlugInDb
}