'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Manga.belongsToMany(models.Mangaka,{
        through: 'manga_mangaka',
        as: 'mangaka',
        foreignKey: 'manga_id',
        otherKey: 'mangaka_id',
        timestamps: false
      })
    }
  };
  Manga.init({
    title: DataTypes.STRING,
    publisher_magazine: DataTypes.STRING,
    genre: DataTypes.STRING,
    num_of_chapters: DataTypes.STRING,
    num_of_volumes: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Manga',
    timestamps: false,
    tableName: 'manga'
  });
  return Manga;
};