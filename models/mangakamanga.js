'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MangakaManga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here\
    }
  }
  MangakaManga.init({
    mangaka_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    manga_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'MangakaManga',
    timestamps: false,
    tableName: 'manga_mangaka'
  });
  return MangakaManga;
};