module.exports = (sequelize, DataTypes) => {
  const CategoryDetails = sequelize.define("category_details");
  CategoryDetails.init({
      id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          autoIncrement: true,
          primaryKey: true,
          field: 'id'
      },
      category_id: {
          type: DataTypes.STRING,
          field: 'category_id'
      },
      name: {
          type: DataTypes.STRING,
          field: 'name'
      },
      sort_number_category_detail: {
          type: DataTypes.INTEGER,
          field: 'sort_number_category_detail'
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

  return CategoryDetails;
};
