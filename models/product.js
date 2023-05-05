'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',

    // add database table name for additional info and/or implementation table mapping
    tableName: 'products',

    // this configuration map sequelize timestamps default field for timestamp `createdAt` and `updatedAt` to our defined column
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return Product;
};