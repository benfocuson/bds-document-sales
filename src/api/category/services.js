const db = require('../../config/dbConfig.js')

const getAllCategory = async (searchObj, isCount) => {

    //search list categories
    const listCategories = await db.db.Category.findAll({raw: true, order: [['sort_number_category', 'ASC']]})

    if (listCategories && listCategories.length) {
        for (let itemCategory of listCategories) {

            //search list category details
            let listCategoryDetails = await db.db.CategoryDetails.findAll({ where: { category_id: itemCategory.id }, raw: true,order: [['sort_number_category_detail', 'ASC']] })

            if (listCategoryDetails && listCategoryDetails) {

                for (let itemCategoryDetail of listCategoryDetails) {

                    //search list docs
                    let listDocumentSales = await db.db.DocumentSales.findAll({ where: { category_detail_id: itemCategoryDetail.id }, raw: true, order: [['sort_number_document_sale', 'ASC']] })

                    if(listDocumentSales && listDocumentSales.length){
                        //set data document
                        itemCategoryDetail.documents = listDocumentSales
                    }
                }
            }

            //set data children
            itemCategory.children = listCategoryDetails
        }
    }

    return listCategories
}

const getDetailCategory = async (idCategory) => {


    let sqlCategory = `select * from categories from id = ${idCategory}`



    let sqlCategoryDetails = `select `

    let sqlDocumentSales = ``

    if (searchObj.start_date) {
        sql += ` and ist.interview_date >= '${searchObj.start_date}' `;
    }

    if (!isCount) {
        if (!searchObj.get_all) {
            sql += ` limit ${searchObj.size ? searchObj.size : 10} offset ${(searchObj.page ? searchObj.page - 1 : 0) *
                (searchObj.size ? searchObj.size : 10)
                }`;
        }
    } else {
        sql = `select count(*)
                   from (${sql}) a`;
    }

    const result = await db.db.sequelize.query(sql, {
        type: db.db.sequelize.QueryTypes.SELECT
    });

    return result
}

module.exports = {
    getAllCategory
}