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
      category_id: {
          type: DataTypes.STRING,
          field: 'category_id'
      },
      category_detail_id: {
          type: DataTypes.STRING,
          field: 'category_detail_id'
      },
      title: {
          type: DataTypes.STRING,
          field: 'title'
      },
      image_name: {
          type: DataTypes.STRING,
          field: 'image_name'
      },
      image_url: {
          type: DataTypes.STRING,
          field: 'image_url'
      },
      link: {
          type: DataTypes.STRING,
          field: 'link'
      },
      sort_number_document_sale: {
          type: DataTypes.INTEGER,
          field: 'sort_number_document_sale'
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
