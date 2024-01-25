const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {

      Post.belongsToMany(models.User, {
        through: 'UserPosts', // Asegúrate de usar el nombre correcto de la tabla intermedia
        foreignKey: 'postId',
      });
      Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' });
      Post.hasMany(models.Reports, { foreignKey: 'postId', as: 'reports' });

    }



  }

  Post.init(
    {
      // Atributos del modelo 'Post'
      title: DataTypes.STRING,
      price: DataTypes.STRING,
      poolPrice: DataTypes.STRING,
      type: DataTypes.STRING,
      parkingPrice: DataTypes.STRING,
      kitchenPrice: DataTypes.STRING,
      specialPackageName: DataTypes.STRING,
      specialPackageItems: DataTypes.ARRAY(DataTypes.STRING),
      people: DataTypes.STRING,
      summary: DataTypes.STRING,
      description: DataTypes.STRING,
      imageFile: DataTypes.ARRAY(DataTypes.STRING),
      additionalPrices: DataTypes.ARRAY(DataTypes.JSON),
      horarios: DataTypes.ARRAY(DataTypes.JSON),
      status: DataTypes.STRING,
      infoImportant: DataTypes.ARRAY(DataTypes.STRING),
      continent: DataTypes.STRING,
      hasSpecialPackage: DataTypes.BOOLEAN,
      addressMap: DataTypes.STRING,
      specialPrecioTotal: DataTypes.STRING,
      country: DataTypes.STRING,
      daysAtentions: DataTypes.STRING,
      hoursAtentionsFinally: DataTypes.STRING,
      hoursAtetionsInitial: DataTypes.STRING,
      reservedDates: DataTypes.ARRAY(DataTypes.STRING),
      listDetails: DataTypes.ARRAY(DataTypes.STRING)


    },
    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
