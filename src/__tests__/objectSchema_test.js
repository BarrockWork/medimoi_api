const UserTypeSchemaObject = [
  {
    name: 'User Type Test',
  },
  {
    name: 'User Type Test 2 medimoi',
  },
  {
    name: 'User Type Test 3 medimoi',
  },
];

const UserSchemaObject = [
  {
    firstName: 'john',
    lastName: 'doe',
    age: 30,
    email: 'jd@medimoi.com',
    password: 'password',
    cellphone: '0123456789',
    homephone: '0123456789',
    role: 'user',
  },
  {
    firstName: 'john',
    lastName: 'doe',
    age: 30,
    email: 'jdoeeee@medimoi.com',
    password: 'password',
    cellphone: '0123456789',
    homephone: '0123456789',
    role: 'user',
  },
  {
    firstName: 'john',
    lastName: 'doe',
    age: 30,
    email: 'jdowwww@medimoi.com',
    password: 'password',
    cellphone: '0123456789',
    homephone: '0123456789',
    role: 'user',
  },
];

const AddressRoadTypeSchemaObject = {
  name: 'Address Road Type Test',
};

// Initialise a list of address object
const AddressSchemaObject = {
  numberRoad: 1,
  streetName: 'madame',
  user_id: 1,
  address_road_type_id: 1,
  zipcode: '12345',
  city: 'bouillante',
  region: 'test',
  country: 'France',
  title: 'PC',
};

module.exports = {
  AddressSchemaObject,
  AddressRoadTypeSchemaObject,
  UserSchemaObject,
  UserTypeSchemaObject,
};
