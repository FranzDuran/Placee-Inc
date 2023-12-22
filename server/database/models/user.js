// Importa las dependencias necesarias
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define la relación muchos a muchos con Post a través de UserPost
      
      User.belongsToMany(models.Post, {
        through: 'UserPosts',
        foreignKey: 'userId',
      });
      User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' });
    }
  

  }
  User.init(
    {
      // Atributos del modelo 'User'
      avatar: DataTypes.STRING,
      name: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      backgroundColor: DataTypes.STRING,
      aboutMe: DataTypes.TEXT,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
