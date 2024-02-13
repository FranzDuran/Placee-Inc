'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(500),
      },
      price: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.STRING,
      },
      poolPrice: {
        type: Sequelize.INTEGER,
      },
      parkingPrice: {
        type: Sequelize.INTEGER,
      },
      kitchenPrice: {
        type: Sequelize.STRING,
      },
       
      people: {
        type: Sequelize.STRING,
      },
      addressMap: {
        type: Sequelize.STRING,
      },
      specialPrecioTotal: {
        type: Sequelize.INTEGER,
      },
      summary: {
        type: Sequelize.STRING(10000),
      },
      description: {
        type: Sequelize.STRING(10000),
      },
      imageFile: {
        type: Sequelize.ARRAY(Sequelize.STRING), // Almacena la ruta de la imagen en el sistema de archivos
      },
      additionalPrices: {
        type: Sequelize.ARRAY(Sequelize.JSON), // Almacena la ruta de la imagen en el sistema de archivos
      },
      hasSpecialPackage: {
        type: Sequelize.BOOLEAN, // Almacena la ruta de la imagen en el sistema de archivos
      },
      status: {
        type: Sequelize.STRING,
      },
      continent: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      daysAtentions: {
        type: Sequelize.STRING
      },
      infoImportant: {
        type: Sequelize.ARRAY(Sequelize.STRING(10000)), 
      },
      hoursAtetionsInitial: {
        type: Sequelize.STRING,
      },
      hoursAtentionsFinally: {
        type: Sequelize.STRING,
      },
      horarios: {
        type: Sequelize.ARRAY(Sequelize.JSON),
      },
      
      reservedDates: {
        type: Sequelize.ARRAY(Sequelize.STRING(10000)), 

      },
      listDetails: {
        type: Sequelize.ARRAY(Sequelize.STRING(3000)), 

      },
      specialPackageItems: {
        type: Sequelize.ARRAY(Sequelize.STRING(3000)), 

      },
      specialPackageName: {
        type: Sequelize.STRING,
      },
      priceMenores: {
        type: Sequelize.INTEGER,
      },

      priceTransporte: {
        type: Sequelize.INTEGER,
      },
      transportes: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};
