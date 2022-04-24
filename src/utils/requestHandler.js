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

  if (reqType === 'GET') {
    missingValues = requiredFields.filter((field) => !req.params[field]);
  } else {
    // req = An object (exemple NotificationType in createMany function)
    if (!req.body) {
      missingValues = requiredFields.filter((field) => !req[field]);
    } else {
      // req = Request object
      missingValues = requiredFields.filter((field) => !req.body[field]);
    }
  }

  // Dispatch an error for the try catch
  if (!R.isEmpty(missingValues)) {
    throw `Required fields are missing : ${missingValues}`;
  }
};


/**
 * Extract from req.body the only fields selected
 * @param req Object Request
 * @param res Object Response
 * @param fieldSelected Array
 * @returns {*}
 */
const extractFieldsToChange = (req, res, fieldSelected) => {
  const fieldsFiltered = {};
  fieldSelected.forEach((field) => {
    if (req.body[field] !== null) {
      fieldsFiltered[field] = req.body[field];
    }
  });

  // Dispatch an error for the try catch
  if (R.isEmpty(fieldsFiltered)) {
    throw `A required field is missing : ${fieldSelected}`;
  }

  return fieldsFiltered;
};

/**
 * Create a slug
 * @param textForSlug String
 */
const createSlug = (textForSlug) => {
  return slugify(textForSlug, { lower: true, remove: /[*+~.()'"!:@]/g });
};

/**
 * Check if slug already exists and returned an abject to the request
 *
 * @param Models Prisma Client
 * @param SchemaTarget Schema
 * @param currentSlugOrId
 * @param newSlug String
 * @param fieldsFiltered Array String
 * @returns {string}
 */
const verifySlugInDb = async (
  Models,
  SchemaTarget,
  currentSlugOrId,
  newSlug,
  fieldsFiltered
) => {
  try {
      let currentSlug = currentSlugOrId;

      // Check if is id or nameSlug in the request params
      const checkIsIdOrName = parseInt(currentSlugOrId);
      if (!isNaN(checkIsIdOrName)) {
          const res = await Models[SchemaTarget].findUnique({
              where: {
                  id: checkIsIdOrName,
              },
          });
          currentSlug = res.nameSlug;
      }

    // Check slug in DB
    const findData = await Models[SchemaTarget].findUnique({
      where: {
        nameSlug: newSlug,
      },
    });

    // The prisma client can run only 10 instances simultaneously,
    // so it is better to stop the current instance before sending the response
    Models.$disconnect();

    // If the slug exists
    if (findData && newSlug !== currentSlug) {
      let isResult = true;
      let i = 1;
      do {
        const checkSlug = newSlug + `-${i}`;
        const res = await Models[SchemaTarget].findUnique({
          where: {
            nameSlug: checkSlug,
          },
        });
        isResult = !!res; // isResult = res ? true : false
        if (isResult === false) {
          newSlug = checkSlug;
        }
        i++;
        // The prisma client can run only 10 instances simultaneously,
        // so it is better to stop the current instance before sending the response
        Models.$disconnect();
      } while (isResult === true);
    }

    // Initiate client params for the updating request
    if (newSlug !== currentSlug) {
      fieldsFiltered.nameSlug = newSlug;
    }
    return {
      where: {
        nameSlug: currentSlug,
      },
      data: fieldsFiltered,
    };
  } catch (error) {
    throw `An error is occurred: ${error}`;
  }
};

/**
 * Extract the parameters and return the configuration for prisma client
 * @param queryParams (Example: req.query or req.params)
 * @param targetParams (Example: ['sort', 'range', 'filter']
 * @returns {{}}
 */
const extractQueryParameters = (queryParams, targetParams) => {
    const configClient = {};

    targetParams.forEach(qP => {
        const parsingParam = JSON.parse(queryParams[qP]);
        switch (qP) {
            case 'sort':
                configClient.orderBy = {};
                configClient.orderBy[parsingParam[0]] = R.toLower(parsingParam[1]);
                break;
            case 'range':
                configClient.skip = parsingParam[0];
                configClient.take = parsingParam[1];
                break;
            case 'filter':
                const listFilter = Object.entries(parsingParam);
                if(listFilter.length > 0) {
                    configClient.where = {};
                    for(const field of listFilter) {
                        configClient.where[field[0]] = {equals: field[1]};
                    }
                }
                break;
        }
    })
    return configClient;
}

/**
 * Check and parse a STRING value to INT value
 * @param value String
 */
const transformIntValue = (value) => {
  const result = parseInt(value);

  if (!R.is(Number, result)) {
    throw `The value ${value} is NaN.`;
  }
  return result;
};

/**
 * Get user infos
 */
const selectUserGlobalInfos = () => {
  return {
    select: {
      id: true,
      UserType: {
        select: {
          id: true,
          name: true,
          nameSlug: true,
        },
      },
      firstName: true,
      lastName: true,
      age: true,
      email: true,
      cellphone: true,
      homephone: true,
      workphone: true,
      lastConnection: true,
      createdAt: true,
      updatedAt: true,
      isActive: true,
    },
  };
};

/**
 * Get contact_type infos
 */
const selectContactType = () => {
  return {
    select: {
      id: true,
      name: true,
      nameSlug: true,
      isActive: true,
    },
  };
};

/**
 * Get address_road_type infos
 */
const selectAddressRoadType = () => {
  return {
    select: {
      id: true,
      name: true,
      nameSlug: true,
    },
  };
};

/**
 * Get notification_type infos
 */
 const selectNotificationType = () => {
  return {
    select: {
      id: true,
      name: true,
      nameSlug: true,
    },
  };
};

/**
 * Get company infos
 */
const selectCompany = () => {
  return {
    select: {
      id: true,
      name: true,
      nameSlug: true,
      siret: true,
      tva: true,
      isActive: true,
    },
  };
};

/**
 * Get Drug infos
 */
const selectDrugInfos = () => {
    return {
        select:{
            id:true,
            name:true,
            isActive:true,
            description:true,
            isPrescription:true
        }
    }
}

/**
 * Treatment drung infos
*/
const selectTreatmentDrugsInfos = () => {
    return {
        select:{
            id:true,
            comments:true,
            drug_id:true,
            treatment_id:true,
            isActive:true
        }
    }
}

const selectTreatmentMediasInfos = () => {
    return {
        select:{
            id:true,
            name:true,
            mimeType:true,
            isActive:true,
        }
    }
}

const selecttreatmentPeriodicityInfos = () =>{
    return {
        select:{
            id:true,
            name:true,
            nameSlug:true,
            isActive:true,
        }
    }
}

const selectTreatmentGlobalInfos = () => {
    return {
        id:true,
        name:true,
        startedAt:true,
        finishedAt:true,
        TreatmentPeriodicity:selecttreatmentPeriodicityInfos(),
        TreatmentMedias:selectTreatmentMediasInfos(),
        TreatmentDrugs:selectTreatmentDrugsInfos(),
        User:selectUserGlobalInfos(),
        isActive:true,
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
    verifySlugInDb,
    extractQueryParameters,
    transformIntValue,
    selectUserGlobalInfos,
    selectContactType,
    selectCompany,
    selectDrugInfos,
    selectTreatmentDrugsInfos,
    selectTreatmentMediasInfos,
    selecttreatmentPeriodicityInfos,
    selectTreatmentGlobalInfos
}
