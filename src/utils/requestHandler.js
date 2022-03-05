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
        throw `A required field is missing : fieldSelected}`
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
 * TODO
 */
const errorHandler = () => {

}

module.exports =  {
    checkRequiredFields,
    createSlug,
    extractFieldsToChange
}