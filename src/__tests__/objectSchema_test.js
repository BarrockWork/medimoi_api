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
    firstName: 'jane',
    lastName: 'doe',
    age: 30,
    email: 'janedoe@medimoi.com',
    password: 'password',
    cellphone: '0123456789',
    homephone: '0123456789',
    role: 'user',
  },
  {
    firstName: 'jane',
    lastName: 'doe',
    age: 30,
    email: 'jane@medimoi.com',
    password: 'password',
    cellphone: '0123456789',
    homephone: '0123456789',
    role: 'user',
  },
  {
    firstName: 'jane',
    lastName: 'doe',
    age: 30,
    email: 'jado@medimoi.com',
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

const TreatmentPeriodicityDatas = [
  {
    name: 'Treament Periodicity Test',
    nameSlug: 'treament-periodicity-test',
  },
  {
    name: 'Treament Periodicity Test 2 medimoi',
    nameSlug: 'treament-periodicity-test-2-medimoi',
  },
  {
    name: 'Treament Periodicity Test 3 medimoi',
    nameSlug: 'treament-periodicity-test-3-medimoi',
  }
];

const UserTypeDatas = [
  {
    name: 'User Type Test',
    nameSlug: 'user-type-test',
  },
  {
    name: 'User Type Test 2 medimoi',
    nameSlug: 'user-type-test-2-medimoi',
  },
  {
    name: 'User Type Test 3 medimoi',
    nameSlug: 'user-type-test-3-medimoi',
  }
]

const TreatmentSchemaObject = {
  name: 'Treatment Test',
  user_id: 1,
  treatment_periodicity_id: 1,
  startedAt: new Date("2022-04-03 16:56:07.210Z"),
}

module.exports = {
  AddressSchemaObject,
  AddressRoadTypeSchemaObject,
  UserSchemaObject,
  UserTypeSchemaObject,
  TreatmentPeriodicityDatas,
  UserTypeDatas,
  TreatmentSchemaObject
  
};
