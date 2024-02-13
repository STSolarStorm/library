'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mangaka extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mangaka.belongsToMany(models.Manga, {
        through: 'manga_mangaka',
        as: 'manga',
        foreignKey: 'mangaka_id',
        otherKey: 'manga_id',
        timestamps: false
      })
    }
  };
  Mangaka.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    image: DataTypes.STRING,
    num_of_books: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mangaka',
    timestamps: false,
    tableName: 'mangaka'
  });
  return Mangaka;
};