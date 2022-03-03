const slugify = require('slugify');
const R = require('ramda');

/**
 * Check the required fields
 * @param req
 * @param res
 * @param requiredFields
 * @param reqType
 * @returns {*}
 */
const checkRequiredFields = (req, res, requiredFields, reqType = 'POST') => {
    // Get missing required fields.
    let missingValues;
    if (reqType === "GET") {
        missingValues = requiredFields.filter(fileld => !req.params[fileld])
    }else {
        missingValues = requiredFields.filter(fileld => !req.body[fileld])
    }

    if(!R.isEmpty(missingValues)){
        return res.status(400).json({
            message: "Required fields are missing.",
            value: missingValues
        })
    }
}

/**
 * Extract from req.body the only fields selected
 * @param req
 * @param res
 * @param fieldSelected
 * @returns {*}
 */
const extractFieldsToChange = (req, res, fieldSelected) => {
    const fieldsFiltered = {};
    fieldSelected.forEach(field => {
        if(req.body[field]) {
            fieldsFiltered[field] = req.body[field];
        }
    });

    if(R.isEmpty(fieldsFiltered)){
        return res.status(400).json({
            message: "A required field is missing.",
            value: fieldSelected
        })
    }

    return fieldsFiltered;
}

/**
 * Create a name slug
 * @param req
 * @returns {string} nameSlug
 */
const createNameSlug = (req) => {
    const {name: reqName, nameSlug: reqNameSlug} = req.body;
    return reqNameSlug ? reqNameSlug : slugify(reqName, {lower: true, remove: /[*+~.()'"!:@]/g});
}

/**
 * TODO
 */
const errorHandler = () => {

}

module.exports =  {
    checkRequiredFields,
    createNameSlug,
    extractFieldsToChange
}