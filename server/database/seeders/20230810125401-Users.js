'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
      await queryInterface.bulkInsert('Users', [
        
        {
          "name": "Ariel",
          "email": "ariel@gmail.com",
          "lastName": "Alegre",
           "password": "123456",
            "phone":"1161361408", 
             "role": "user",
             "updatedAt": "2023-08-10T13:00:51.021Z",
             "createdAt": "2023-08-10T13:00:51.021Z",
      },
      {
        "name": "marta",
        "email": "marta@gmail.com",
        "lastName": "Alegre",
         "password": "123456",
          "phone":"1161361408", 
           "role": "user",
           "updatedAt": "2023-08-10T13:00:51.021Z",
           "createdAt": "2023-08-10T13:00:51.021Z",
    },
    {
      "name": "nahir",
      "email": "nahir@gmail.com",
      "lastName": "Alegre",
       "password": "123456",
        "phone":"1161361408", 
         "role": "user",
         "updatedAt": "2023-08-10T13:00:51.021Z",
         "createdAt": "2023-08-10T13:00:51.021Z",
  },
  {
    "name": "caro",
    "email": "caro@gmail.com",
    "lastName": "Alegre",
     "password": "123456",
      "phone":"1161361408", 
       "role": "user",
       "updatedAt": "2023-08-10T13:00:51.021Z",
       "createdAt": "2023-08-10T13:00:51.021Z",
},
{
  "name": "viky",
  "email": "viky@gmail.com",
  "lastName": "Alegre",
   "password": "123456",
    "phone":"1161361408", 
     "role": "user",
     "updatedAt": "2023-08-10T13:00:51.021Z",
     "createdAt": "2023-08-10T13:00:51.021Z",
},
{
  "name": "fede",
  "email": "fede@gmail.com",
  "lastName": "Alegre",
   "password": "123456",
    "phone":"1161361408", 
     "role": "user",
     "updatedAt": "2023-08-10T13:00:51.021Z",
     "createdAt": "2023-08-10T13:00:51.021Z",
},
    
    
    
    
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
 
      await queryInterface.bulkDelete('Users', null, {});
    
  }
};
