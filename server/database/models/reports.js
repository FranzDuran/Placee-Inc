'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reports.belongsTo(models.Post, { foreignKey: 'postId', as: 'post' });
      Reports.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Reports.init({
    text: DataTypes.STRING,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reports',
  });
  return Reports;
};