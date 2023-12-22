'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserPost extends Model {
    static associate(models) {
      // Relación muchos a uno con User
      UserPost.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });

      // Relación muchos a uno con Post
      UserPost.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post',
      });
    }
  }
  UserPost.init(
    {
      // No es necesario definir atributos adicionales para este modelo
    },
    {
      sequelize,
      modelName: 'UserPost',
    }
  );
  return UserPost;
};
