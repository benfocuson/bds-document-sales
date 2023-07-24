module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define("categories");
  Categories.init({
      id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          autoIncrement: true,
          primaryKey: true,
          field: 'id'
      },
      name: {
          type: DataTypes.STRING,
          field: 'name'
      },
      sort_number: {
          type: DataTypes.INTEGER,
          field: 'sort_number'
      },
      created_at: {
          type: DataTypes.DATE,
          field: 'created_at'
      },
      updated_at: {
          type: DataTypes.DATE,
          field: 'updated_at'
      },
  }, {sequelize, freezeTableName: true, timestamps: false});

  return Categories;
};
