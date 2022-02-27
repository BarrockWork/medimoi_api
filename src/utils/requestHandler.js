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
 * Create a name slug
 * @param req
 * @returns {string} nameSlug
 */
const createNameSlug = (req) => {
    const {name: reqName, nameSlug: reqNameSlug} = req.body;
    return reqNameSlug ? reqNameSlug : slugify(reqName, {lower: true});
}

/**
 * TODO
 */
const errorHandler = () => {

}

module.exports =  {
    checkRequiredFields,
    createNameSlug
}