module.exports = (sequelize, DataTypes) => {
  const DocumentSales = sequelize.define("document-sales");
  DocumentSales.init({
      id: {
          type: DataTypes.UUIDV4,
          defaultValue: DataTypes.UUIDV4,
          autoIncrement: true,
          primaryKey: true,
          field: 'id'
      },
      category_detail_id: {
          type: DataTypes.STRING,
          field: 'category_detail_id'
      },
      title: {
          type: DataTypes.STRING,
          field: 'title'
      },
      image: {
          type: DataTypes.STRING,
          field: 'image'
      },
      link: {
          type: DataTypes.STRING,
          field: 'link'
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

  return DocumentSales;
};
