// models/UserDetails.js

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserDetails extends Model {
    static associate(models) {
      // Relación uno a uno con User
  
    }
  }
  UserDetails.init(
    {
      // Atributos del modelo 'UserDetails'
      identify: DataTypes.STRING,
      country: DataTypes.STRING,
      city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserDetails',
    }
  );
  return UserDetails;
};
