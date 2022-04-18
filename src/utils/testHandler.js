const Models = require('./../models');

// Function to test the maxLength of a field
const testMaxLength = (schema, schemaObject, field, maxLength) => {
  test(`Check max length of ${field} = ${maxLength}`, async () => {
    // In order to check the assertions with async/await
    expect.assertions(1);
    try {
      // Clone the schemaObject in order to avoid to modify the original
      let cloneSchemaObject = { ...schemaObject };

      let fieldValue = '';
      for (let i = 0; i <= maxLength; i++) {
        fieldValue += i.toString();
      }
      cloneSchemaObject[field] = fieldValue;
      await Models[schema].create({
        data: cloneSchemaObject,
      });
    } catch (e) {
      // e = PrismaClientKnownRequestError
      expect(e.code).toEqual('P2000');
    }
  });
};

// Function to test if a field is unique
const testUniqueness = (schema, schemaObject, field) => {
  test(`Check uniqueness for ${field} field`, async () => {
    // In order to check the assertions with async/await
    expect.assertions(1);
    try {
      // Clone the schemaObject in order to avoid to modify the original
      let cloneSchemaObject = { ...schemaObject };

      // Create a new entry
      await Models[schema].create({
        data: cloneSchemaObject,
      });

      // Duplicate the previous entry
      await Models[schema].create({
        data: cloneSchemaObject,
      });
    } catch (e) {
      // e = PrismaClientKnownRequestError
      expect(e.code).toEqual('P2002');
    }
  });
};

const testUniquenessWithDependency = (
  schema,
  dependencySchema,
  schemaObject,
  schemaObject2,
  field
) => {
  test(`check uniqueness with dependency for ${field} field`, async () => {
    expect.assertions(1);
    try {
      // Clone the schemaObject in order to avoid to modify the original
      let cloneSchemaObject = { ...schemaObject };
      let cloneSchemaObject2 = { ...schemaObject2 };
      // Create a new entry
      await Models[schema].create({
        data: cloneSchemaObject,
      });

      // Duplicate the previous entry
      await Models[dependencySchema].create({
        data: cloneSchemaObject,
      });

      // Duplicate the previous entry
      await Models[schema].create({
        data: cloneSchemaObject2,
      });
    } catch (e) {
      // e = PrismaClientKnownRequestError
      expect(e.code).toEqual('P2002');
    }
  });
};

module.exports = {
  testMaxLength,
  testUniqueness,
  testUniquenessWithDependency,
};
