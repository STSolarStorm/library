'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Author.belongsToMany(models.Books, {
        through: 'book_author',
        as: 'books',
        foreignKey: 'author_id',
        otherKey: 'books_id',
        timestamps: false
      })
    }
  };
  Author.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    num_of_books_written: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Author',
    timestamps: false,
    tableName: 'author'
  });
  return Author;
};